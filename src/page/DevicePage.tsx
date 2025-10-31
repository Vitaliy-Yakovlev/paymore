import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import ModelSelect from '../components/ModelSelect';
import DeviceDetail from '../components/DeviceDetail';
import StepContainer from '../components/StepContainer/StepContainer';

const MIN_PURCHASE = 100;
const MIN_RESALE = 200;

const DevicePage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const { brand, model, deviceName } = useParams<{ brand: string; model: string; deviceName?: string }>();
  const location = useLocation();
  const { categories, subcategories, devices, loading, error } = useCategories();

  const categoryKey = (location.state as any)?.categoryKey || (brand && model ? `${brand}_${model}`.toUpperCase() : '');
  const [subcategory, setSubcategory] = useState<string>('');
  const [q, setQ] = useState<string>('');

  useEffect(() => {
    if (deviceName) {
      setStep(2);
    } else if (brand && model) {
      setStep(1);
    }
  }, [deviceName, brand, model]);

  const selectedDevice: any = useMemo(() => {
    if (!deviceName || !devices.length) return null;
    return devices.find((d: any) => {
      let cleanKey = d.key;
      cleanKey = cleanKey.replace(/[-_]\d+\s*(GB|TB|MB)$/gi, '');
      cleanKey = cleanKey.replace(/[-_]\d+$/, '');

      const deviceSlug = cleanKey.toLowerCase().replace(/_/g, '-');

      return deviceSlug === deviceName.toLowerCase();
    });
  }, [deviceName, devices]);

  const catSpec: any = useMemo(() => {
    if (!categories.length) return {};

    const cat = categories.find(c => c.key === categoryKey);
    if (!cat) return {};

    return {
      label: cat.label,
      subcategories: subcategories
        .filter((sub: any) => sub.category_id === cat.id)
        .reduce((acc: any, sub: any) => {
          acc[sub.key] = {
            label: sub.label,
            items: devices.filter((d: any) => d.subcategory_id === sub.id),
          };
          return acc;
        }, {}),
      items: devices.filter((d: any) => d.category_id === cat.id && !d.subcategory_id),
    };
  }, [categories, subcategories, devices, categoryKey]);

  const subcatKeys = useMemo(() => Object.keys(catSpec.subcategories || {}), [catSpec]);

  useEffect(() => {
    setSubcategory(subcatKeys.length ? subcatKeys[0] : '');
  }, [subcatKeys]);

  const deviceList = useMemo(() => {
    if (catSpec.subcategories && subcategory && catSpec.subcategories[subcategory]) {
      return catSpec.subcategories[subcategory].items || [];
    }
    return catSpec.items || [];
  }, [catSpec, subcategory]);

  const deviceVariants: any[] = useMemo(() => {
    if (!deviceName || !deviceList.length) return [];

    return deviceList.filter((d: any) => {
      let cleanKey = d.key;
      cleanKey = cleanKey.replace(/[-_]\d+\s*(GB|TB|MB)$/gi, '');
      cleanKey = cleanKey.replace(/[-_]\d+$/, '');

      const deviceSlug = cleanKey.toLowerCase().replace(/_/g, '-');

      return deviceSlug === deviceName.toLowerCase();
    });
  }, [deviceName, deviceList]);

  const filteredDevices = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return deviceList;

    return deviceList.filter((d: any) =>
      [d.label, d.brand, d.model].filter(Boolean).join(' ').toLowerCase().includes(query),
    );
  }, [deviceList, q]);

  const uniqueDevices = useMemo(() => {
    const deviceMap = new Map<string, any>();

    filteredDevices.forEach((d: any) => {
      const modelKey = `${d.brand}_${d.model}`.replace(/\s*\d+\s*(GB|TB|MB)/gi, '').toUpperCase();

      if (!deviceMap.has(modelKey)) {
        deviceMap.set(modelKey, d);
      }
    });

    return Array.from(deviceMap.values());
  }, [filteredDevices]);

  const { items, lowMatches } = useMemo(() => {
    const items: any[] = [];
    const lowMatches: any[] = [];

    uniqueDevices.forEach((d: any) => {
      const meetsThreshold = Number(d.buy_min || 0) >= MIN_PURCHASE && Number(d.resale_floor || 0) >= MIN_RESALE;
      if (meetsThreshold) {
        items.push(d);
      } else {
        lowMatches.push(d);
      }
    });

    return { items, lowMatches };
  }, [uniqueDevices]);

  return (
    <>
      {loading && <div style={{ padding: '20px' }}>Loading...</div>}
      {error && <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>}
      {!loading && !error && (
        <StepContainer step={step}>
          {!loading && !error && catSpec.label && selectedDevice && (
            <DeviceDetail
              device={selectedDevice}
              deviceVariants={deviceVariants}
              catSpec={catSpec}
              category={categoryKey}
              step={step}
              setStep={setStep}
            />
          )}
          {!loading && !error && catSpec.label && !selectedDevice && (
            <ModelSelect
              catSpec={catSpec}
              subcatKeys={subcatKeys}
              subcategory={subcategory}
              setSubcategory={setSubcategory}
              q={q}
              setQ={setQ}
              items={items}
              lowMatches={lowMatches}
              category={categoryKey}
              brand={brand || ''}
              model={model || ''}
              categoryLabel={catSpec.label}
            />
          )}
        </StepContainer>
      )}
    </>
  );
};

export default DevicePage;
