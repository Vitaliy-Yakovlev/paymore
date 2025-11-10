import { useEffect, useState } from 'react';
import {
  Device,
  DeviceVariant,
  DeviceCharacteristic,
  getDevicesByCategory,
  getDevicesBySubcategory,
  getVariantsByDevice,
  getCharacteristicsByDevice,
} from '../services/deviceService';
import { getDeviceVariantPrice } from '../services/priceListService';

export function useVariants(deviceId: number | null) {
  const [variants, setVariants] = useState<DeviceVariant[]>([]);
  const [characteristics /* setCharacteristics */] = useState<Record<number, DeviceCharacteristic[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deviceId) {
      return;
    }
    setLoading(true);

    getVariantsByDevice(deviceId).then(async variantList => {
      setVariants(variantList);
      // Fetch characteristics for each variant
      // const allChars: Record<number, DeviceCharacteristic[]> = {}
      // for (const v of variantList) {
      //   allChars[v.id] = await getCharacteristicsByDevice(v.id)
      // }
      // setCharacteristics(allChars)
      setLoading(false);
    });
  }, [deviceId]);

  return { variants, characteristics, loading };
}

export function useDeviceCharacteristics(deviceId: number | null) {
  const [characteristics, setCharacteristics] = useState<DeviceCharacteristic[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deviceId) return;
    setLoading(true);
    getCharacteristicsByDevice(deviceId).then(data => {
      setCharacteristics(data);
      setLoading(false);
    });
  }, [deviceId]);

  return { characteristics, loading };
}

export function useDevices(categoryId: number | null) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    getDevicesByCategory(categoryId).then(data => {
      setDevices(data);
      setLoading(false);
    });
  }, [categoryId]);

  return { devices, loading };
}

export function useDevicesBySubcategory(subcategoryId: number | null) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subcategoryId) return;
    setLoading(true);
    getDevicesBySubcategory(subcategoryId).then(data => {
      setDevices(data);
      setLoading(false);
    });
  }, [subcategoryId]);

  return { devices, loading };
}

export function useDeviceVariantPrice(categoryId: number | 0, deviceVariantId: number | 0, questionAnswersIds: number[]) {
  const [salePrice, setSalePrice] = useState<number | 0>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (categoryId === 0) return;
    if (deviceVariantId === 0) return;

    try {
      setLoading(true);
      getDeviceVariantPrice(categoryId, deviceVariantId, questionAnswersIds).then(data => {
        setSalePrice(data);
        setLoading(false);
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setLoading(false);
    }
  }, [categoryId, deviceVariantId, questionAnswersIds]);

  return { salePrice, loading, error };
}
