import { useState, useEffect, useCallback } from 'react';
import {
  getCategories,
  getSubcategories,
  getDevicesByCategory,
  getDevicesBySubcategory,
  getDeviceByKey,
  searchDevices,
  getCategoryByKey,
  getSubcategoryByKey,
  buildCatalogStructure,
  Category,
  Subcategory,
  Device,
} from '../utils/categoriesService';

export const useCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [catalog, setCatalog] = useState<any>({});

  // Load all data
  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [categoriesData, subcategoriesData, devicesData] = await Promise.all([
        getCategories(),
        getSubcategories(0), // Get all subcategories
        getDevicesByCategory(0), // Get all devices
      ]);

      setCategories(categoriesData);
      setSubcategories(subcategoriesData);
      setDevices(devicesData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load complete catalog structure
  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const catalogData = await buildCatalogStructure();
      setCatalog(catalogData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on initialization
  useEffect(() => {
    loadAllData();
    loadCatalog();
  }, [loadAllData, loadCatalog]);

  return {
    loading,
    error,
    categories,
    subcategories,
    devices,
    catalog,
    loadAllData,
    loadCatalog,
  };
};

export const useCategoryData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSubcategoriesForCategory = useCallback(async (categoryId: number): Promise<Subcategory[]> => {
    setLoading(true);
    setError(null);

    try {
      const subcategories = await getSubcategories(categoryId);
      return subcategories;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getDevicesForCategory = useCallback(async (categoryId: number): Promise<Device[]> => {
    setLoading(true);
    setError(null);

    try {
      const devices = await getDevicesByCategory(categoryId);
      return devices;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getDevicesForSubcategory = useCallback(async (subcategoryId: number): Promise<Device[]> => {
    setLoading(true);
    setError(null);

    try {
      const devices = await getDevicesBySubcategory(subcategoryId);
      return devices;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const findDeviceByKey = useCallback(async (key: string): Promise<Device | null> => {
    setLoading(true);
    setError(null);

    try {
      const device = await getDeviceByKey(key);
      return device;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchDevicesByName = useCallback(async (query: string, limit: number = 10): Promise<Device[]> => {
    setLoading(true);
    setError(null);

    try {
      const devices = await searchDevices(query, limit);
      return devices;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const findCategoryByKey = useCallback(async (key: string): Promise<Category | null> => {
    setLoading(true);
    setError(null);

    try {
      const category = await getCategoryByKey(key);
      return category;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const findSubcategoryByKey = useCallback(async (key: string): Promise<Subcategory | null> => {
    setLoading(true);
    setError(null);

    try {
      const subcategory = await getSubcategoryByKey(key);
      return subcategory;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getSubcategoriesForCategory,
    getDevicesForCategory,
    getDevicesForSubcategory,
    findDeviceByKey,
    searchDevicesByName,
    findCategoryByKey,
    findSubcategoryByKey,
  };
};
