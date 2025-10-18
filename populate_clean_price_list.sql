-- Script to populate clean price_list table with sample iPhone data
-- Run this after clearing the table with clear_price_list_data.sql

-- Insert sample iPhone data with proper categorization
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
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 13 Pro Max variants
('iphone_13_pro_max_128', 'iPhone 13 Pro Max', 'Apple', 'A2643', '128GB', '', 'A2643', 999.00, 350.00, 650.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_13_pro_max_256', 'iPhone 13 Pro Max', 'Apple', 'A2643', '256GB', '', 'A2643', 1099.00, 400.00, 700.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_13_pro_max_512', 'iPhone 13 Pro Max', 'Apple', 'A2643', '512GB', '', 'A2643', 1299.00, 450.00, 800.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_13_pro_max_1tb', 'iPhone 13 Pro Max', 'Apple', 'A2643', '1TB', '', 'A2643', 1499.00, 550.00, 950.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 13 Pro variants
('iphone_13_pro_128', 'iPhone 13 Pro', 'Apple', 'A2639', '128GB', '', 'A2639', 899.00, 300.00, 600.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_13_pro_256', 'iPhone 13 Pro', 'Apple', 'A2639', '256GB', '', 'A2639', 999.00, 350.00, 650.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_13_pro_512', 'iPhone 13 Pro', 'Apple', 'A2639', '512GB', '', 'A2639', 1199.00, 400.00, 700.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_13_pro_1tb', 'iPhone 13 Pro', 'Apple', 'A2639', '1TB', '', 'A2639', 1399.00, 500.00, 900.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 13 variants
('iphone_13_128', 'iPhone 13', 'Apple', 'A2631', '128GB', '', 'A2631', 699.00, 250.00, 500.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_13_256', 'iPhone 13', 'Apple', 'A2631', '256GB', '', 'A2631', 799.00, 300.00, 550.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_13_512', 'iPhone 13', 'Apple', 'A2631', '512GB', '', 'A2631', 999.00, 350.00, 650.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 16 variants
('iphone_16_128', 'iPhone 16', 'Apple', 'A3200', '128GB', '', 'A3200', 799.00, 500.00, 700.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_256', 'iPhone 16', 'Apple', 'A3200', '256GB', '', 'A3200', 899.00, 600.00, 800.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_512', 'iPhone 16', 'Apple', 'A3200', '512GB', '', 'A3200', 1099.00, 700.00, 1000.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 16 Plus variants
('iphone_16_plus_128', 'iPhone 16 Plus', 'Apple', 'A3201', '128GB', '', 'A3201', 899.00, 600.00, 800.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_plus_256', 'iPhone 16 Plus', 'Apple', 'A3201', '256GB', '', 'A3201', 999.00, 700.00, 900.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_plus_512', 'iPhone 16 Plus', 'Apple', 'A3201', '512GB', '', 'A3201', 1199.00, 800.00, 1100.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 16 Pro variants
('iphone_16_pro_128', 'iPhone 16 Pro', 'Apple', 'A3202', '128GB', '', 'A3202', 999.00, 700.00, 900.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_pro_256', 'iPhone 16 Pro', 'Apple', 'A3202', '256GB', '', 'A3202', 1099.00, 800.00, 1000.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_pro_512', 'iPhone 16 Pro', 'Apple', 'A3202', '512GB', '', 'A3202', 1299.00, 900.00, 1200.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_pro_1tb', 'iPhone 16 Pro', 'Apple', 'A3202', '1TB', '', 'A3202', 1499.00, 1000.00, 1400.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 16 Pro Max variants
('iphone_16_pro_max_256', 'iPhone 16 Pro Max', 'Apple', 'A3203', '256GB', '', 'A3203', 1199.00, 800.00, 1100.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_pro_max_512', 'iPhone 16 Pro Max', 'Apple', 'A3203', '512GB', '', 'A3203', 1399.00, 900.00, 1300.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_16_pro_max_1tb', 'iPhone 16 Pro Max', 'Apple', 'A3203', '1TB', '', 'A3203', 1599.00, 1000.00, 1500.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 17 variants
('iphone_17_128', 'iPhone 17', 'Apple', 'A3300', '128GB', '', 'A3300', 899.00, 600.00, 800.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_256', 'iPhone 17', 'Apple', 'A3300', '256GB', '', 'A3300', 999.00, 700.00, 900.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_512', 'iPhone 17', 'Apple', 'A3300', '512GB', '', 'A3300', 1199.00, 800.00, 1100.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 17 Plus variants
('iphone_17_plus_128', 'iPhone 17 Plus', 'Apple', 'A3301', '128GB', '', 'A3301', 999.00, 700.00, 900.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_plus_256', 'iPhone 17 Plus', 'Apple', 'A3301', '256GB', '', 'A3301', 1099.00, 800.00, 1000.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_plus_512', 'iPhone 17 Plus', 'Apple', 'A3301', '512GB', '', 'A3301', 1299.00, 900.00, 1200.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 17 Pro variants
('iphone_17_pro_128', 'iPhone 17 Pro', 'Apple', 'A3302', '128GB', '', 'A3302', 1099.00, 800.00, 1000.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_pro_256', 'iPhone 17 Pro', 'Apple', 'A3302', '256GB', '', 'A3302', 1199.00, 900.00, 1100.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_pro_512', 'iPhone 17 Pro', 'Apple', 'A3302', '512GB', '', 'A3302', 1399.00, 1000.00, 1300.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_pro_1tb', 'iPhone 17 Pro', 'Apple', 'A3302', '1TB', '', 'A3302', 1599.00, 1100.00, 1500.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- iPhone 17 Pro Max variants
('iphone_17_pro_max_256', 'iPhone 17 Pro Max', 'Apple', 'A3303', '256GB', '', 'A3303', 1299.00, 900.00, 1200.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_pro_max_512', 'iPhone 17 Pro Max', 'Apple', 'A3303', '512GB', '', 'A3303', 1499.00, 1000.00, 1400.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),
('iphone_17_pro_max_1tb', 'iPhone 17 Pro Max', 'Apple', 'A3303', '1TB', '', 'A3303', 1699.00, 1100.00, 1600.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_iphones'), NULL, 'smartphone', true),

-- Samsung Galaxy S Series
-- Galaxy S6 variants
('galaxy_s6_32', 'Galaxy S6', 'Samsung', 'SM-G920F', '32GB', '', 'SM-G920F', 150.00, 50.00, 120.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s6_64', 'Galaxy S6', 'Samsung', 'SM-G920F', '64GB', '', 'SM-G920F', 180.00, 60.00, 150.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S6 Edge variants
('galaxy_s6_edge_32', 'Galaxy S6 Edge', 'Samsung', 'SM-G925F', '32GB', '', 'SM-G925F', 200.00, 70.00, 170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s6_edge_64', 'Galaxy S6 Edge', 'Samsung', 'SM-G925F', '64GB', '', 'SM-G925F', 230.00, 80.00, 200.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S6 Edge+ variants
('galaxy_s6_edge_plus_32', 'Galaxy S6 Edge+', 'Samsung', 'SM-G928F', '32GB', '', 'SM-G928F', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s6_edge_plus_64', 'Galaxy S6 Edge+', 'Samsung', 'SM-G928F', '64GB', '', 'SM-G928F', 280.00, 100.00, 250.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S7 variants
('galaxy_s7_32', 'Galaxy S7', 'Samsung', 'SM-G930F', '32GB', '', 'SM-G930F', 180.00, 60.00, 150.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s7_64', 'Galaxy S7', 'Samsung', 'SM-G930F', '64GB', '', 'SM-G930F', 220.00, 80.00, 190.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S7 Edge variants
('galaxy_s7_edge_32', 'Galaxy S7 Edge', 'Samsung', 'SM-G935F', '32GB', '', 'SM-G935F', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s7_edge_64', 'Galaxy S7 Edge', 'Samsung', 'SM-G935F', '64GB', '', 'SM-G935F', 280.00, 100.00, 250.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S8 variants
('galaxy_s8_64', 'Galaxy S8', 'Samsung', 'SM-G950F', '64GB', '', 'SM-G950F', 200.00, 70.00, 170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s8_128', 'Galaxy S8', 'Samsung', 'SM-G950F', '128GB', '', 'SM-G950F', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S8+ variants
('galaxy_s8_plus_64', 'Galaxy S8+', 'Samsung', 'SM-G955F', '64GB', '', 'SM-G955F', 280.00, 100.00, 250.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s8_plus_128', 'Galaxy S8+', 'Samsung', 'SM-G955F', '128GB', '', 'SM-G955F', 320.00, 120.00, 290.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S9 variants
('galaxy_s9_64', 'Galaxy S9', 'Samsung', 'SM-G960F', '64GB', '', 'SM-G960F', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s9_128', 'Galaxy S9', 'Samsung', 'SM-G960F', '128GB', '', 'SM-G960F', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s9_256', 'Galaxy S9', 'Samsung', 'SM-G960F', '256GB', '', 'SM-G960F', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S9+ variants
('galaxy_s9_plus_64', 'Galaxy S9+', 'Samsung', 'SM-G965F', '64GB', '', 'SM-G965F', 320.00, 120.00, 290.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s9_plus_128', 'Galaxy S9+', 'Samsung', 'SM-G965F', '128GB', '', 'SM-G965F', 380.00, 140.00, 350.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s9_plus_256', 'Galaxy S9+', 'Samsung', 'SM-G965F', '256GB', '', 'SM-G965F', 430.00, 160.00, 400.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S10e variants
('galaxy_s10e_128', 'Galaxy S10e', 'Samsung', 'SM-G970F', '128GB', '', 'SM-G970F', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s10e_256', 'Galaxy S10e', 'Samsung', 'SM-G970F', '256GB', '', 'SM-G970F', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S10 variants
('galaxy_s10_128', 'Galaxy S10', 'Samsung', 'SM-G973F', '128GB', '', 'SM-G973F', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s10_512', 'Galaxy S10', 'Samsung', 'SM-G973F', '512GB', '', 'SM-G973F', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S10+ variants
('galaxy_s10_plus_128', 'Galaxy S10+', 'Samsung', 'SM-G975F', '128GB', '', 'SM-G975F', 450.00, 170.00, 420.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s10_plus_512', 'Galaxy S10+', 'Samsung', 'SM-G975F', '512GB', '', 'SM-G975F', 550.00, 200.00, 520.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s10_plus_1tb', 'Galaxy S10+', 'Samsung', 'SM-G975F', '1TB', '', 'SM-G975F', 650.00, 230.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S10 5G variants
('galaxy_s10_5g_256', 'Galaxy S10 5G', 'Samsung', 'SM-G977B', '256GB', '', 'SM-G977B', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s10_5g_512', 'Galaxy S10 5G', 'Samsung', 'SM-G977B', '512GB', '', 'SM-G977B', 600.00, 210.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S10 Lite variants
('galaxy_s10_lite_128', 'Galaxy S10 Lite', 'Samsung', 'SM-G770F', '128GB', '', 'SM-G770F', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s10_lite_256', 'Galaxy S10 Lite', 'Samsung', 'SM-G770F', '256GB', '', 'SM-G770F', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S20 variants
('galaxy_s20_128', 'Galaxy S20', 'Samsung', 'SM-G980F', '128GB', '', 'SM-G980F', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s20_256', 'Galaxy S20', 'Samsung', 'SM-G980F', '256GB', '', 'SM-G980F', 550.00, 200.00, 520.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S20+ variants
('galaxy_s20_plus_128', 'Galaxy S20+', 'Samsung', 'SM-G985F', '128GB', '', 'SM-G985F', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s20_plus_256', 'Galaxy S20+', 'Samsung', 'SM-G985F', '256GB', '', 'SM-G985F', 650.00, 240.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s20_plus_512', 'Galaxy S20+', 'Samsung', 'SM-G985F', '512GB', '', 'SM-G985F', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S20 Ultra variants
('galaxy_s20_ultra_128', 'Galaxy S20 Ultra', 'Samsung', 'SM-G988B', '128GB', '', 'SM-G988B', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s20_ultra_256', 'Galaxy S20 Ultra', 'Samsung', 'SM-G988B', '256GB', '', 'SM-G988B', 750.00, 280.00, 720.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s20_ultra_512', 'Galaxy S20 Ultra', 'Samsung', 'SM-G988B', '512GB', '', 'SM-G988B', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S20 FE variants
('galaxy_s20_fe_128', 'Galaxy S20 FE', 'Samsung', 'SM-G780F', '128GB', '', 'SM-G780F', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s20_fe_256', 'Galaxy S20 FE', 'Samsung', 'SM-G780F', '256GB', '', 'SM-G780F', 450.00, 170.00, 420.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S21 variants
('galaxy_s21_128', 'Galaxy S21', 'Samsung', 'SM-G991B', '128GB', '', 'SM-G991B', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s21_256', 'Galaxy S21', 'Samsung', 'SM-G991B', '256GB', '', 'SM-G991B', 650.00, 240.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S21+ variants
('galaxy_s21_plus_128', 'Galaxy S21+', 'Samsung', 'SM-G996B', '128GB', '', 'SM-G996B', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s21_plus_256', 'Galaxy S21+', 'Samsung', 'SM-G996B', '256GB', '', 'SM-G996B', 750.00, 280.00, 720.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S21 Ultra variants
('galaxy_s21_ultra_128', 'Galaxy S21 Ultra', 'Samsung', 'SM-G998B', '128GB', '', 'SM-G998B', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s21_ultra_256', 'Galaxy S21 Ultra', 'Samsung', 'SM-G998B', '256GB', '', 'SM-G998B', 850.00, 320.00, 820.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s21_ultra_512', 'Galaxy S21 Ultra', 'Samsung', 'SM-G998B', '512GB', '', 'SM-G998B', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S21 FE variants
('galaxy_s21_fe_128', 'Galaxy S21 FE', 'Samsung', 'SM-G990B', '128GB', '', 'SM-G990B', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s21_fe_256', 'Galaxy S21 FE', 'Samsung', 'SM-G990B', '256GB', '', 'SM-G990B', 550.00, 200.00, 520.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S22 variants
('galaxy_s22_128', 'Galaxy S22', 'Samsung', 'SM-S901B', '128GB', '', 'SM-S901B', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s22_256', 'Galaxy S22', 'Samsung', 'SM-S901B', '256GB', '', 'SM-S901B', 750.00, 280.00, 720.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S22+ variants
('galaxy_s22_plus_128', 'Galaxy S22+', 'Samsung', 'SM-S906B', '128GB', '', 'SM-S906B', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s22_plus_256', 'Galaxy S22+', 'Samsung', 'SM-S906B', '256GB', '', 'SM-S906B', 850.00, 320.00, 820.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S22 Ultra variants
('galaxy_s22_ultra_128', 'Galaxy S22 Ultra', 'Samsung', 'SM-S908B', '128GB', '', 'SM-S908B', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s22_ultra_256', 'Galaxy S22 Ultra', 'Samsung', 'SM-S908B', '256GB', '', 'SM-S908B', 950.00, 360.00, 920.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s22_ultra_512', 'Galaxy S22 Ultra', 'Samsung', 'SM-S908B', '512GB', '', 'SM-S908B', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s22_ultra_1tb', 'Galaxy S22 Ultra', 'Samsung', 'SM-S908B', '1TB', '', 'SM-S908B', 1100.00, 400.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S23 variants
('galaxy_s23_128', 'Galaxy S23', 'Samsung', 'SM-S911B', '128GB', '', 'SM-S911B', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s23_256', 'Galaxy S23', 'Samsung', 'SM-S911B', '256GB', '', 'SM-S911B', 850.00, 320.00, 820.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S23+ variants
('galaxy_s23_plus_128', 'Galaxy S23+', 'Samsung', 'SM-S916B', '128GB', '', 'SM-S916B', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s23_plus_256', 'Galaxy S23+', 'Samsung', 'SM-S916B', '256GB', '', 'SM-S916B', 950.00, 360.00, 920.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S23 Ultra variants
('galaxy_s23_ultra_256', 'Galaxy S23 Ultra', 'Samsung', 'SM-S918B', '256GB', '', 'SM-S918B', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s23_ultra_512', 'Galaxy S23 Ultra', 'Samsung', 'SM-S918B', '512GB', '', 'SM-S918B', 1100.00, 400.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s23_ultra_1tb', 'Galaxy S23 Ultra', 'Samsung', 'SM-S918B', '1TB', '', 'SM-S918B', 1200.00, 420.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S23 FE variants
('galaxy_s23_fe_128', 'Galaxy S23 FE', 'Samsung', 'SM-S711B', '128GB', '', 'SM-S711B', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s23_fe_256', 'Galaxy S23 FE', 'Samsung', 'SM-S711B', '256GB', '', 'SM-S711B', 650.00, 240.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S24 variants
('galaxy_s24_128', 'Galaxy S24', 'Samsung', 'SM-S921B', '128GB', '', 'SM-S921B', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s24_256', 'Galaxy S24', 'Samsung', 'SM-S921B', '256GB', '', 'SM-S921B', 950.00, 360.00, 920.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S24+ variants
('galaxy_s24_plus_256', 'Galaxy S24+', 'Samsung', 'SM-S926B', '256GB', '', 'SM-S926B', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s24_plus_512', 'Galaxy S24+', 'Samsung', 'SM-S926B', '512GB', '', 'SM-S926B', 1100.00, 400.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S24 Ultra variants
('galaxy_s24_ultra_256', 'Galaxy S24 Ultra', 'Samsung', 'SM-S928B', '256GB', '', 'SM-S928B', 1200.00, 420.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s24_ultra_512', 'Galaxy S24 Ultra', 'Samsung', 'SM-S928B', '512GB', '', 'SM-S928B', 1300.00, 440.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s24_ultra_1tb', 'Galaxy S24 Ultra', 'Samsung', 'SM-S928B', '1TB', '', 'SM-S928B', 1400.00, 460.00, 1370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S24 FE variants
('galaxy_s24_fe_128', 'Galaxy S24 FE', 'Samsung', 'SM-S721B', '128GB', '', 'SM-S721B', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s24_fe_256', 'Galaxy S24 FE', 'Samsung', 'SM-S721B', '256GB', '', 'SM-S721B', 750.00, 280.00, 720.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S25 variants
('galaxy_s25_128', 'Galaxy S25', 'Samsung', 'SM-S931B', '128GB', '', 'SM-S931B', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s25_256', 'Galaxy S25', 'Samsung', 'SM-S931B', '256GB', '', 'SM-S931B', 1050.00, 400.00, 1020.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S25+ variants
('galaxy_s25_plus_256', 'Galaxy S25+', 'Samsung', 'SM-S936B', '256GB', '', 'SM-S936B', 1100.00, 420.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s25_plus_512', 'Galaxy S25+', 'Samsung', 'SM-S936B', '512GB', '', 'SM-S936B', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S25 Ultra variants
('galaxy_s25_ultra_256', 'Galaxy S25 Ultra', 'Samsung', 'SM-S938B', '256GB', '', 'SM-S938B', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s25_ultra_512', 'Galaxy S25 Ultra', 'Samsung', 'SM-S938B', '512GB', '', 'SM-S938B', 1400.00, 480.00, 1370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s25_ultra_1tb', 'Galaxy S25 Ultra', 'Samsung', 'SM-S938B', '1TB', '', 'SM-S938B', 1500.00, 500.00, 1470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S25 Edge variants
('galaxy_s25_edge_256', 'Galaxy S25 Edge', 'Samsung', 'SM-S939B', '256GB', '', 'SM-S939B', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s25_edge_512', 'Galaxy S25 Edge', 'Samsung', 'SM-S939B', '512GB', '', 'SM-S939B', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy S25 FE variants
('galaxy_s25_fe_128', 'Galaxy S25 FE', 'Samsung', 'SM-S731B', '128GB', '', 'SM-S731B', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_s25_fe_256', 'Galaxy S25 FE', 'Samsung', 'SM-S731B', '256GB', '', 'SM-S731B', 850.00, 320.00, 820.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Samsung Galaxy Note Series
-- Galaxy Note5 variants
('galaxy_note5_32', 'Galaxy Note5', 'Samsung', 'SM-N920F', '32GB', '', 'SM-N920F', 200.00, 70.00, 170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note5_64', 'Galaxy Note5', 'Samsung', 'SM-N920F', '64GB', '', 'SM-N920F', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Note Fan Edition variants
('galaxy_note_fe_64', 'Galaxy Note Fan Edition', 'Samsung', 'SM-N935F', '64GB', '', 'SM-N935F', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note_fe_128', 'Galaxy Note Fan Edition', 'Samsung', 'SM-N935F', '128GB', '', 'SM-N935F', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Note7 variants
('galaxy_note7_64', 'Galaxy Note7', 'Samsung', 'SM-N930F', '64GB', '', 'SM-N930F', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note7_128', 'Galaxy Note7', 'Samsung', 'SM-N930F', '128GB', '', 'SM-N930F', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Note8 variants
('galaxy_note8_64', 'Galaxy Note8', 'Samsung', 'SM-N950F', '64GB', '', 'SM-N950F', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note8_128', 'Galaxy Note8', 'Samsung', 'SM-N950F', '128GB', '', 'SM-N950F', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note8_256', 'Galaxy Note8', 'Samsung', 'SM-N950F', '256GB', '', 'SM-N950F', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Note9 variants
('galaxy_note9_128', 'Galaxy Note9', 'Samsung', 'SM-N960F', '128GB', '', 'SM-N960F', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note9_256', 'Galaxy Note9', 'Samsung', 'SM-N960F', '256GB', '', 'SM-N960F', 450.00, 170.00, 420.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note9_512', 'Galaxy Note9', 'Samsung', 'SM-N960F', '512GB', '', 'SM-N960F', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Note10 variants
('galaxy_note10_256', 'Galaxy Note10', 'Samsung', 'SM-N970F', '256GB', '', 'SM-N970F', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note10_512', 'Galaxy Note10', 'Samsung', 'SM-N970F', '512GB', '', 'SM-N970F', 600.00, 210.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Note10+ variants
('galaxy_note10_plus_256', 'Galaxy Note10+', 'Samsung', 'SM-N975F', '256GB', '', 'SM-N975F', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note10_plus_512', 'Galaxy Note10+', 'Samsung', 'SM-N975F', '512GB', '', 'SM-N975F', 700.00, 250.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Note20 variants
('galaxy_note20_128', 'Galaxy Note20', 'Samsung', 'SM-N980F', '128GB', '', 'SM-N980F', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note20_256', 'Galaxy Note20', 'Samsung', 'SM-N980F', '256GB', '', 'SM-N980F', 650.00, 240.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Note20 Ultra variants
('galaxy_note20_ultra_128', 'Galaxy Note20 Ultra', 'Samsung', 'SM-N985F', '128GB', '', 'SM-N985F', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note20_ultra_256', 'Galaxy Note20 Ultra', 'Samsung', 'SM-N985F', '256GB', '', 'SM-N985F', 750.00, 280.00, 720.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_note20_ultra_512', 'Galaxy Note20 Ultra', 'Samsung', 'SM-N985F', '512GB', '', 'SM-N985F', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Samsung Galaxy Fold Series
-- Galaxy Fold variants
('galaxy_fold_512', 'Galaxy Fold', 'Samsung', 'SM-F900F', '512GB', '', 'SM-F900F', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Fold 5G variants
('galaxy_fold_5g_512', 'Galaxy Fold 5G', 'Samsung', 'SM-F907B', '512GB', '', 'SM-F907B', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Samsung Galaxy Z Flip Series
-- Galaxy Z Flip (LTE) variants
('galaxy_z_flip_lte_256', 'Galaxy Z Flip (LTE)', 'Samsung', 'SM-F700F', '256GB', '', 'SM-F700F', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Flip 5G variants
('galaxy_z_flip_5g_256', 'Galaxy Z Flip 5G', 'Samsung', 'SM-F707B', '256GB', '', 'SM-F707B', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Flip3 variants
('galaxy_z_flip3_128', 'Galaxy Z Flip3', 'Samsung', 'SM-F711B', '128GB', '', 'SM-F711B', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_flip3_256', 'Galaxy Z Flip3', 'Samsung', 'SM-F711B', '256GB', '', 'SM-F711B', 850.00, 320.00, 820.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Flip4 variants
('galaxy_z_flip4_128', 'Galaxy Z Flip4', 'Samsung', 'SM-F721B', '128GB', '', 'SM-F721B', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_flip4_256', 'Galaxy Z Flip4', 'Samsung', 'SM-F721B', '256GB', '', 'SM-F721B', 950.00, 360.00, 920.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_flip4_512', 'Galaxy Z Flip4', 'Samsung', 'SM-F721B', '512GB', '', 'SM-F721B', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Flip5 variants
('galaxy_z_flip5_256', 'Galaxy Z Flip5', 'Samsung', 'SM-F731B', '256GB', '', 'SM-F731B', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_flip5_512', 'Galaxy Z Flip5', 'Samsung', 'SM-F731B', '512GB', '', 'SM-F731B', 1100.00, 400.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Flip6 variants
('galaxy_z_flip6_256', 'Galaxy Z Flip6', 'Samsung', 'SM-F741B', '256GB', '', 'SM-F741B', 1100.00, 420.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_flip6_512', 'Galaxy Z Flip6', 'Samsung', 'SM-F741B', '512GB', '', 'SM-F741B', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Flip7 variants
('galaxy_z_flip7_256', 'Galaxy Z Flip7', 'Samsung', 'SM-F751B', '256GB', '', 'SM-F751B', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_flip7_512', 'Galaxy Z Flip7', 'Samsung', 'SM-F751B', '512GB', '', 'SM-F751B', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Flip7 FE variants
('galaxy_z_flip7_fe_128', 'Galaxy Z Flip7 FE', 'Samsung', 'SM-F752B', '128GB', '', 'SM-F752B', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_flip7_fe_256', 'Galaxy Z Flip7 FE', 'Samsung', 'SM-F752B', '256GB', '', 'SM-F752B', 1100.00, 400.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Samsung Galaxy Z Fold Series
-- Galaxy Z Fold3 variants
('galaxy_z_fold3_256', 'Galaxy Z Fold3', 'Samsung', 'SM-F926B', '256GB', '', 'SM-F926B', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold3_512', 'Galaxy Z Fold3', 'Samsung', 'SM-F926B', '512GB', '', 'SM-F926B', 1100.00, 400.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Fold4 variants
('galaxy_z_fold4_256', 'Galaxy Z Fold4', 'Samsung', 'SM-F936B', '256GB', '', 'SM-F936B', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold4_512', 'Galaxy Z Fold4', 'Samsung', 'SM-F936B', '512GB', '', 'SM-F936B', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold4_1tb', 'Galaxy Z Fold4', 'Samsung', 'SM-F936B', '1TB', '', 'SM-F936B', 1400.00, 480.00, 1370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Fold5 variants
('galaxy_z_fold5_256', 'Galaxy Z Fold5', 'Samsung', 'SM-F946B', '256GB', '', 'SM-F946B', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold5_512', 'Galaxy Z Fold5', 'Samsung', 'SM-F946B', '512GB', '', 'SM-F946B', 1400.00, 480.00, 1370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold5_1tb', 'Galaxy Z Fold5', 'Samsung', 'SM-F946B', '1TB', '', 'SM-F946B', 1500.00, 500.00, 1470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Fold6 variants
('galaxy_z_fold6_256', 'Galaxy Z Fold6', 'Samsung', 'SM-F956B', '256GB', '', 'SM-F956B', 1400.00, 500.00, 1370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold6_512', 'Galaxy Z Fold6', 'Samsung', 'SM-F956B', '512GB', '', 'SM-F956B', 1500.00, 520.00, 1470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold6_1tb', 'Galaxy Z Fold6', 'Samsung', 'SM-F956B', '1TB', '', 'SM-F956B', 1600.00, 540.00, 1570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy Z Fold7 variants
('galaxy_z_fold7_256', 'Galaxy Z Fold7', 'Samsung', 'SM-F966B', '256GB', '', 'SM-F966B', 1500.00, 540.00, 1470.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold7_512', 'Galaxy Z Fold7', 'Samsung', 'SM-F966B', '512GB', '', 'SM-F966B', 1600.00, 560.00, 1570.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_z_fold7_1tb', 'Galaxy Z Fold7', 'Samsung', 'SM-F966B', '1TB', '', 'SM-F966B', 1700.00, 580.00, 1670.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Samsung Galaxy A Series
-- Galaxy A10e variants
('galaxy_a10e_32', 'Galaxy A10e', 'Samsung', 'SM-A102F', '32GB', '', 'SM-A102F', 80.00, 20.00, 60.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A10 variants
('galaxy_a10_32', 'Galaxy A10', 'Samsung', 'SM-A105F', '32GB', '', 'SM-A105F', 100.00, 30.00, 80.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A20e variants
('galaxy_a20e_32', 'Galaxy A20e', 'Samsung', 'SM-A202F', '32GB', '', 'SM-A202F', 120.00, 40.00, 100.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A20 variants
('galaxy_a20_32', 'Galaxy A20', 'Samsung', 'SM-A205F', '32GB', '', 'SM-A205F', 140.00, 50.00, 120.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A30 variants
('galaxy_a30_32', 'Galaxy A30', 'Samsung', 'SM-A305F', '32GB', '', 'SM-A305F', 160.00, 60.00, 140.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a30_64', 'Galaxy A30', 'Samsung', 'SM-A305F', '64GB', '', 'SM-A305F', 180.00, 70.00, 160.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A40 variants
('galaxy_a40_64', 'Galaxy A40', 'Samsung', 'SM-A405F', '64GB', '', 'SM-A405F', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A50 variants
('galaxy_a50_64', 'Galaxy A50', 'Samsung', 'SM-A505F', '64GB', '', 'SM-A505F', 220.00, 90.00, 200.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a50_128', 'Galaxy A50', 'Samsung', 'SM-A505F', '128GB', '', 'SM-A505F', 250.00, 100.00, 230.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A70 variants
('galaxy_a70_128', 'Galaxy A70', 'Samsung', 'SM-A705F', '128GB', '', 'SM-A705F', 280.00, 110.00, 260.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A80 variants
('galaxy_a80_128', 'Galaxy A80', 'Samsung', 'SM-A805F', '128GB', '', 'SM-A805F', 320.00, 130.00, 300.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A90 5G variants
('galaxy_a90_5g_128', 'Galaxy A90 5G', 'Samsung', 'SM-A908B', '128GB', '', 'SM-A908B', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A01 variants
('galaxy_a01_32', 'Galaxy A01', 'Samsung', 'SM-A015F', '32GB', '', 'SM-A015F', 90.00, 25.00, 70.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A11 variants
('galaxy_a11_32', 'Galaxy A11', 'Samsung', 'SM-A115F', '32GB', '', 'SM-A115F', 110.00, 35.00, 90.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A21 variants
('galaxy_a21_32', 'Galaxy A21', 'Samsung', 'SM-A215F', '32GB', '', 'SM-A215F', 130.00, 45.00, 110.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a21_64', 'Galaxy A21', 'Samsung', 'SM-A215F', '64GB', '', 'SM-A215F', 150.00, 55.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A21s variants
('galaxy_a21s_32', 'Galaxy A21s', 'Samsung', 'SM-A217F', '32GB', '', 'SM-A217F', 140.00, 50.00, 120.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a21s_64', 'Galaxy A21s', 'Samsung', 'SM-A217F', '64GB', '', 'SM-A217F', 160.00, 60.00, 140.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A31 variants
('galaxy_a31_64', 'Galaxy A31', 'Samsung', 'SM-A315F', '64GB', '', 'SM-A315F', 180.00, 70.00, 160.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a31_128', 'Galaxy A31', 'Samsung', 'SM-A315F', '128GB', '', 'SM-A315F', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A41 variants
('galaxy_a41_64', 'Galaxy A41', 'Samsung', 'SM-A415F', '64GB', '', 'SM-A415F', 220.00, 90.00, 200.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A51 variants
('galaxy_a51_64', 'Galaxy A51', 'Samsung', 'SM-A515F', '64GB', '', 'SM-A515F', 250.00, 100.00, 230.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a51_128', 'Galaxy A51', 'Samsung', 'SM-A515F', '128GB', '', 'SM-A515F', 280.00, 110.00, 260.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A51 5G variants
('galaxy_a51_5g_128', 'Galaxy A51 5G', 'Samsung', 'SM-A516B', '128GB', '', 'SM-A516B', 320.00, 130.00, 300.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A71 variants
('galaxy_a71_128', 'Galaxy A71', 'Samsung', 'SM-A715F', '128GB', '', 'SM-A715F', 300.00, 120.00, 280.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A71 5G variants
('galaxy_a71_5g_128', 'Galaxy A71 5G', 'Samsung', 'SM-A716B', '128GB', '', 'SM-A716B', 350.00, 140.00, 330.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A02s variants
('galaxy_a02s_32', 'Galaxy A02s', 'Samsung', 'SM-A025F', '32GB', '', 'SM-A025F', 100.00, 30.00, 80.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a02s_64', 'Galaxy A02s', 'Samsung', 'SM-A025F', '64GB', '', 'SM-A025F', 120.00, 40.00, 100.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A12 variants
('galaxy_a12_32', 'Galaxy A12', 'Samsung', 'SM-A125F', '32GB', '', 'SM-A125F', 120.00, 40.00, 100.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a12_64', 'Galaxy A12', 'Samsung', 'SM-A125F', '64GB', '', 'SM-A125F', 140.00, 50.00, 120.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a12_128', 'Galaxy A12', 'Samsung', 'SM-A125F', '128GB', '', 'SM-A125F', 160.00, 60.00, 140.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A32 5G variants
('galaxy_a32_5g_64', 'Galaxy A32 5G', 'Samsung', 'SM-A326B', '64GB', '', 'SM-A326B', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a32_5g_128', 'Galaxy A32 5G', 'Samsung', 'SM-A326B', '128GB', '', 'SM-A326B', 230.00, 90.00, 210.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A42 5G variants
('galaxy_a42_5g_128', 'Galaxy A42 5G', 'Samsung', 'SM-A426B', '128GB', '', 'SM-A426B', 250.00, 100.00, 230.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A52 variants
('galaxy_a52_128', 'Galaxy A52', 'Samsung', 'SM-A525F', '128GB', '', 'SM-A525F', 280.00, 110.00, 260.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a52_256', 'Galaxy A52', 'Samsung', 'SM-A525F', '256GB', '', 'SM-A525F', 320.00, 130.00, 300.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A52 5G variants
('galaxy_a52_5g_128', 'Galaxy A52 5G', 'Samsung', 'SM-A526B', '128GB', '', 'SM-A526B', 320.00, 130.00, 300.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a52_5g_256', 'Galaxy A52 5G', 'Samsung', 'SM-A526B', '256GB', '', 'SM-A526B', 360.00, 150.00, 340.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A72 variants
('galaxy_a72_128', 'Galaxy A72', 'Samsung', 'SM-A725F', '128GB', '', 'SM-A725F', 320.00, 130.00, 300.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a72_256', 'Galaxy A72', 'Samsung', 'SM-A725F', '256GB', '', 'SM-A725F', 360.00, 150.00, 340.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A13 variants
('galaxy_a13_32', 'Galaxy A13', 'Samsung', 'SM-A135F', '32GB', '', 'SM-A135F', 130.00, 45.00, 110.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a13_64', 'Galaxy A13', 'Samsung', 'SM-A135F', '64GB', '', 'SM-A135F', 150.00, 55.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a13_128', 'Galaxy A13', 'Samsung', 'SM-A135F', '128GB', '', 'SM-A135F', 170.00, 65.00, 150.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A23 5G variants
('galaxy_a23_5g_64', 'Galaxy A23 5G', 'Samsung', 'SM-A236B', '64GB', '', 'SM-A236B', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a23_5g_128', 'Galaxy A23 5G', 'Samsung', 'SM-A236B', '128GB', '', 'SM-A236B', 230.00, 90.00, 210.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A33 5G variants
('galaxy_a33_5g_128', 'Galaxy A33 5G', 'Samsung', 'SM-A336B', '128GB', '', 'SM-A336B', 250.00, 100.00, 230.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a33_5g_256', 'Galaxy A33 5G', 'Samsung', 'SM-A336B', '256GB', '', 'SM-A336B', 280.00, 110.00, 260.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A53 5G variants
('galaxy_a53_5g_128', 'Galaxy A53 5G', 'Samsung', 'SM-A536B', '128GB', '', 'SM-A536B', 300.00, 120.00, 280.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a53_5g_256', 'Galaxy A53 5G', 'Samsung', 'SM-A536B', '256GB', '', 'SM-A536B', 340.00, 140.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A73 5G variants
('galaxy_a73_5g_128', 'Galaxy A73 5G', 'Samsung', 'SM-A736B', '128GB', '', 'SM-A736B', 350.00, 140.00, 330.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a73_5g_256', 'Galaxy A73 5G', 'Samsung', 'SM-A736B', '256GB', '', 'SM-A736B', 390.00, 160.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A14 5G variants
('galaxy_a14_5g_64', 'Galaxy A14 5G', 'Samsung', 'SM-A146B', '64GB', '', 'SM-A146B', 180.00, 70.00, 160.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a14_5g_128', 'Galaxy A14 5G', 'Samsung', 'SM-A146B', '128GB', '', 'SM-A146B', 210.00, 80.00, 190.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A24 variants
('galaxy_a24_128', 'Galaxy A24', 'Samsung', 'SM-A245F', '128GB', '', 'SM-A245F', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A34 5G variants
('galaxy_a34_5g_128', 'Galaxy A34 5G', 'Samsung', 'SM-A346B', '128GB', '', 'SM-A346B', 250.00, 100.00, 230.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a34_5g_256', 'Galaxy A34 5G', 'Samsung', 'SM-A346B', '256GB', '', 'SM-A346B', 280.00, 110.00, 260.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A54 5G variants
('galaxy_a54_5g_128', 'Galaxy A54 5G', 'Samsung', 'SM-A546B', '128GB', '', 'SM-A546B', 300.00, 120.00, 280.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a54_5g_256', 'Galaxy A54 5G', 'Samsung', 'SM-A546B', '256GB', '', 'SM-A546B', 340.00, 140.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A26 5G variants
('galaxy_a26_5g_128', 'Galaxy A26 5G', 'Samsung', 'SM-A266B', '128GB', '', 'SM-A266B', 220.00, 90.00, 200.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A35 5G variants
('galaxy_a35_5g_128', 'Galaxy A35 5G', 'Samsung', 'SM-A356B', '128GB', '', 'SM-A356B', 280.00, 110.00, 260.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a35_5g_256', 'Galaxy A35 5G', 'Samsung', 'SM-A356B', '256GB', '', 'SM-A356B', 320.00, 130.00, 300.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A36 5G variants
('galaxy_a36_5g_128', 'Galaxy A36 5G', 'Samsung', 'SM-A366B', '128GB', '', 'SM-A366B', 300.00, 120.00, 280.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Galaxy A56 5G variants
('galaxy_a56_5g_128', 'Galaxy A56 5G', 'Samsung', 'SM-A566B', '128GB', '', 'SM-A566B', 350.00, 140.00, 330.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),
('galaxy_a56_5g_256', 'Galaxy A56 5G', 'Samsung', 'SM-A566B', '256GB', '', 'SM-A566B', 390.00, 160.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'samsung_galaxy'), NULL, 'smartphone', true),

-- Google Pixel Series
-- Pixel 3 variants
('pixel_3_64', 'Pixel 3', 'Google', 'G013A', '64GB', '', 'G013A', 200.00, 70.00, 170.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_3_128', 'Pixel 3', 'Google', 'G013A', '128GB', '', 'G013A', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 3 XL variants
('pixel_3_xl_64', 'Pixel 3 XL', 'Google', 'G013C', '64GB', '', 'G013C', 280.00, 100.00, 250.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_3_xl_128', 'Pixel 3 XL', 'Google', 'G013C', '128GB', '', 'G013C', 320.00, 120.00, 290.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 3a variants
('pixel_3a_64', 'Pixel 3a', 'Google', 'G020A', '64GB', '', 'G020A', 150.00, 50.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_3a_128', 'Pixel 3a', 'Google', 'G020A', '128GB', '', 'G020A', 180.00, 60.00, 160.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 3a XL variants
('pixel_3a_xl_64', 'Pixel 3a XL', 'Google', 'G020C', '64GB', '', 'G020C', 200.00, 70.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_3a_xl_128', 'Pixel 3a XL', 'Google', 'G020C', '128GB', '', 'G020C', 230.00, 80.00, 210.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 4 variants
('pixel_4_64', 'Pixel 4', 'Google', 'G020I', '64GB', '', 'G020I', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_4_128', 'Pixel 4', 'Google', 'G020I', '128GB', '', 'G020I', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 4 XL variants
('pixel_4_xl_64', 'Pixel 4 XL', 'Google', 'G020J', '64GB', '', 'G020J', 320.00, 120.00, 290.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_4_xl_128', 'Pixel 4 XL', 'Google', 'G020J', '128GB', '', 'G020J', 370.00, 140.00, 340.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 4A with 5G variants
('pixel_4a_5g_128', 'Pixel 4A with 5G', 'Google', 'G025E', '128GB', '', 'G025E', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 6 variants
('pixel_6_128', 'Pixel 6', 'Google', 'G9S9B16', '128GB', '', 'G9S9B16', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_6_256', 'Pixel 6', 'Google', 'G9S9B16', '256GB', '', 'G9S9B16', 550.00, 200.00, 520.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 6 Pro variants
('pixel_6_pro_128', 'Pixel 6 Pro', 'Google', 'G8V0U', '128GB', '', 'G8V0U', 650.00, 240.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_6_pro_256', 'Pixel 6 Pro', 'Google', 'G8V0U', '256GB', '', 'G8V0U', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_6_pro_512', 'Pixel 6 Pro', 'Google', 'G8V0U', '512GB', '', 'G8V0U', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 6A variants
('pixel_6a_128', 'Pixel 6A', 'Google', 'G1AZG', '128GB', '', 'G1AZG', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 7 variants
('pixel_7_128', 'Pixel 7', 'Google', 'GE2AE', '128GB', '', 'GE2AE', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_7_256', 'Pixel 7', 'Google', 'GE2AE', '256GB', '', 'GE2AE', 650.00, 240.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 7 Pro variants
('pixel_7_pro_128', 'Pixel 7 Pro', 'Google', 'GP4BC', '128GB', '', 'GP4BC', 750.00, 280.00, 720.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_7_pro_256', 'Pixel 7 Pro', 'Google', 'GP4BC', '256GB', '', 'GP4BC', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_7_pro_512', 'Pixel 7 Pro', 'Google', 'GP4BC', '512GB', '', 'GP4BC', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 7A variants
('pixel_7a_128', 'Pixel 7A', 'Google', 'GHL1X', '128GB', '', 'GHL1X', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 8 variants
('pixel_8_128', 'Pixel 8', 'Google', 'G9BQD', '128GB', '', 'G9BQD', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_8_256', 'Pixel 8', 'Google', 'G9BQD', '256GB', '', 'G9BQD', 750.00, 280.00, 720.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 8 Pro variants
('pixel_8_pro_128', 'Pixel 8 Pro', 'Google', 'GC3VE', '128GB', '', 'GC3VE', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_8_pro_256', 'Pixel 8 Pro', 'Google', 'GC3VE', '256GB', '', 'GC3VE', 950.00, 360.00, 920.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_8_pro_512', 'Pixel 8 Pro', 'Google', 'GC3VE', '512GB', '', 'GC3VE', 1050.00, 380.00, 1020.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_8_pro_1tb', 'Pixel 8 Pro', 'Google', 'GC3VE', '1TB', '', 'GC3VE', 1150.00, 400.00, 1120.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 8A variants
('pixel_8a_128', 'Pixel 8A', 'Google', 'G6QU3', '128GB', '', 'G6QU3', 450.00, 170.00, 420.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_8a_256', 'Pixel 8A', 'Google', 'G6QU3', '256GB', '', 'G6QU3', 500.00, 190.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 9 variants
('pixel_9_128', 'Pixel 9', 'Google', 'G1MNW', '128GB', '', 'G1MNW', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_9_256', 'Pixel 9', 'Google', 'G1MNW', '256GB', '', 'G1MNW', 850.00, 320.00, 820.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 9 Pro variants
('pixel_9_pro_128', 'Pixel 9 Pro', 'Google', 'G1MNX', '128GB', '', 'G1MNX', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_9_pro_256', 'Pixel 9 Pro', 'Google', 'G1MNX', '256GB', '', 'G1MNX', 1050.00, 400.00, 1020.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_9_pro_512', 'Pixel 9 Pro', 'Google', 'G1MNX', '512GB', '', 'G1MNX', 1150.00, 420.00, 1120.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 9 Pro Fold variants
('pixel_9_pro_fold_256', 'Pixel 9 Pro Fold', 'Google', 'G1MNY', '256GB', '', 'G1MNY', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_9_pro_fold_512', 'Pixel 9 Pro Fold', 'Google', 'G1MNY', '512GB', '', 'G1MNY', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_9_pro_fold_1tb', 'Pixel 9 Pro Fold', 'Google', 'G1MNY', '1TB', '', 'G1MNY', 1400.00, 480.00, 1370.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 9 Pro XL variants
('pixel_9_pro_xl_256', 'Pixel 9 Pro XL', 'Google', 'G1MNZ', '256GB', '', 'G1MNZ', 1100.00, 420.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_9_pro_xl_512', 'Pixel 9 Pro XL', 'Google', 'G1MNZ', '512GB', '', 'G1MNZ', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_9_pro_xl_1tb', 'Pixel 9 Pro XL', 'Google', 'G1MNZ', '1TB', '', 'G1MNZ', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 9A variants
('pixel_9a_128', 'Pixel 9A', 'Google', 'G1MO0', '128GB', '', 'G1MO0', 500.00, 190.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_9a_256', 'Pixel 9A', 'Google', 'G1MO0', '256GB', '', 'G1MO0', 550.00, 210.00, 520.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 10 variants
('pixel_10_128', 'Pixel 10', 'Google', 'G2ABC', '128GB', '', 'G2ABC', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_10_256', 'Pixel 10', 'Google', 'G2ABC', '256GB', '', 'G2ABC', 950.00, 360.00, 920.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 10 Pro variants
('pixel_10_pro_256', 'Pixel 10 Pro', 'Google', 'G2ABD', '256GB', '', 'G2ABD', 1100.00, 420.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_10_pro_512', 'Pixel 10 Pro', 'Google', 'G2ABD', '512GB', '', 'G2ABD', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_10_pro_1tb', 'Pixel 10 Pro', 'Google', 'G2ABD', '1TB', '', 'G2ABD', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Pixel 10 Pro XL variants
('pixel_10_pro_xl_256', 'Pixel 10 Pro XL', 'Google', 'G2ABE', '256GB', '', 'G2ABE', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_10_pro_xl_512', 'Pixel 10 Pro XL', 'Google', 'G2ABE', '512GB', '', 'G2ABE', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),
('pixel_10_pro_xl_1tb', 'Pixel 10 Pro XL', 'Google', 'G2ABE', '1TB', '', 'G2ABE', 1400.00, 480.00, 1370.00, 
 (SELECT id FROM public.categories WHERE key = 'google_pixel'), NULL, 'smartphone', true),

-- Motorola Series
-- Edge variants
('motorola_edge_128', 'Edge', 'Motorola', 'XT2063-3', '128GB', '', 'XT2063-3', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_edge_256', 'Edge', 'Motorola', 'XT2063-3', '256GB', '', 'XT2063-3', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Edge (2022) variants
('motorola_edge_2022_128', 'Edge (2022)', 'Motorola', 'XT2203-1', '128GB', '', 'XT2203-1', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_edge_2022_256', 'Edge (2022)', 'Motorola', 'XT2203-1', '256GB', '', 'XT2203-1', 450.00, 170.00, 420.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Edge Plus variants
('motorola_edge_plus_128', 'Edge Plus', 'Motorola', 'XT2061-1', '128GB', '', 'XT2061-1', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_edge_plus_256', 'Edge Plus', 'Motorola', 'XT2061-1', '256GB', '', 'XT2061-1', 550.00, 200.00, 520.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Edge Plus (2020) variants
('motorola_edge_plus_2020_128', 'Edge Plus (2020)', 'Motorola', 'XT2061-1', '128GB', '', 'XT2061-1', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_edge_plus_2020_256', 'Edge Plus (2020)', 'Motorola', 'XT2061-1', '256GB', '', 'XT2061-1', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Moto G Fast variants
('moto_g_fast_32', 'Moto G Fast', 'Motorola', 'XT2045-4', '32GB', '', 'XT2045-4', 120.00, 40.00, 100.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('moto_g_fast_64', 'Moto G Fast', 'Motorola', 'XT2045-4', '64GB', '', 'XT2045-4', 150.00, 50.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Moto G Power variants
('moto_g_power_32', 'Moto G Power', 'Motorola', 'XT2041-4', '32GB', '', 'XT2041-4', 130.00, 45.00, 110.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('moto_g_power_64', 'Moto G Power', 'Motorola', 'XT2041-4', '64GB', '', 'XT2041-4', 160.00, 55.00, 140.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Moto G Power (2020) variants
('moto_g_power_2020_32', 'Moto G Power (2020)', 'Motorola', 'XT2041-4', '32GB', '', 'XT2041-4', 100.00, 30.00, 80.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('moto_g_power_2020_64', 'Moto G Power (2020)', 'Motorola', 'XT2041-4', '64GB', '', 'XT2041-4', 130.00, 40.00, 110.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Moto G Pure variants
('moto_g_pure_32', 'Moto G Pure', 'Motorola', 'XT2163-4', '32GB', '', 'XT2163-4', 110.00, 35.00, 90.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('moto_g_pure_64', 'Moto G Pure', 'Motorola', 'XT2163-4', '64GB', '', 'XT2163-4', 140.00, 45.00, 120.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Moto G Stylus variants
('moto_g_stylus_64', 'Moto G Stylus', 'Motorola', 'XT2043-4', '64GB', '', 'XT2043-4', 180.00, 60.00, 160.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('moto_g_stylus_128', 'Moto G Stylus', 'Motorola', 'XT2043-4', '128GB', '', 'XT2043-4', 220.00, 80.00, 200.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Moto One 5G Ace variants
('moto_one_5g_ace_128', 'Moto One 5G Ace', 'Motorola', 'XT2113-1', '128GB', '', 'XT2113-1', 250.00, 90.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('moto_one_5g_ace_256', 'Moto One 5G Ace', 'Motorola', 'XT2113-1', '256GB', '', 'XT2113-1', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Razr variants
('motorola_razr_128', 'Razr', 'Motorola', 'XT2000-1', '128GB', '', 'XT2000-1', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_razr_256', 'Razr', 'Motorola', 'XT2000-1', '256GB', '', 'XT2000-1', 650.00, 240.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Razr (2023) variants
('motorola_razr_2023_128', 'Razr (2023)', 'Motorola', 'XT2313-1', '128GB', '', 'XT2313-1', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_razr_2023_256', 'Razr (2023)', 'Motorola', 'XT2313-1', '256GB', '', 'XT2313-1', 750.00, 280.00, 720.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Razr Plus variants
('motorola_razr_plus_128', 'Razr Plus', 'Motorola', 'XT2321-1', '128GB', '', 'XT2321-1', 800.00, 300.00, 770.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_razr_plus_256', 'Razr Plus', 'Motorola', 'XT2321-1', '256GB', '', 'XT2321-1', 850.00, 320.00, 820.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Razr Plus (2023) variants
('motorola_razr_plus_2023_128', 'Razr Plus (2023)', 'Motorola', 'XT2321-1', '128GB', '', 'XT2321-1', 900.00, 340.00, 870.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_razr_plus_2023_256', 'Razr Plus (2023)', 'Motorola', 'XT2321-1', '256GB', '', 'XT2321-1', 950.00, 360.00, 920.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Razr Ultra variants
('motorola_razr_ultra_256', 'Razr Ultra', 'Motorola', 'XT2421-1', '256GB', '', 'XT2421-1', 1000.00, 380.00, 970.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_razr_ultra_512', 'Razr Ultra', 'Motorola', 'XT2421-1', '512GB', '', 'XT2421-1', 1100.00, 400.00, 1070.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Razr Ultra (2025) variants
('motorola_razr_ultra_2025_256', 'Razr Ultra (2025)', 'Motorola', 'XT2521-1', '256GB', '', 'XT2521-1', 1200.00, 440.00, 1170.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_razr_ultra_2025_512', 'Razr Ultra (2025)', 'Motorola', 'XT2521-1', '512GB', '', 'XT2521-1', 1300.00, 460.00, 1270.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- ThinkPhone variants
('motorola_thinkphone_128', 'ThinkPhone', 'Motorola', 'XT2309-1', '128GB', '', 'XT2309-1', 600.00, 220.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_thinkphone_256', 'ThinkPhone', 'Motorola', 'XT2309-1', '256GB', '', 'XT2309-1', 650.00, 240.00, 620.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),
('motorola_thinkphone_512', 'ThinkPhone', 'Motorola', 'XT2309-1', '512GB', '', 'XT2309-1', 700.00, 260.00, 670.00, 
 (SELECT id FROM public.categories WHERE key = 'motorola'), NULL, 'smartphone', true),

-- Gaming Consoles
-- PlayStation 5 Slim variants
('playstation_5_slim_1tb', 'PlayStation 5 Slim', 'Sony', 'CFI-2015', '1TB', '', 'CFI-2015', 500.00, 200.00, 450.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- PlayStation 5 Slim Digital variants
('playstation_5_slim_digital_1tb', 'PlayStation 5 Slim Digital', 'Sony', 'CFI-2016', '1TB', '', 'CFI-2016', 450.00, 180.00, 400.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- PlayStation 5 Disc variants
('playstation_5_disc_1tb', 'PlayStation 5 Disc', 'Sony', 'CFI-1015A', '1TB', '', 'CFI-1015A', 480.00, 190.00, 430.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- PlayStation 5 Digital Edition variants
('playstation_5_digital_1tb', 'PlayStation 5 Digital Edition', 'Sony', 'CFI-1016A', '1TB', '', 'CFI-1016A', 430.00, 170.00, 380.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- PlayStation 4 Pro variants
('playstation_4_pro_1tb', 'PlayStation 4 Pro', 'Sony', 'CUH-7015B', '1TB', '', 'CUH-7015B', 250.00, 100.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- PlayStation 5 Pro variants
('playstation_5_pro_1tb', 'PlayStation 5 Pro', 'Sony', 'CFI-3015', '1TB', '', 'CFI-3015', 600.00, 240.00, 550.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- PlayStation 4 variants
('playstation_4_500gb', 'PlayStation 4', 'Sony', 'CUH-1115A', '500GB', '', 'CUH-1115A', 150.00, 60.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),
('playstation_4_1tb', 'PlayStation 4', 'Sony', 'CUH-1115A', '1TB', '', 'CUH-1115A', 180.00, 70.00, 160.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- PlayStation 4 Slim variants
('playstation_4_slim_500gb', 'PlayStation 4 Slim', 'Sony', 'CUH-2015A', '500GB', '', 'CUH-2015A', 170.00, 65.00, 150.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),
('playstation_4_slim_1tb', 'PlayStation 4 Slim', 'Sony', 'CUH-2015A', '1TB', '', 'CUH-2015A', 200.00, 75.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Xbox Series X variants
('xbox_series_x_1tb', 'Xbox Series X', 'Microsoft', 'RRT-00001', '1TB', '', 'RRT-00001', 500.00, 200.00, 450.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Xbox Series S variants
('xbox_series_s_512gb', 'Xbox Series S', 'Microsoft', 'RRS-00001', '512GB', '', 'RRS-00001', 300.00, 120.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),
('xbox_series_s_1tb', 'Xbox Series S', 'Microsoft', 'RRS-00001', '1TB', '', 'RRS-00001', 350.00, 140.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Xbox One X variants
('xbox_one_x_1tb', 'Xbox One X', 'Microsoft', '1787', '1TB', '', '1787', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Xbox One S variants
('xbox_one_s_500gb', 'Xbox One S', 'Microsoft', '1681', '500GB', '', '1681', 120.00, 50.00, 100.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),
('xbox_one_s_1tb', 'Xbox One S', 'Microsoft', '1681', '1TB', '', '1681', 150.00, 60.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch Series
-- Nintendo Switch (2017) variants
('nintendo_switch_2017_32gb', 'Nintendo Switch (2017)', 'Nintendo', 'HAC-001', '32GB', '', 'HAC-001', 250.00, 100.00, 220.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch (2019 - Improved Battery) variants
('nintendo_switch_2019_32gb', 'Nintendo Switch (2019 - Improved Battery)', 'Nintendo', 'HAC-001(-01)', '32GB', '', 'HAC-001(-01)', 280.00, 110.00, 250.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch Lite variants
('nintendo_switch_lite_32gb', 'Nintendo Switch Lite', 'Nintendo', 'HDH-001', '32GB', '', 'HDH-001', 180.00, 70.00, 160.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch OLED variants
('nintendo_switch_oled_64gb', 'Nintendo Switch OLED', 'Nintendo', 'HEG-001', '64GB', '', 'HEG-001', 350.00, 140.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch 2 variants
('nintendo_switch_2_64gb', 'Nintendo Switch 2', 'Nintendo', 'HEG-002', '64GB', '', 'HEG-002', 400.00, 160.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch - Animal Crossing Edition variants
('nintendo_switch_animal_crossing_32gb', 'Nintendo Switch - Animal Crossing Edition', 'Nintendo', 'HAC-001(-01)', '32GB', '', 'HAC-001(-01)', 300.00, 120.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch - Pokémon Sword and Shield Edition variants
('nintendo_switch_pokemon_sword_shield_32gb', 'Nintendo Switch - Pokémon Sword and Shield Edition', 'Nintendo', 'HAC-001(-01)', '32GB', '', 'HAC-001(-01)', 320.00, 130.00, 290.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch - Splatoon 2 Edition variants
('nintendo_switch_splatoon_2_32gb', 'Nintendo Switch - Splatoon 2 Edition', 'Nintendo', 'HAC-001', '32GB', '', 'HAC-001', 310.00, 125.00, 280.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch - Super Smash Bros. Edition variants
('nintendo_switch_smash_bros_32gb', 'Nintendo Switch - Super Smash Bros. Edition', 'Nintendo', 'HAC-001', '32GB', '', 'HAC-001', 330.00, 135.00, 300.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Nintendo Switch - Fortnite Edition variants
('nintendo_switch_fortnite_32gb', 'Nintendo Switch - Fortnite Edition', 'Nintendo', 'HAC-001(-01)', '32GB', '', 'HAC-001(-01)', 290.00, 115.00, 260.00, 
 (SELECT id FROM public.categories WHERE key = 'gaming_consoles'), NULL, 'gamepad', true),

-- Apple Watch Series
-- Watch Ultra 49mm GPS + Cellular variants
('apple_watch_ultra_49mm_gps_cellular', 'Watch Ultra 49mm GPS + Cellular', 'Apple', 'A2622', '49mm', '', 'A2622', 800.00, 300.00, 750.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_watch'), NULL, 'watch', true),

-- Watch Series 10 46mm GPS Only variants
('apple_watch_series_10_46mm_gps', 'Watch Series 10 46mm GPS Only', 'Apple', 'A3000', '46mm', '', 'A3000', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_watch'), NULL, 'watch', true),

-- Watch Series 10 46mm GPS + Cellular variants
('apple_watch_series_10_46mm_gps_cellular', 'Watch Series 10 46mm GPS + Cellular', 'Apple', 'A3001', '46mm', '', 'A3001', 500.00, 180.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_watch'), NULL, 'watch', true),

-- Watch Series 9 45mm GPS + Cellular variants
('apple_watch_series_9_45mm_gps_cellular', 'Watch Series 9 45mm GPS + Cellular', 'Apple', 'A2857', '45mm', '', 'A2857', 450.00, 170.00, 420.00, 
 (SELECT id FROM public.categories WHERE key = 'apple_watch'), NULL, 'watch', true),

-- Headphones Series
-- Apple AirPods variants
('apple_airpods_1st_gen', 'AirPods 1st Gen', 'Apple', 'A1523', 'Standard', '', 'A1523', 120.00, 40.00, 100.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),
('apple_airpods_2nd_gen', 'AirPods 2nd Gen', 'Apple', 'A2031', 'Standard', '', 'A2031', 150.00, 50.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),

-- Sony WH-1000XM Series variants
('sony_wh1000xm6', 'Sony WH-1000XM6', 'Sony', 'WH-1000XM6', 'Standard', '', 'WH-1000XM6', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),
('sony_wh1000xm5', 'Sony WH-1000XM5', 'Sony', 'WH-1000XM5', 'Standard', '', 'WH-1000XM5', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),
('sony_wh1000xm4', 'Sony WH-1000XM4', 'Sony', 'WH-1000XM4', 'Standard', '', 'WH-1000XM4', 280.00, 100.00, 250.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),

-- Bose Headphones variants
('bose_quietcomfort_ultra', 'Bose QuietComfort Ultra', 'Bose', 'QC-Ultra', 'Standard', '', 'QC-Ultra', 450.00, 170.00, 420.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),
('bose_quietcomfort_45', 'Bose QuietComfort 45', 'Bose', 'QC45', 'Standard', '', 'QC45', 330.00, 120.00, 300.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),

-- Beats Headphones variants
('beats_studio_pro', 'Beats Studio Pro', 'Beats', 'BSP-001', 'Standard', '', 'BSP-001', 350.00, 130.00, 320.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),
('beats_studio_3rd_gen', 'Beats Studio 3rd Gen', 'Beats', 'BS3-001', 'Standard', '', 'BS3-001', 200.00, 70.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),
('beats_studio_4th_gen', 'Beats Studio 4th Gen', 'Beats', 'BS4-001', 'Standard', '', 'BS4-001', 250.00, 90.00, 230.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),

-- JBL Headphones variants
('jbl_live_pro_3', 'JBL Live Pro 3', 'JBL', 'JBL-LP3', 'Standard', '', 'JBL-LP3', 180.00, 60.00, 160.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),

-- Bowers & Wilkins Headphones variants
('bowers_wilkins_px8', 'Bowers & Wilkins PX8', 'Bowers & Wilkins', 'BW-PX8', 'Standard', '', 'BW-PX8', 550.00, 200.00, 520.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),
('bowers_wilkins_px7_s2', 'Bowers & Wilkins PX7 S2', 'Bowers & Wilkins', 'BW-PX7S2', 'Standard', '', 'BW-PX7S2', 400.00, 150.00, 370.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),
('bowers_wilkins_px7_1st_gen', 'Bowers & Wilkins PX7 1st Gen', 'Bowers & Wilkins', 'BW-PX7', 'Standard', '', 'BW-PX7', 300.00, 110.00, 270.00, 
 (SELECT id FROM public.categories WHERE key = 'headphones'), NULL, 'headphones', true),

-- Smart Rings Series
-- Ōura Ring variants
('oura_ring_horizon_gen3', 'Ōura Ring Horizon (Gen 3)', 'Ōura', 'OR-H3', 'Standard', '', 'OR-H3', 300.00, 120.00, 280.00, 
 (SELECT id FROM public.categories WHERE key = 'smart_rings'), NULL, 'ring', true),

-- Samsung Galaxy Ring variants
('samsung_galaxy_ring', 'Samsung Galaxy Ring', 'Samsung', 'SM-R500', 'Standard', '', 'SM-R500', 250.00, 100.00, 230.00, 
 (SELECT id FROM public.categories WHERE key = 'smart_rings'), NULL, 'ring', true),

-- Ultrahuman Ring variants
('ultrahuman_ring_air', 'Ultrahuman Ring Air', 'Ultrahuman', 'UH-RA', 'Standard', '', 'UH-RA', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'smart_rings'), NULL, 'ring', true),

-- RingConn Smart Ring variants
('ringconn_smart_ring', 'RingConn Smart Ring', 'RingConn', 'RC-SR', 'Standard', '', 'RC-SR', 150.00, 60.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'smart_rings'), NULL, 'ring', true),

-- VR Headsets Series
-- Meta Quest Series variants
('meta_quest_pro', 'Meta Quest Pro', 'Meta', 'MQ-Pro', 'Standard', '', 'MQ-Pro', 1000.00, 400.00, 950.00, 
 (SELECT id FROM public.categories WHERE key = 'vr_headsets'), NULL, 'vr-headset', true),
('meta_quest_3s', 'Meta Quest 3S', 'Meta', 'MQ-3S', 'Standard', '', 'MQ-3S', 500.00, 200.00, 470.00, 
 (SELECT id FROM public.categories WHERE key = 'vr_headsets'), NULL, 'vr-headset', true),
('meta_quest_3', 'Meta Quest 3', 'Meta', 'MQ-3', 'Standard', '', 'MQ-3', 600.00, 240.00, 570.00, 
 (SELECT id FROM public.categories WHERE key = 'vr_headsets'), NULL, 'vr-headset', true),
('meta_quest_2', 'Meta Quest 2', 'Meta', 'MQ-2', 'Standard', '', 'MQ-2', 300.00, 120.00, 280.00, 
 (SELECT id FROM public.categories WHERE key = 'vr_headsets'), NULL, 'vr-headset', true),

-- Sony PlayStation VR Series variants
('sony_playstation_vr', 'PlayStation VR', 'Sony', 'CUH-ZVR1', 'Standard', '', 'CUH-ZVR1', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'vr_headsets'), NULL, 'vr-headset', true),
('sony_playstation_vr2', 'PlayStation VR2', 'Sony', 'CFI-ZVR2', 'Standard', '', 'CFI-ZVR2', 550.00, 220.00, 520.00, 
 (SELECT id FROM public.categories WHERE key = 'vr_headsets'), NULL, 'vr-headset', true),

-- Oculus Rift Series variants
('oculus_rift_cv1', 'Oculus Rift CV1', 'Oculus', 'OR-CV1', 'Standard', '', 'OR-CV1', 150.00, 60.00, 130.00, 
 (SELECT id FROM public.categories WHERE key = 'vr_headsets'), NULL, 'vr-headset', true),
('oculus_rift_s', 'Oculus Rift S', 'Oculus', 'OR-S', 'Standard', '', 'OR-S', 200.00, 80.00, 180.00, 
 (SELECT id FROM public.categories WHERE key = 'vr_headsets'), NULL, 'vr-headset', true);

-- Verify the data insertion
SELECT 
  'Data inserted successfully!' as status,
  COUNT(*) as total_devices,
  COUNT(DISTINCT device_name) as unique_device_names,
  COUNT(DISTINCT brand) as unique_brands,
  COUNT(DISTINCT storage) as unique_storage_options,
  MIN(sale_price) as min_price,
  MAX(sale_price) as max_price
FROM public.price_list 
WHERE is_active = true;

-- Show sample of inserted data
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
