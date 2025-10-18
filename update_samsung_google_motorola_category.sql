-- Update category_id for Samsung, Google, and Motorola brands
-- Set category_id = 2 for these brands in the price_list table

UPDATE public.price_list 
SET category_id = 2
WHERE brand IN ('Samsung', 'Google', 'Motorola');

-- Verify the update
SELECT 
    brand,
    COUNT(*) as device_count,
    category_id
FROM public.price_list 
WHERE brand IN ('Samsung', 'Google', 'Motorola')
GROUP BY brand, category_id
ORDER BY brand;

-- Show summary of all categories
SELECT 
    c.id as category_id,
    c.label as category_name,
    COUNT(p.id) as device_count
FROM public.categories c
LEFT JOIN public.price_list p ON c.id = p.category_id
GROUP BY c.id, c.label
ORDER BY c.id;
