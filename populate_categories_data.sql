-- SQL script for populating categories, subcategories and devices tables
-- Execute after creating the tables

-- Insert main categories
INSERT INTO public.categories (key, label, icon, sort_order) VALUES
('apple_iphones', 'Apple iPhones', 'smartphone', 1),
('android_smartphones', 'Android Smartphones', 'smartphone', 2),
('apple_macbooks', 'Apple MacBooks', 'laptop', 3),
('laptops', 'Laptops', 'laptop', 4),
('gaming_consoles', 'Gaming Consoles', 'gamepad2', 5),
('vr_ar_streaming', 'VR/AR & Streaming', 'scanface', 6),
('headphones', 'Headphones', 'headphones', 7),
('dj_audio', 'DJ & Audio', 'music', 8),
('desktop_aio', 'Desktop All‑in‑Ones', 'monitor', 9),
('pc_cards', 'PC Cards', 'cpu', 10),
('pc_gear_accessories', 'PC Gear & Accessories', 'keyboard', 11),
('art_monitors_screens', 'Art Monitors & Screens', 'monitor', 12),
('digital_cameras_lenses', 'Digital Cameras & Lenses', 'camera', 13),
('speakers_audio', 'Speakers & Audio', 'speaker', 14);

-- Insert subcategories for Apple MacBooks
INSERT INTO public.subcategories (key, label, category_id, sort_order) VALUES
('macbook_air', 'MacBook Air', (SELECT id FROM public.categories WHERE key = 'apple_macbooks'), 1),
('macbook_pro', 'MacBook Pro', (SELECT id FROM public.categories WHERE key = 'apple_macbooks'), 2);

-- Insert devices
INSERT INTO public.devices (key, label, brand, model, gtin, mpn, buy_min, resale_floor, icon, category_id) VALUES
-- Apple iPhones
('iphone_15_pro_128', 'iPhone 15 Pro 128GB', 'Apple', 'A3101', '', 'A3101', 450, 800, 'smartphone', (SELECT id FROM public.categories WHERE key = 'apple_iphones')),

-- Android Smartphones
('s24_ultra_256', 'Samsung S24 Ultra 256GB', 'Samsung', 'SM-S928W', '', 'SM-S928W', 500, 900, 'smartphone', (SELECT id FROM public.categories WHERE key = 'android_smartphones')),

-- MacBook Air
('mba_m2_13_256', 'MacBook Air 13" M2 256GB (2022)', 'Apple', 'A2681', '', 'A2681', 700, 1100, 'laptop', (SELECT id FROM public.categories WHERE key = 'apple_macbooks')),

-- MacBook Pro
('mbp_14_2021', 'MacBook Pro 14" (2021)', 'Apple', 'A2442', '', 'A2442', 900, 1500, 'laptop', (SELECT id FROM public.categories WHERE key = 'apple_macbooks')),

-- Laptops
('dell_xps_13_9310', 'Dell XPS 13 (9310)', 'Dell', '9310', '', '9310', 350, 650, 'laptop', (SELECT id FROM public.categories WHERE key = 'laptops')),

-- Gaming Consoles
('ps5_disc', 'PlayStation 5 (Disc)', 'Sony', 'CFI-1215A', '', 'CFI-1215A', 250, 420, 'gamepad2', (SELECT id FROM public.categories WHERE key = 'gaming_consoles')),
('xbox_series_x', 'Xbox Series X', 'Microsoft', 'RRT-00001', '', 'RRT-00001', 220, 380, 'gamepad2', (SELECT id FROM public.categories WHERE key = 'gaming_consoles')),
('switch_oled', 'Nintendo Switch OLED', 'Nintendo', 'HEG-001', '', 'HEGSKAAAA', 180, 320, 'gamepad2', (SELECT id FROM public.categories WHERE key = 'gaming_consoles')),
('steam_deck_256', 'Steam Deck 256GB', 'Valve', 'Steam Deck', '', 'V004287-30', 220, 380, 'gamepad2', (SELECT id FROM public.categories WHERE key = 'gaming_consoles')),

-- VR/AR & Streaming
('meta_quest_2_128', 'Meta Quest 2 128GB', 'Meta', 'Quest 2', '', '899-00183-02', 160, 300, 'scanface', (SELECT id FROM public.categories WHERE key = 'vr_ar_streaming')),
('vision_pro_256', 'Apple Vision Pro 256GB', 'Apple', 'A2781', '', 'A2781', 1800, 3000, 'scanface', (SELECT id FROM public.categories WHERE key = 'vr_ar_streaming')),
('roku_stick_4k', 'Roku Streaming Stick 4K', 'Roku', '3820R', '', '3820R', 100, 210, 'scanface', (SELECT id FROM public.categories WHERE key = 'vr_ar_streaming')),

-- Headphones
('sony_xm5', 'Sony WH-1000XM5', 'Sony', 'WH-1000XM5', '', 'WH1000XM5/B', 120, 260, 'headphones', (SELECT id FROM public.categories WHERE key = 'headphones')),
('airpods_pro_2', 'AirPods Pro (2nd Gen)', 'Apple', 'A2698', '', 'A2698', 110, 240, 'headphones', (SELECT id FROM public.categories WHERE key = 'headphones')),
('logi_g_pro_x', 'Logitech G Pro X Gaming Headset', 'Logitech', 'G Pro X', '', '981-000818', 110, 230, 'headphones', (SELECT id FROM public.categories WHERE key = 'headphones')),

