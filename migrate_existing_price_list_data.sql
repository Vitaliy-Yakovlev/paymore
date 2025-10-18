-- Simple migration script to transfer existing price_list data to new unified structure
-- This assumes you already have data in the current price_list table

-- Step 1: Backup current price_list table (optional but recommended)
CREATE TABLE price_list_backup AS SELECT * FROM public.price_list;

-- Step 2: Drop existing price_list table
DROP TABLE IF EXISTS public.price_list CASCADE;

-- Step 3: Create new unified price_list table
CREATE TABLE public.price_list (
  id SERIAL PRIMARY KEY,
  
  -- Device identification
  device_key VARCHAR(100) UNIQUE NOT NULL,  -- Unique key for device (e.g., 'iphone_15_pro_128')
  device_name VARCHAR(255) NOT NULL,        -- Display name (e.g., 'iPhone 15 Pro 128GB')
  brand VARCHAR(100) NOT NULL,              -- Brand (e.g., 'Apple')
  model VARCHAR(100) NOT NULL,              -- Model (e.g., 'A3101')
  storage VARCHAR(50) NOT NULL,             -- Storage capacity (e.g., '128GB')
  
  -- Product identifiers
  gtin VARCHAR(50),                         -- Global Trade Item Number
  mpn VARCHAR(100),                         -- Manufacturer Part Number
  
  -- Pricing information
  sale_price DECIMAL(10, 2) NOT NULL,       -- Flawless price for offer calculator
  buy_min DECIMAL(10, 2),                   -- Minimum buy price (for display)
  resale_floor DECIMAL(10, 2),              -- Minimum resale price (for display)
  
  -- Category organization
  category_id INTEGER REFERENCES public.categories(id),
  subcategory_id INTEGER REFERENCES public.subcategories(id),
  
  -- Display and status
  icon VARCHAR(50) DEFAULT 'smartphone',    -- Icon for display
  is_active BOOLEAN DEFAULT TRUE,           -- Whether device is active
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT price_list_device_key_unique UNIQUE (device_key),
  CONSTRAINT price_list_device_storage_unique UNIQUE (device_name, storage)
);

-- Step 4: Create indexes
CREATE INDEX idx_price_list_device_name ON public.price_list USING btree (device_name);
CREATE INDEX idx_price_list_brand ON public.price_list USING btree (brand);
CREATE INDEX idx_price_list_storage ON public.price_list USING btree (storage);
CREATE INDEX idx_price_list_category_id ON public.price_list USING btree (category_id);
CREATE INDEX idx_price_list_subcategory_id ON public.price_list USING btree (subcategory_id);
CREATE INDEX idx_price_list_is_active ON public.price_list USING btree (is_active);
CREATE INDEX idx_price_list_device_lookup ON public.price_list USING btree (device_name, storage);

-- Step 5: Create trigger
CREATE TRIGGER update_price_list_updated_at 
BEFORE UPDATE ON price_list 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Step 6: Migrate data from backup table
INSERT INTO public.price_list (
  device_key,
  device_name,
  brand,
  model,
  storage,
  gtin,
  mpn,
  sale_price,
  buy_min,
  resale_floor,
  category_id,
  subcategory_id,
  icon,
  is_active,
  created_at,
  updated_at
)
SELECT 
  -- Create device_key from device_name and storage
  LOWER(REPLACE(REPLACE(device_name, ' ', '_'), '-', '_')) || '_' || LOWER(REPLACE(storage, 'GB', 'gb')) as device_key,
  device_name,
  brand,
  brand as model,  -- Use brand as model if not available
  storage,
  NULL as gtin,    -- Will be filled manually if needed
  NULL as mpn,     -- Will be filled manually if needed
  sale_price,
  -- Estimate buy_min and resale_floor based on sale_price
  ROUND(sale_price * 0.4, 2) as buy_min,      -- 40% of sale_price
  ROUND(sale_price * 0.7, 2) as resale_floor, -- 70% of sale_price
  -- Map to Apple iPhones category (you can adjust this)
  (SELECT id FROM public.categories WHERE key = 'apple_iphones') as category_id,
  NULL as subcategory_id,
  'smartphone' as icon,
  true as is_active,
  COALESCE(created_at, NOW()) as created_at,
  COALESCE(updated_at, NOW()) as updated_at
FROM price_list_backup
WHERE sale_price IS NOT NULL;

-- Step 7: Verify migration
SELECT 
  'Migration completed successfully!' as status,
  COUNT(*) as total_devices,
  COUNT(DISTINCT device_name) as unique_device_names,
  COUNT(DISTINCT brand) as unique_brands,
  COUNT(DISTINCT storage) as unique_storage_options,
  MIN(sale_price) as min_price,
  MAX(sale_price) as max_price
FROM public.price_list 
WHERE is_active = true;

-- Step 8: Show sample of migrated data
SELECT 
  device_key,
  device_name,
  brand,
  storage,
  sale_price,
  buy_min,
  resale_floor
FROM public.price_list 
WHERE is_active = true
ORDER BY device_name, storage
LIMIT 10;

-- Step 9: Clean up backup table (optional)
-- DROP TABLE IF EXISTS price_list_backup;
