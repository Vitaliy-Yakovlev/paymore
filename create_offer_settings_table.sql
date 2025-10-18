-- Create global settings table for offer calculator parameters
-- These are global values that apply to all devices

CREATE TABLE public.offer_settings (
  id serial PRIMARY KEY,
  setting_key varchar(100) NOT NULL UNIQUE,
  setting_value numeric(10,2) NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Insert global settings
INSERT INTO public.offer_settings (setting_key, setting_value, description) VALUES 
('paymore_margin', 0.48, 'Total margin percentage (includes our margin + SellIt9 + PayMore)'),
('shipping_cost', 15.00, 'Flat shipping cost in dollars'),
('no_box_deduction', 25.00, 'Flat deduction when original box is missing'),
('no_charger_deduction', 15.00, 'Flat deduction when original charger is missing');

-- Create trigger for updated_at
CREATE TRIGGER update_offer_settings_updated_at 
BEFORE UPDATE ON offer_settings 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Index for fast lookups
CREATE INDEX idx_offer_settings_key ON offer_settings(setting_key);