-- DJ & Audio
('pioneer_ddj_400', 'Pioneer DJ DDJ-400 Controller', 'Pioneer DJ', 'DDJ-400', '', 'DDJ-400', 120, 260, 'music', (SELECT id FROM public.categories WHERE key = 'dj_audio')),
('scarlett_2i2_3rd', 'Focusrite Scarlett 2i2 3rd Gen', 'Focusrite', '2i2 3rd', '', 'SCARLETT-2I2-3G', 130, 240, 'music', (SELECT id FROM public.categories WHERE key = 'dj_audio')),
('shure_sm58', 'Shure SM58 Dynamic Vocal Microphone', 'Shure', 'SM58', '', 'SM58S', 110, 210, 'music', (SELECT id FROM public.categories WHERE key = 'dj_audio')),

-- Desktop All‑in‑Ones
('hp_pavilion_27_aio', 'HP Pavilion 27 All‑in‑One', 'HP', 'Pavilion 27 AIO', '', '27-AIO-2023', 400, 750, 'monitor', (SELECT id FROM public.categories WHERE key = 'desktop_aio')),
('dell_inspiron_24_aio', 'Dell Inspiron 24 AIO', 'Dell', 'Inspiron 24', '', '24-5415', 250, 430, 'monitor', (SELECT id FROM public.categories WHERE key = 'desktop_aio')),

-- PC Cards
('rtx_3060_12gb', 'NVIDIA GeForce RTX 3060 12GB', 'NVIDIA', 'RTX 3060 12GB', '', 'RTX3060-12G', 220, 380, 'cpu', (SELECT id FROM public.categories WHERE key = 'pc_cards')),
('elgato_hd60x', 'Elgato HD60 X Capture Card', 'Elgato', 'HD60 X', '', '10GBE9901', 120, 230, 'cpu', (SELECT id FROM public.categories WHERE key = 'pc_cards')),
('creative_ae5', 'Creative Sound BlasterX AE-5', 'Creative', 'AE-5', '', '70SB174000000', 110, 220, 'cpu', (SELECT id FROM public.categories WHERE key = 'pc_cards')),
('intel_x520_da2', 'Intel X520-DA2 10GbE NIC', 'Intel', 'X520-DA2', '', 'E10G42BTDA', 100, 220, 'cpu', (SELECT id FROM public.categories WHERE key = 'pc_cards')),

-- PC Gear & Accessories
('logi_mx_keys', 'Logitech MX Keys', 'Logitech', 'MX Keys', '', '920-009295', 110, 220, 'keyboard', (SELECT id FROM public.categories WHERE key = 'pc_gear_accessories')),
('logi_mx_master_3', 'Logitech MX Master 3', 'Logitech', 'MX Master 3', '', '910-005647', 100, 210, 'keyboard', (SELECT id FROM public.categories WHERE key = 'pc_gear_accessories')),
('logi_c920', 'Logitech C920 HD Pro Webcam', 'Logitech', 'C920', '', '960-000764', 100, 205, 'keyboard', (SELECT id FROM public.categories WHERE key = 'pc_gear_accessories')),
('tplink_ax55', 'TP‑Link Archer AX55 AX3000 Router', 'TP‑Link', 'AX55', '', 'AX55', 100, 210, 'keyboard', (SELECT id FROM public.categories WHERE key = 'pc_gear_accessories')),
('anker_usb_c_dock', 'Anker USB‑C Docking Station 11‑in‑1', 'Anker', 'A8381', '', 'A8381', 110, 220, 'keyboard', (SELECT id FROM public.categories WHERE key = 'pc_gear_accessories')),

-- Art Monitors & Screens
('benq_pd2700u', 'BenQ PD2700U 27" 4K Designer Monitor', 'BenQ', 'PD2700U', '', 'PD2700U', 200, 360, 'monitor', (SELECT id FROM public.categories WHERE key = 'art_monitors_screens')),
('lg_27un850', 'LG 27UN850 27" 4K IPS', 'LG', '27UN850', '', '27UN850-W', 160, 300, 'monitor', (SELECT id FROM public.categories WHERE key = 'art_monitors_screens')),
('wacom_cintiq_16', 'Wacom Cintiq 16 Pen Display', 'Wacom', 'DTK1660K0A', '', 'DTK-1660', 220, 400, 'monitor', (SELECT id FROM public.categories WHERE key = 'art_monitors_screens')),

-- Digital Cameras & Lenses
('sony_a7iii_body', 'Sony A7 III (body)', 'Sony', 'ILCE-7M3', '', 'ILCE7M3/B', 800, 1300, 'camera', (SELECT id FROM public.categories WHERE key = 'digital_cameras_lenses')),

-- Speakers & Audio
('jbl_flip6', 'JBL Flip 6 Portable Speaker', 'JBL', 'Flip 6', '', 'JBLFLIP6BLK', 110, 210, 'speaker', (SELECT id FROM public.categories WHERE key = 'speakers_audio'));

-- Update subcategories for MacBook devices
UPDATE public.devices SET subcategory_id = (SELECT id FROM public.subcategories WHERE key = 'macbook_air') WHERE key = 'mba_m2_13_256';
UPDATE public.devices SET subcategory_id = (SELECT id FROM public.subcategories WHERE key = 'macbook_pro') WHERE key = 'mbp_14_2021';
