-- SQL script to clean up price_list table by removing unused fields
-- This removes fields that are user inputs rather than table data

-- Drop indexes that reference columns we're about to remove
DROP INDEX IF EXISTS idx_price_list_condition;
DROP INDEX IF EXISTS idx_price_list_device_name;
DROP INDEX IF EXISTS idx_price_list_brand;

-- Remove unused columns (user inputs and global settings)
ALTER TABLE public.price_list 
DROP COLUMN IF EXISTS original_box,
DROP COLUMN IF EXISTS original_charger,
DROP COLUMN IF EXISTS unlocked,
DROP COLUMN IF EXISTS battery_low,
DROP COLUMN IF EXISTS battery_medium,
DROP COLUMN IF EXISTS battery_good,
DROP COLUMN IF EXISTS battery_perfect,
DROP COLUMN IF EXISTS condition,
DROP COLUMN IF EXISTS paymore_margin,
DROP COLUMN IF EXISTS shipping,
DROP COLUMN IF EXISTS no_box_deduction,
DROP COLUMN IF EXISTS no_charger_deduction;

-- Recreate indexes for remaining columns
CREATE INDEX IF NOT EXISTS idx_price_list_device_name ON public.price_list USING btree (device_name);
CREATE INDEX IF NOT EXISTS idx_price_list_brand ON public.price_list USING btree (brand);
CREATE INDEX IF NOT EXISTS idx_price_list_storage ON public.price_list USING btree (storage);

-- Add composite index for common queries
CREATE INDEX IF NOT EXISTS idx_price_list_device_lookup ON public.price_list USING btree (device_name, storage);

-- Verify the cleaned table structure
-- The table should now have these columns:
-- id, device_name, brand, storage, sale_price, created_at, updated_at
-- 
-- Global settings are now in offer_settings table:
-- paymore_margin, shipping_cost, no_box_deduction, no_charger_deduction
