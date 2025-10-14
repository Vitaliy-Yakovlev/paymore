// Functions for working with price_list table
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

type PriceListItem = Database['public']['Tables']['price_list']['Row'];
type PriceListInsert = Database['public']['Tables']['price_list']['Insert'];
type PriceListUpdate = Database['public']['Tables']['price_list']['Update'];

// Interface for price search parameters
export interface PriceSearchParams {
  device_name?: string;
  brand?: string;
  storage?: string;
  condition?: 'Excellent' | 'Good' | 'Fair';
  original_box?: boolean;
  original_charger?: boolean;
  unlocked?: boolean;
}

// Interface for search result with calculated price
export interface PriceResult extends PriceListItem {
  calculated_price?: number;
  deductions?: {
    no_box: number;
    no_charger: number;
  };
  final_price?: number;
}

// Search prices by parameters
export const searchPrices = async (params: PriceSearchParams): Promise<PriceResult[]> => {
  try {
    let query = supabase.from('price_list').select('*');

    // Add filters
    if (params.device_name) {
      query = query.ilike('device_name', `%${params.device_name}%`);
    }
    if (params.brand) {
      query = query.ilike('brand', `%${params.brand}%`);
    }
    if (params.storage) {
      query = query.ilike('storage', `%${params.storage}%`);
    }
    if (params.condition) {
      query = query.eq('condition', params.condition);
    }
    if (params.original_box !== undefined) {
      query = query.eq('original_box', params.original_box);
    }
    if (params.original_charger !== undefined) {
      query = query.eq('original_charger', params.original_charger);
    }
    if (params.unlocked !== undefined) {
      query = query.eq('unlocked', params.unlocked);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching prices:', error);
      return [];
    }

    // Calculate final price for each result
    return data.map(item => calculateFinalPrice(item, params));
  } catch (error) {
    console.error('Error in searchPrices:', error);
    return [];
  }
};

// Calculate final price with deductions
export const calculateFinalPrice = (item: PriceListItem, params: PriceSearchParams): PriceResult => {
  let finalPrice = item.sale_price || 0;
  const deductions = {
    no_box: 0,
    no_charger: 0
  };

  // Deduction for missing box
  if (params.original_box === false && item.no_box_deduction) {
    deductions.no_box = item.no_box_deduction;
    finalPrice -= item.no_box_deduction;
  }

  // Deduction for missing charger
  if (params.original_charger === false && item.no_charger_deduction) {
    deductions.no_charger = item.no_charger_deduction;
    finalPrice -= item.no_charger_deduction;
  }

  return {
    ...item,
    calculated_price: item.sale_price || 0,
    deductions,
    final_price: Math.max(0, finalPrice) // Cannot be negative
  };
};

// Get all brands
export const getAllBrands = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .select('brand')
      .order('brand');

    if (error) {
      console.error('Error fetching brands:', error);
      return [];
    }

    // Remove duplicates
    const uniqueBrands = Array.from(new Set(data.map(item => item.brand)));
    return uniqueBrands;
  } catch (error) {
    console.error('Error in getAllBrands:', error);
    return [];
  }
};

// Get all devices by brand
export const getDevicesByBrand = async (brand: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .select('device_name')
      .eq('brand', brand)
      .order('device_name');

    if (error) {
      console.error('Error fetching devices by brand:', error);
      return [];
    }

    // Remove duplicates
    const uniqueDevices = Array.from(new Set(data.map(item => item.device_name)));
    return uniqueDevices;
  } catch (error) {
    console.error('Error in getDevicesByBrand:', error);
    return [];
  }
};

// Get storage options for device
export const getStorageOptions = async (deviceName: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .select('storage')
      .eq('device_name', deviceName)
      .order('storage');

    if (error) {
      console.error('Error fetching storage options:', error);
      return [];
    }

    // Видаляємо дублікати
    const uniqueStorage = Array.from(new Set(data.map(item => item.storage)));
    return uniqueStorage;
  } catch (error) {
    console.error('Error in getStorageOptions:', error);
    return [];
  }
};

// Get price for specific device
export const getPriceForDevice = async (
  deviceName: string,
  storage: string,
  condition: 'Excellent' | 'Good' | 'Fair',
  originalBox: boolean = true,
  originalCharger: boolean = true
): Promise<PriceResult | null> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .select('*')
      .eq('device_name', deviceName)
      .eq('storage', storage)
      .eq('condition', condition)
      .single();

    if (error) {
      console.error('Error fetching price for device:', error);
      return null;
    }

    return calculateFinalPrice(data, {
      original_box: originalBox,
      original_charger: originalCharger
    });
  } catch (error) {
    console.error('Error in getPriceForDevice:', error);
    return null;
  }
};

// Add new price list item (for administrators)
export const addPriceListItem = async (item: PriceListInsert): Promise<PriceListItem | null> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .insert(item)
      .select()
      .single();

    if (error) {
      console.error('Error adding price list item:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in addPriceListItem:', error);
    return null;
  }
};

// Update price list item (for administrators)
export const updatePriceListItem = async (
  id: number,
  updates: PriceListUpdate
): Promise<PriceListItem | null> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating price list item:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in updatePriceListItem:', error);
    return null;
  }
};

// Delete price list item (for administrators)
export const deletePriceListItem = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('price_list')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting price list item:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePriceListItem:', error);
    return false;
  }
};

// Search by device name (for autocomplete)
export const searchDevices = async (query: string, limit: number = 10): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .select('device_name')
      .ilike('device_name', `%${query}%`)
      .limit(limit)
      .order('device_name');

    if (error) {
      console.error('Error searching devices:', error);
      return [];
    }

    // Remove duplicates
    const uniqueDevices = Array.from(new Set(data.map(item => item.device_name)));
    return uniqueDevices;
  } catch (error) {
    console.error('Error in searchDevices:', error);
    return [];
  }
};
