-- Unified price_list table that combines devices and price_list data
-- This replaces both the old devices table and price_list table

-- Drop existing price_list table and recreate with all fields
DROP TABLE IF EXISTS public.price_list CASCADE;

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

-- Indexes for better performance
CREATE INDEX idx_price_list_device_name ON public.price_list USING btree (device_name);
CREATE INDEX idx_price_list_brand ON public.price_list USING btree (brand);
CREATE INDEX idx_price_list_storage ON public.price_list USING btree (storage);
CREATE INDEX idx_price_list_category_id ON public.price_list USING btree (category_id);
CREATE INDEX idx_price_list_subcategory_id ON public.price_list USING btree (subcategory_id);
CREATE INDEX idx_price_list_is_active ON public.price_list USING btree (is_active);
CREATE INDEX idx_price_list_device_lookup ON public.price_list USING btree (device_name, storage);

-- Trigger for updated_at
CREATE TRIGGER update_price_list_updated_at 
BEFORE UPDATE ON price_list 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE public.price_list IS 'Unified table containing all device information and pricing data';
COMMENT ON COLUMN public.price_list.device_key IS 'Unique identifier for the device configuration';
COMMENT ON COLUMN public.price_list.device_name IS 'Display name of the device';
COMMENT ON COLUMN public.price_list.sale_price IS 'Flawless price used in offer calculator';
COMMENT ON COLUMN public.price_list.buy_min IS 'Minimum buy price for display purposes';
COMMENT ON COLUMN public.price_list.resale_floor IS 'Minimum resale price for display purposes';
