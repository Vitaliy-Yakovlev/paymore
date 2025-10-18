-- Sample data for the cleaned price_list table
-- This shows the structure and example entries for iPhone pricing
-- Each device has only ONE record with the Flawless (base) price
-- Global settings (margin, shipping, deductions) are in offer_settings table

INSERT INTO public.price_list (
  device_name, 
  brand, 
  storage, 
  sale_price
) VALUES 
-- iPhone 15 Pro Max (one record per storage variant)
('iPhone 15 Pro Max', 'Apple', '256GB', 1199.00),
('iPhone 15 Pro Max', 'Apple', '512GB', 1399.00),
('iPhone 15 Pro Max', 'Apple', '1TB', 1599.00),

-- iPhone 15 Pro (one record per storage variant)
('iPhone 15 Pro', 'Apple', '128GB', 999.00),
('iPhone 15 Pro', 'Apple', '256GB', 1099.00),
('iPhone 15 Pro', 'Apple', '512GB', 1299.00),
('iPhone 15 Pro', 'Apple', '1TB', 1499.00),

-- iPhone 15 (one record per storage variant)
('iPhone 15', 'Apple', '128GB', 799.00),
('iPhone 15', 'Apple', '256GB', 899.00),
('iPhone 15', 'Apple', '512GB', 1099.00),

-- iPhone 14 Pro Max (one record per storage variant)
('iPhone 14 Pro Max', 'Apple', '128GB', 1099.00),
('iPhone 14 Pro Max', 'Apple', '256GB', 1199.00),
('iPhone 14 Pro Max', 'Apple', '512GB', 1399.00),
('iPhone 14 Pro Max', 'Apple', '1TB', 1599.00),

-- iPhone 14 Pro (one record per storage variant)
('iPhone 14 Pro', 'Apple', '128GB', 999.00),
('iPhone 14 Pro', 'Apple', '256GB', 1099.00),
('iPhone 14 Pro', 'Apple', '512GB', 1299.00),
('iPhone 14 Pro', 'Apple', '1TB', 1499.00),

-- iPhone 14 (one record per storage variant)
('iPhone 14', 'Apple', '128GB', 699.00),
('iPhone 14', 'Apple', '256GB', 799.00),
('iPhone 14', 'Apple', '512GB', 999.00);

-- Note: The paymore_margin of 0.48 (48%) matches the document specification
-- Shipping, no_box_deduction, and no_charger_deduction are flat dollar amounts
-- as specified in the offer calculator document
