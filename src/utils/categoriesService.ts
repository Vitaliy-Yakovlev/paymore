// Service for working with categories from Supabase
import { supabase } from '../lib/supabase';

export interface Category {
  id: number;
  key: string;
  label: string;
  icon?: string;
  parent_id?: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: number;
  key: string;
  label: string;
  category_id: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Device {
  id: number;
  key: string;
  label: string;
  brand: string;
  model: string;
  gtin?: string;
  mpn?: string;
  buy_min?: number;
  resale_floor?: number;
  icon?: string;
  category_id?: number;
  subcategory_id?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
};

// Get subcategories for specific category (or all if categoryId is 0)
export const getSubcategories = async (categoryId: number = 0): Promise<Subcategory[]> => {
  try {
    let query = supabase
      .from('subcategories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (categoryId > 0) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching subcategories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSubcategories:', error);
    return [];
  }
};

// Get devices for category (or all if categoryId is 0)
export const getDevicesByCategory = async (categoryId: number = 0): Promise<Device[]> => {
  try {
    let query = supabase
      .from('devices')
      .select('*')
      .eq('is_active', true)
      .order('label');
    
    if (categoryId > 0) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching devices by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getDevicesByCategory:', error);
    return [];
  }
};

// Get devices for subcategory
export const getDevicesBySubcategory = async (subcategoryId: number): Promise<Device[]> => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('subcategory_id', subcategoryId)
      .eq('is_active', true)
      .order('label');

    if (error) {
      console.error('Error fetching devices by subcategory:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getDevicesBySubcategory:', error);
    return [];
  }
};

// Find device by key
export const getDeviceByKey = async (key: string): Promise<Device | null> => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('key', key)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching device by key:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getDeviceByKey:', error);
    return null;
  }
};

// Search devices by name (for autocomplete)
export const searchDevices = async (query: string, limit: number = 10): Promise<Device[]> => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .ilike('label', `%${query}%`)
      .eq('is_active', true)
      .limit(limit)
      .order('label');

    if (error) {
      console.error('Error searching devices:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in searchDevices:', error);
    return [];
  }
};

// Get category by key
export const getCategoryByKey = async (key: string): Promise<Category | null> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('key', key)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching category by key:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getCategoryByKey:', error);
    return null;
  }
};

// Get subcategory by key
export const getSubcategoryByKey = async (key: string): Promise<Subcategory | null> => {
  try {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('key', key)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching subcategory by key:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getSubcategoryByKey:', error);
    return null;
  }
};

// Build complete catalog structure (like original CATALOG_BASE)
export const buildCatalogStructure = async () => {
  try {
    const categories = await getCategories();
    const catalog: any = {};

    for (const category of categories) {
      const subcategories = await getSubcategories(category.id);
      
      if (subcategories.length > 0) {
        // Категорія має підкатегорії
        catalog[category.key] = {
          label: category.label,
          subcategories: {}
        };

        for (const subcategory of subcategories) {
          const devices = await getDevicesBySubcategory(subcategory.id);
          catalog[category.key].subcategories[subcategory.key] = {
            label: subcategory.label,
            items: devices.map(device => ({
              key: device.key,
              label: device.label,
              brand: device.brand,
              model: device.model,
              gtin: device.gtin || '',
              mpn: device.mpn || '',
              buy_min: device.buy_min || 0,
              resale_floor: device.resale_floor || 0,
              icon: device.icon || 'smartphone'
            }))
          };
        }
      } else {
        // Категорія без підкатегорій
        const devices = await getDevicesByCategory(category.id);
        catalog[category.key] = {
          label: category.label,
          items: devices.map(device => ({
            key: device.key,
            label: device.label,
            brand: device.brand,
            model: device.model,
            gtin: device.gtin || '',
            mpn: device.mpn || '',
            buy_min: device.buy_min || 0,
            resale_floor: device.resale_floor || 0,
            icon: device.icon || 'smartphone'
          }))
        };
      }
    }

    return catalog;
  } catch (error) {
    console.error('Error building catalog structure:', error);
    return {};
  }
};
