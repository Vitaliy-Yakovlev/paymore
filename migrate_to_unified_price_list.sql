-- Migration script to populate unified price_list table
-- This script merges data from the old devices and price_list tables

-- First, populate with data from devices table (if it exists)
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
  d.key as device_key,
  d.label as device_name,
  d.brand,
  d.model,
  '128GB' as storage,  -- Default storage, will be updated with actual data
  d.gtin,
  d.mpn,
  COALESCE(d.buy_min, 0) as sale_price,  -- Use buy_min as initial sale_price
  d.buy_min,
  d.resale_floor,
  d.category_id,
  d.subcategory_id,
  d.icon,
  d.is_active,
  d.created_at,
  d.updated_at
FROM public.devices d
WHERE d.is_active = true
ON CONFLICT (device_key) DO NOTHING;

-- Update with actual price_list data where available
-- This will update sale_price with actual pricing data
UPDATE public.price_list pl
SET 
  sale_price = pl_data.sale_price,
  updated_at = NOW()
FROM (
  SELECT 
    CONCAT(device_name, '_', storage) as device_key,
    sale_price
  FROM public.price_list_old  -- Assuming old price_list is renamed to price_list_old
) pl_data
WHERE pl.device_key = pl_data.device_key;

-- Insert additional storage variants from price_list_old
INSERT INTO public.price_list (
  device_key,
  device_name,
  brand,
  model,
  storage,
  sale_price,
  buy_min,
  resale_floor,
  category_id,
  subcategory_id,
  icon,
  is_active
)
SELECT 
  CONCAT(pl_old.device_name, '_', pl_old.storage) as device_key,
  pl_old.device_name,
  pl_old.brand,
  pl_old.brand as model,  -- Use brand as model if not available
  pl_old.storage,
  pl_old.sale_price,
  pl_old.sale_price * 0.4 as buy_min,  -- Estimate buy_min as 40% of sale_price
  pl_old.sale_price * 0.7 as resale_floor,  -- Estimate resale_floor as 70% of sale_price
  NULL as category_id,  -- Will need to be mapped manually
  NULL as subcategory_id,  -- Will need to be mapped manually
  'smartphone' as icon,
  true as is_active
FROM public.price_list_old pl_old
WHERE NOT EXISTS (
  SELECT 1 FROM public.price_list pl_new 
  WHERE pl_new.device_key = CONCAT(pl_old.device_name, '_', pl_old.storage)
)
ON CONFLICT (device_key) DO NOTHING;

-- Add sample iPhone data with proper categorization
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
  is_active
) VALUES 
-- iPhone 15 Pro Max variants
('iphone_15_pro_max_256', 'iPhone 15 Pro Max', 'Apple', 'A3108', '256GB', '', 'A3108', 1199.00, 450.00, 800.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_15_pro_max_512', 'iPhone 15 Pro Max', 'Apple', 'A3108', '512GB', '', 'A3108', 1399.00, 500.00, 900.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_15_pro_max_1tb', 'iPhone 15 Pro Max', 'Apple', 'A3108', '1TB', '', 'A3108', 1599.00, 600.00, 1000.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 15 Pro variants
('iphone_15_pro_128', 'iPhone 15 Pro', 'Apple', 'A3101', '128GB', '', 'A3101', 999.00, 400.00, 700.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_15_pro_256', 'iPhone 15 Pro', 'Apple', 'A3101', '256GB', '', 'A3101', 1099.00, 450.00, 800.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_15_pro_512', 'iPhone 15 Pro', 'Apple', 'A3101', '512GB', '', 'A3101', 1299.00, 500.00, 900.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_15_pro_1tb', 'iPhone 15 Pro', 'Apple', 'A3101', '1TB', '', 'A3101', 1499.00, 600.00, 1000.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 15 variants
('iphone_15_128', 'iPhone 15', 'Apple', 'A3090', '128GB', '', 'A3090', 799.00, 300.00, 600.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_15_256', 'iPhone 15', 'Apple', 'A3090', '256GB', '', 'A3090', 899.00, 350.00, 650.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_15_512', 'iPhone 15', 'Apple', 'A3090', '512GB', '', 'A3090', 1099.00, 400.00, 700.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 14 Pro Max variants
('iphone_14_pro_max_128', 'iPhone 14 Pro Max', 'Apple', 'A2896', '128GB', '', 'A2896', 1099.00, 400.00, 700.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_14_pro_max_256', 'iPhone 14 Pro Max', 'Apple', 'A2896', '256GB', '', 'A2896', 1199.00, 450.00, 800.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_14_pro_max_512', 'iPhone 14 Pro Max', 'Apple', 'A2896', '512GB', '', 'A2896', 1399.00, 500.00, 900.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_14_pro_max_1tb', 'iPhone 14 Pro Max', 'Apple', 'A2896', '1TB', '', 'A2896', 1599.00, 600.00, 1000.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 14 Pro variants
('iphone_14_pro_128', 'iPhone 14 Pro', 'Apple', 'A2892', '128GB', '', 'A2892', 999.00, 350.00, 650.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_14_pro_256', 'iPhone 14 Pro', 'Apple', 'A2892', '256GB', '', 'A2892', 1099.00, 400.00, 700.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_14_pro_512', 'iPhone 14 Pro', 'Apple', 'A2892', '512GB', '', 'A2892', 1299.00, 450.00, 800.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_14_pro_1tb', 'iPhone 14 Pro', 'Apple', 'A2892', '1TB', '', 'A2892', 1499.00, 550.00, 950.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 14 variants
('iphone_14_128', 'iPhone 14', 'Apple', 'A2882', '128GB', '', 'A2882', 699.00, 250.00, 500.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_14_256', 'iPhone 14', 'Apple', 'A2882', '256GB', '', 'A2882', 799.00, 300.00, 550.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_14_512', 'iPhone 14', 'Apple', 'A2882', '512GB', '', 'A2882', 999.00, 350.00, 650.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true)
ON CONFLICT (device_key) DO NOTHING;

-- Verify the migration
SELECT 
  COUNT(*) as total_devices,
  COUNT(DISTINCT device_name) as unique_device_names,
  COUNT(DISTINCT brand) as unique_brands,
  COUNT(DISTINCT storage) as unique_storage_options
FROM public.price_list 
WHERE is_active = true;
