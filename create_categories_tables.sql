-- SQL script for creating categories tables in Supabase
-- This table will store all device categories

CREATE TABLE public.categories (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  parent_id INTEGER REFERENCES public.categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for subcategories
CREATE TABLE public.subcategories (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES public.categories(id) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for devices
CREATE TABLE public.devices (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  gtin VARCHAR(50),
  mpn VARCHAR(100),
  buy_min DECIMAL(10, 2),
  resale_floor DECIMAL(10, 2),
  icon VARCHAR(50),
  category_id INTEGER REFERENCES public.categories(id),
  subcategory_id INTEGER REFERENCES public.subcategories(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX idx_categories_key ON public.categories(key);
CREATE INDEX idx_categories_active ON public.categories(is_active);

CREATE INDEX idx_subcategories_category_id ON public.subcategories(category_id);
CREATE INDEX idx_subcategories_key ON public.subcategories(key);
CREATE INDEX idx_subcategories_active ON public.subcategories(is_active);

CREATE INDEX idx_devices_category_id ON public.devices(category_id);
CREATE INDEX idx_devices_subcategory_id ON public.devices(subcategory_id);
CREATE INDEX idx_devices_brand ON public.devices(brand);
CREATE INDEX idx_devices_key ON public.devices(key);
CREATE INDEX idx_devices_active ON public.devices(is_active);

-- Row Level Security (RLS) policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read categories
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view subcategories" ON public.subcategories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view devices" ON public.devices
  FOR SELECT USING (true);

-- Allow only administrators to edit (optional)
-- CREATE POLICY "Admins can manage categories" ON public.categories
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Table comments
COMMENT ON TABLE public.categories IS 'Device categories (e.g.: Apple iPhones, Gaming Consoles)';
COMMENT ON TABLE public.subcategories IS 'Subcategories (e.g.: MacBook Air, MacBook Pro)';
COMMENT ON TABLE public.devices IS 'Specific devices with prices';

COMMENT ON COLUMN public.categories.key IS 'Unique category key (e.g.: apple_iphones)';
COMMENT ON COLUMN public.categories.label IS 'Category display name';
COMMENT ON COLUMN public.categories.icon IS 'Icon name from lucide-react';
COMMENT ON COLUMN public.categories.parent_id IS 'Parent category ID (for nested categories)';

COMMENT ON COLUMN public.subcategories.key IS 'Unique subcategory key';
COMMENT ON COLUMN public.subcategories.label IS 'Subcategory display name';

COMMENT ON COLUMN public.devices.key IS 'Unique device key';
COMMENT ON COLUMN public.devices.label IS 'Device display name';
COMMENT ON COLUMN public.devices.buy_min IS 'Minimum purchase price';
COMMENT ON COLUMN public.devices.resale_floor IS 'Minimum resale price';
