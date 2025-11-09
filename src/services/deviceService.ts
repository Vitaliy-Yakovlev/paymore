// Service for working with categories from Supabase
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';
import { handleSupabaseError } from '../utils/handleSupabaseError';

export type Device = Database['public']['Tables']['devices']['Row'];
export type DeviceVariant = Database['public']['Tables']['device_variants']['Row'];
export type DeviceCharacteristic = Database['public']['Tables']['device_characteristics']['Row'];

export const getDevicesByCategory = async (categoryId: number = 0): Promise<Device[]> => {
  let query = supabase.from('devices').select('*').eq('is_active', true).order('label');

  if (categoryId > 0) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) return handleSupabaseError('getDevices', error);
  return data ?? [];
};

export const getDevicesBySubcategory = async (subcategoryId: number): Promise<Device[]> => {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('subcategory_id', subcategoryId)
    .eq('is_active', true)
    .order('label');

  if (error) return handleSupabaseError('getDevicesBySubcategory', error);
  return data ?? [];
};

export async function getVariantsByDevice(deviceId: number): Promise<DeviceVariant[]> {
  // First, let's check if there are any variants at all
  // const { data: allVariants, error: allVariantsError } = await supabase.from('device_variants').select('*').limit(5);

  const { data, error } = await supabase.from('device_variants').select('*').eq('device_id', deviceId);

  if (error) {
    console.error('getVariantsByDevice error:', error);
    return [];
  }

  return data ?? [];
}

export async function getCharacteristicsByDevice(deviceId: number): Promise<DeviceCharacteristic[]> {
  const { data, error } = await supabase.from('characteristics').select('*').eq('device_id', deviceId);

  if (error) {
    console.error('getCharacteristicsByVariant error:', error);
    return [];
  }

  return data ?? [];
}
