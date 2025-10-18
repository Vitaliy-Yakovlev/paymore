-- Script to extend existing price_list table with additional columns
-- This adds the missing columns to your current table structure

-- Add new columns to existing price_list table
ALTER TABLE public.price_list 
ADD COLUMN IF NOT EXISTS device_key VARCHAR(100),
ADD COLUMN IF NOT EXISTS model VARCHAR(100),
ADD COLUMN IF NOT EXISTS gtin VARCHAR(50),
ADD COLUMN IF NOT EXISTS mpn VARCHAR(100),
ADD COLUMN IF NOT EXISTS buy_min DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS resale_floor DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES public.categories(id),
ADD COLUMN IF NOT EXISTS subcategory_id INTEGER REFERENCES public.subcategories(id),
ADD COLUMN IF NOT EXISTS icon VARCHAR(50) DEFAULT 'smartphone',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Update existing records to populate new columns
-- Generate device_key from device_name and storage
UPDATE public.price_list 
SET device_key = LOWER(REPLACE(REPLACE(device_name, ' ', '_'), '-', '_')) || '_' || LOWER(REPLACE(storage, 'GB', 'gb'))
WHERE device_key IS NULL;

-- Use brand as model if not specified
UPDATE public.price_list 
SET model = brand
WHERE model IS NULL;

-- Estimate buy_min and resale_floor based on sale_price
UPDATE public.price_list 
SET buy_min = ROUND(sale_price * 0.4, 2)
WHERE buy_min IS NULL AND sale_price IS NOT NULL;

UPDATE public.price_list 
SET resale_floor = ROUND(sale_price * 0.7, 2)
WHERE resale_floor IS NULL AND sale_price IS NOT NULL;

-- Set default icon
UPDATE public.price_list 
SET icon = 'smartphone'
WHERE icon IS NULL;

-- Set all records as active
UPDATE public.price_list 
SET is_active = TRUE
WHERE is_active IS NULL;

-- Handle NULL values in device_key before adding NOT NULL constraint
UPDATE public.price_list 
SET device_key = 'unknown_device_' || id::text
WHERE device_key IS NULL;

-- Handle NULL values in model before adding NOT NULL constraint
UPDATE public.price_list 
SET model = brand
WHERE model IS NULL OR model = '';

-- Handle NULL values in sale_price before adding NOT NULL constraint
-- Set default sale_price for records that have NULL values
UPDATE public.price_list 
SET sale_price = 100.00  -- Default price for records without sale_price
WHERE sale_price IS NULL;

-- Fix duplicate device_key values by adding suffix
WITH duplicates AS (
  SELECT device_key, COUNT(*) as cnt
  FROM public.price_list 
  GROUP BY device_key 
  HAVING COUNT(*) > 1
)
UPDATE public.price_list 
SET device_key = device_key || '_' || id::text
WHERE device_key IN (SELECT device_key FROM duplicates);

-- Fix duplicate device_name + storage combinations by adding suffix
WITH duplicates AS (
  SELECT device_name, storage, COUNT(*) as cnt
  FROM public.price_list 
  GROUP BY device_name, storage 
  HAVING COUNT(*) > 1
)
UPDATE public.price_list 
SET device_name = device_name || ' (' || id::text || ')'
WHERE (device_name, storage) IN (SELECT device_name, storage FROM duplicates);

-- Add constraints after populating data
ALTER TABLE public.price_list 
ALTER COLUMN device_key SET NOT NULL,
ALTER COLUMN model SET NOT NULL,
ALTER COLUMN sale_price SET NOT NULL;

-- Add unique constraint for device_key (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'price_list_device_key_unique'
    ) THEN
        ALTER TABLE public.price_list 
        ADD CONSTRAINT price_list_device_key_unique UNIQUE (device_key);
    END IF;
END $$;

-- Add unique constraint for device_name + storage combination (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'price_list_device_storage_unique'
    ) THEN
        ALTER TABLE public.price_list 
        ADD CONSTRAINT price_list_device_storage_unique UNIQUE (device_name, storage);
    END IF;
END $$;

-- Create additional indexes for new columns (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_price_list_device_key ON public.price_list USING btree (device_key);
CREATE INDEX IF NOT EXISTS idx_price_list_model ON public.price_list USING btree (model);
CREATE INDEX IF NOT EXISTS idx_price_list_category_id ON public.price_list USING btree (category_id);
CREATE INDEX IF NOT EXISTS idx_price_list_subcategory_id ON public.price_list USING btree (subcategory_id);
CREATE INDEX IF NOT EXISTS idx_price_list_is_active ON public.price_list USING btree (is_active);

-- Verify the updated table structure
SELECT 
  'Table structure updated successfully!' as status,
  COUNT(*) as total_records,
  COUNT(DISTINCT device_name) as unique_devices,
  COUNT(DISTINCT brand) as unique_brands,
  COUNT(DISTINCT storage) as unique_storage_options
FROM public.price_list 
WHERE is_active = true;

-- Show sample of updated data
SELECT 
  device_key,
  device_name,
  brand,
  model,
  storage,
  sale_price,
  buy_min,
  resale_floor,
  icon,
  is_active
FROM public.price_list 
WHERE is_active = true
ORDER BY device_name, storage
LIMIT 10;
