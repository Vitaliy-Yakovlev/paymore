-- Add device image column to price_list table
-- This script adds a column to store device image URLs

-- Add the image column
ALTER TABLE public.price_list 
ADD COLUMN device_image VARCHAR(500);

-- Add comment to describe the column
COMMENT ON COLUMN public.price_list.device_image IS 'URL or path to device image';

-- Create index for better performance when filtering by images
CREATE INDEX IF NOT EXISTS idx_price_list_device_image 
ON public.price_list (device_image) 
WHERE device_image IS NOT NULL;

-- Verify the column was added
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'price_list' 
  AND table_schema = 'public'
  AND column_name = 'device_image';
