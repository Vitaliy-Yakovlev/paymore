// Service for working with categories from Supabase
import { supabase } from '../lib/supabase';
import type { Category, Subcategory, Device } from '../types/category';

export type { Category, Subcategory, Device };

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase.from('categories').select('*').eq('is_active', true).order('sort_order');

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
    let query = supabase.from('subcategories').select('*').eq('is_active', true).order('sort_order');

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

// Get devices for category (or all if categoryId is 0) from unified price_list table
export const getDevicesByCategory = async (categoryId: number = 0): Promise<Device[]> => {
  try {
    let query = supabase.from('price_list').select('*').eq('is_active', true).order('device_name');

    if (categoryId > 0) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching devices by category:', error);
      return [];
    }

    // Transform price_list data to Device format
    return (data || []).map(item => ({
      id: item.id,
      key: item.device_key,
      label: item.device_name,
      brand: item.brand,
      model: item.model,
      gtin: item.gtin,
      mpn: item.mpn,
      buy_min: item.buy_min,
      resale_floor: item.resale_floor,
      icon: item.icon,
      device_image: item.device_image,
      category_id: item.category_id,
      subcategory_id: item.subcategory_id,
      is_active: item.is_active || true,
      created_at: item.created_at || '',
      updated_at: item.updated_at || '',
    }));
  } catch (error) {
    console.error('Error in getDevicesByCategory:', error);
    return [];
  }
};

// Get devices for subcategory from unified price_list table
export const getDevicesBySubcategory = async (subcategoryId: number): Promise<Device[]> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .select('*')
      .eq('subcategory_id', subcategoryId)
      .eq('is_active', true)
      .order('device_name');

    if (error) {
      console.error('Error fetching devices by subcategory:', error);
      return [];
    }

    // Transform price_list data to Device format
    return (data || []).map(item => ({
      id: item.id,
      key: item.device_key,
      label: item.device_name,
      brand: item.brand,
      model: item.model,
      gtin: item.gtin,
      mpn: item.mpn,
      buy_min: item.buy_min,
      resale_floor: item.resale_floor,
      icon: item.icon,
      device_image: item.device_image,
      category_id: item.category_id,
      subcategory_id: item.subcategory_id,
      is_active: item.is_active || true,
      created_at: item.created_at || '',
      updated_at: item.updated_at || '',
    }));
  } catch (error) {
    console.error('Error in getDevicesBySubcategory:', error);
    return [];
  }
};

// Find device by key from unified price_list table
export const getDeviceByKey = async (key: string): Promise<Device | null> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .select('*')
      .eq('device_key', key)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching device by key:', error);
      return null;
    }

    // Transform price_list data to Device format
    return {
      id: data.id,
      key: data.device_key,
      label: data.device_name,
      brand: data.brand,
      model: data.model,
      gtin: data.gtin,
      mpn: data.mpn,
      buy_min: data.buy_min,
      resale_floor: data.resale_floor,
      icon: data.icon,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id,
      is_active: data.is_active || true,
      created_at: data.created_at || '',
      updated_at: data.updated_at || '',
    };
  } catch (error) {
    console.error('Error in getDeviceByKey:', error);
    return null;
  }
};

// Search devices by name (for autocomplete) from unified price_list table
export const searchDevices = async (query: string, limit: number = 10): Promise<Device[]> => {
  try {
    const { data, error } = await supabase
      .from('price_list')
      .select('*')
      .ilike('device_name', `%${query}%`)
      .eq('is_active', true)
      .limit(limit)
      .order('device_name');

    if (error) {
      console.error('Error searching devices:', error);
      return [];
    }

    // Transform price_list data to Device format
    return (data || []).map(item => ({
      id: item.id,
      key: item.device_key,
      label: item.device_name,
      brand: item.brand,
      model: item.model,
      gtin: item.gtin,
      mpn: item.mpn,
      buy_min: item.buy_min,
      resale_floor: item.resale_floor,
      icon: item.icon,
      device_image: item.device_image,
      category_id: item.category_id,
      subcategory_id: item.subcategory_id,
      is_active: item.is_active || true,
      created_at: item.created_at || '',
      updated_at: item.updated_at || '',
    }));
  } catch (error) {
    console.error('Error in searchDevices:', error);
    return [];
  }
};

// Get category by key
export const getCategoryByKey = async (key: string): Promise<Category | null> => {
  try {
    const { data, error } = await supabase.from('categories').select('*').eq('key', key).eq('is_active', true).single();

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
          subcategories: {},
        };

        for (const subcategory of subcategories) {
          const devices = await getDevicesBySubcategory(subcategory.id);
          // Group devices by device_name to handle multiple storage options
          const groupedDevices = devices.reduce((acc: any, device: any) => {
            const key = device.label; // device_name
            if (!acc[key]) {
              acc[key] = {
                key: device.key,
                label: device.label,
                brand: device.brand,
                model: device.model,
                gtin: device.gtin || '',
                mpn: device.mpn || '',
                buy_min: device.buy_min || 0,
                resale_floor: device.resale_floor || 0,
                icon: device.icon || 'smartphone',
                storage: device.storage || '128GB', // Add storage info
                storageOptions: [], // Array to store all storage options
              };
            }
            // Add storage option to the array
            if (!acc[key].storageOptions.includes(device.storage)) {
              acc[key].storageOptions.push(device.storage);
            }
            return acc;
          }, {});

          catalog[category.key].subcategories[subcategory.key] = {
            label: subcategory.label,
            items: Object.values(groupedDevices),
          };
        }
      } else {
        // Категорія без підкатегорій
        const devices = await getDevicesByCategory(category.id);
        // Group devices by device_name to handle multiple storage options
        const groupedDevices = devices.reduce((acc: any, device: any) => {
          const key = device.label; // device_name
          if (!acc[key]) {
            acc[key] = {
              key: device.key,
              label: device.label,
              brand: device.brand,
              model: device.model,
              gtin: device.gtin || '',
              mpn: device.mpn || '',
              buy_min: device.buy_min || 0,
              resale_floor: device.resale_floor || 0,
              icon: device.icon || 'smartphone',
              device_image: device.device_image || '',
              storage: device.storage || '128GB', // Add storage info
              storageOptions: [], // Array to store all storage options
            };
          }
          // Add storage option to the array
          if (!acc[key].storageOptions.includes(device.storage)) {
            acc[key].storageOptions.push(device.storage);
          }
          return acc;
        }, {});

        catalog[category.key] = {
          label: category.label,
          items: Object.values(groupedDevices),
        };
      }
    }

    return catalog;
  } catch (error) {
    console.error('Error building catalog structure:', error);
    return {};
  }
};
