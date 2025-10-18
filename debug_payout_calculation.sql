-- Test script to check if getPriceForDevice works correctly
-- This will help debug the payout calculation issue

-- Check if we have devices in the price_list table
SELECT 
    device_name,
    storage,
    sale_price,
    brand,
    is_active
FROM public.price_list 
WHERE is_active = true
ORDER BY device_name, storage
LIMIT 10;

-- Check if we have offer_settings
SELECT * FROM public.offer_settings;

-- Test a specific device lookup (replace with actual device from your data)
SELECT 
    device_name,
    storage,
    sale_price,
    brand
FROM public.price_list 
WHERE device_name = 'iPhone 15' 
  AND storage = '128GB' 
  AND is_active = true;
