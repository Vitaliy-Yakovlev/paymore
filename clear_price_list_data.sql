-- Script to completely clear price_list table data while keeping the structure
-- This will remove all existing data but preserve the table structure

-- Step 1: Clear all data from price_list table
TRUNCATE TABLE public.price_list RESTART IDENTITY CASCADE;

-- Step 2: Reset the sequence to start from 1
ALTER SEQUENCE public.price_list_id_seq RESTART WITH 1;

-- Step 3: Verify the table is empty
SELECT 
  'Table cleared successfully!' as status,
  COUNT(*) as remaining_records
FROM public.price_list;

-- Step 4: Show the current table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'price_list' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Step 5: Show indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename = 'price_list' 
  AND schemaname = 'public';

-- Step 6: Show constraints
SELECT 
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.price_list'::regclass;
