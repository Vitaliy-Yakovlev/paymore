import { useState, useCallback } from 'react';
import { 
  searchPrices, 
  getPriceForDevice, 
  getAllBrands, 
  getDevicesByBrand, 
  getStorageOptions,
  searchDevices,
  PriceSearchParams,
  PriceResult
} from '../utils/priceListService';

export const usePriceList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDevicePrices = useCallback(async (params: PriceSearchParams): Promise<PriceResult[]> => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchPrices(params);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getDevicePrice = useCallback(async (
    deviceName: string,
    storage: string,
    condition: 'Excellent' | 'Good' | 'Fair',
    originalBox: boolean = true,
    originalCharger: boolean = true,
    unlocked: boolean = true,
    batteryPercentage?: number
  ): Promise<PriceResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPriceForDevice(
        deviceName,
        storage,
        condition,
        originalBox,
        originalCharger,
        unlocked,
        batteryPercentage
      );
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getBrands = useCallback(async (): Promise<string[]> => {
    setLoading(true);
    setError(null);

    try {
      const brands = await getAllBrands();
      return brands;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getDevices = useCallback(async (brand: string): Promise<string[]> => {
    setLoading(true);
    setError(null);

    try {
      const devices = await getDevicesByBrand(brand);
      return devices;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getStorageVariants = useCallback(async (deviceName: string): Promise<string[]> => {
    setLoading(true);
    setError(null);

    try {
      const storageOptions = await getStorageOptions(deviceName);
      return storageOptions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchDeviceNames = useCallback(async (query: string, limit: number = 10): Promise<string[]> => {
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

  return {
    loading,
    error,
    searchDevicePrices,
    getDevicePrice,
    getBrands,
    getDevices,
    getStorageVariants,
    searchDeviceNames
  };
};
