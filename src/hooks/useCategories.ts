import { useEffect, useState, useCallback } from 'react';
import {
  Category,
  Subcategory,
  Device,
  getCategories,
  getSubcategories,
  getDevicesByCategory,
  getDevicesBySubcategory,
  CategorialQuestions,
  getCategorialQuestions,
  CategorialQuestionsWithAnswers,
  getCategorialQuestionsWithAnswers,
} from '../services/categoryService';

export function useCategories() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

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

  // Load on initialization
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    loading,
    error,
    categories,
    subcategories,
    devices,
    loadAllData,
  };
}

// Hook for categorial questions
export function useCategorialQuestions(categoryId: number | null, deviceId: number | null = null) {
  const [categorialQuestions, setCategorialQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    if (!categoryId) {
      setCategorialQuestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const questions = await getCategorialQuestions(categoryId, deviceId);
      setCategorialQuestions(questions);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch questions');
      setCategorialQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId, deviceId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return { categorialQuestions, loading, error, refetch: fetchQuestions };
}

// Additional hooks for specific data operations
export const useDevices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    loading,
    error,
    getDevicesForCategory,
    getDevicesForSubcategory,
  };
};
