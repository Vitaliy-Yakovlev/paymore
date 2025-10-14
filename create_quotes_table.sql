-- SQL script for creating quotes table in Supabase
-- This table will store all user quotes

CREATE TABLE public.quotes (
  id SERIAL PRIMARY KEY,
  
  -- Main quote information
  store VARCHAR(255),
  mode VARCHAR(50),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  
  -- Device information
  device_name VARCHAR(255),
  brand VARCHAR(100),
  model VARCHAR(100),
  model_code VARCHAR(100),
  
  -- Device details
  condition VARCHAR(50),
  battery_percentage INTEGER,
  has_original_box BOOLEAN DEFAULT FALSE,
  has_original_charger BOOLEAN DEFAULT FALSE,
  
  -- Identifiers
  imei VARCHAR(50),
  serial_number VARCHAR(100),
  
  -- Price and eligibility
  quote_amount DECIMAL(10, 2),
  is_eligible BOOLEAN DEFAULT FALSE,
  buy_min_threshold DECIMAL(10, 2),
  resale_floor_threshold DECIMAL(10, 2),
  
  -- Customer information
  customer_first_name VARCHAR(100),
  customer_last_name VARCHAR(100),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  is_business_customer BOOLEAN DEFAULT FALSE,
  business_quantity INTEGER DEFAULT 1,
  
  -- Barcode lookup information
  barcode VARCHAR(50),
  barcode_title VARCHAR(255),
  
  -- Rewards
  rewards_code VARCHAR(50),
  
  -- Metadata
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending'
);

-- Indexes for better performance
CREATE INDEX idx_quotes_user_id ON public.quotes(user_id);
CREATE INDEX idx_quotes_device_name ON public.quotes(device_name);
CREATE INDEX idx_quotes_brand ON public.quotes(brand);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_quotes_created_at ON public.quotes(created_at);
CREATE INDEX idx_quotes_customer_email ON public.quotes(customer_email);

-- Row Level Security (RLS) policies
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow users to read only their own quotes
CREATE POLICY "Users can view own quotes" ON public.quotes
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create quotes
CREATE POLICY "Users can create quotes" ON public.quotes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own quotes
CREATE POLICY "Users can update own quotes" ON public.quotes
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete only their own quotes
CREATE POLICY "Users can delete own quotes" ON public.quotes
  FOR DELETE USING (auth.uid() = user_id);

-- Allow anonymous users to create quotes (for guests)
CREATE POLICY "Anonymous users can create quotes" ON public.quotes
  FOR INSERT WITH CHECK (true);

-- Allow anonymous users to read quotes (optional)
-- CREATE POLICY "Anonymous users can view quotes" ON public.quotes
--   FOR SELECT USING (true);

-- Table and column comments
COMMENT ON TABLE public.quotes IS 'Table for storing user quotes';
COMMENT ON COLUMN public.quotes.store IS 'Store name';
COMMENT ON COLUMN public.quotes.mode IS 'Mode: sell or buy';
COMMENT ON COLUMN public.quotes.device_name IS 'Device name';
COMMENT ON COLUMN public.quotes.quote_amount IS 'Quote amount in CAD';
COMMENT ON COLUMN public.quotes.is_eligible IS 'Whether device meets minimum requirements';
COMMENT ON COLUMN public.quotes.status IS 'Quote status: pending, approved, rejected, completed';
