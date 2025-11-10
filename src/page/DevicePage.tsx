import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { useCategories, useCategorialQuestions } from '../hooks/useCategories';
import { useSubcategories } from '../hooks/useSubcategories';
import { useDevices, useDevicesBySubcategory, useVariants } from '../hooks/useDevices';
import ModelSelect from '../components/ModelSelect';
import DeviceDetail from '../components/DeviceDetail';
import StepContainer from '../components/StepContainer/StepContainer';

const DevicePage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [subcategory, setSubcategory] = useState<string>('');
  const [q, setQ] = useState<string>('');

  const { brand, model, deviceName } = useParams<{ brand: string; model: string; deviceName?: string }>();
  const location = useLocation();

  // Get categories first
  const { categories, loading: loadingCategories, error: categoriesError } = useCategories();
  const categoryKey = (location.state as any)?.categoryKey || (brand && model ? `${brand}_${model}`.toLowerCase() : '');

  // Find category ID
  const selectedCategoryId = useMemo(() => {
    if (!categories.length || !categoryKey) return null;
    const cat = categories.find(c => c.key === categoryKey);
    return cat ? cat.id : null;
  }, [categories, categoryKey]);

  // Get subcategories for the selected category
  const { subcategories, loading: loadingSubcategories } = useSubcategories(selectedCategoryId);

  // Find selected subcategory ID
  const selectedSubcategoryId = useMemo(() => {
    if (!subcategories.length || !subcategory) return null;
    const subcat = subcategories.find((sub: any) => sub.key === subcategory);
    return subcat ? subcat.id : null;
  }, [subcategories, subcategory]);

  // Get devices for the selected subcategory or category
  const { devices: subcategoryDevices, loading: loadingSubcategoryDevices } = useDevicesBySubcategory(selectedSubcategoryId);
  const { devices: categoryDevices, loading: loadingCategoryDevices } = useDevices(selectedSubcategoryId ? null : selectedCategoryId);
  const { categorialQuestions } = useCategorialQuestions(selectedCategoryId, null);
  // Use devices from subcategory if selected, otherwise from category
  const devices = useMemo(() => {
    if (selectedSubcategoryId && subcategoryDevices) {
      return subcategoryDevices;
    }
    return categoryDevices || [];
  }, [selectedSubcategoryId, subcategoryDevices, categoryDevices]);

  useEffect(() => {
    if (deviceName) {
      setStep(2);
    } else if (brand && model) {
      setStep(1);
      setQ('');
    }
  }, [deviceName, brand, model]);

  const selectedDevice: any = useMemo(() => {
    if (!deviceName || !devices || !devices.length) return null;
    return devices.find((d: any) => {
      let cleanKey = d.key;
      cleanKey = cleanKey.replace(/[-_]\d+\s*(GB|TB|MB)$/gi, '');
      cleanKey = cleanKey.replace(/[-_]\d+$/, '');

      const deviceSlug = cleanKey.toLowerCase().replace(/_/g, '-');

      return deviceSlug === deviceName.toLowerCase();
    });
  }, [deviceName, devices]);

  // Get variants for the selected device
  const { loading: loadingVariants } = useVariants(selectedDevice?.id || null);

  // Combined loading state
  const loading = loadingCategories || loadingSubcategories || loadingCategoryDevices || loadingSubcategoryDevices || loadingVariants;
  const error = categoriesError;

  const catSpec: any = useMemo(() => {
    if (!categories.length) return { subcategories: {}, items: [] };

    const cat = categories.find(c => c.key === categoryKey);
    if (!cat) return { subcategories: {}, items: [] };

    const safeSubcategories = subcategories || [];
    const safeDevices = devices || [];
    const subcats = safeSubcategories.filter((sub: any) => sub.category_id === cat.id);

    return {
      label: cat.label,
      subcategories: subcats.reduce((acc: any, sub: any) => {
        acc[sub.key] = {
          label: sub.label,
          items: safeDevices.filter((d: any) => d.subcategory_id === sub.id),
        };
        return acc;
      }, {}),
      items: safeDevices.filter((d: any) => d.category_id === cat.id && !d.subcategory_id),
    };
  }, [categories, subcategories, devices, categoryKey]);

  const subcatKeys = useMemo(() => Object.keys(catSpec.subcategories || {}), [catSpec]);

  useEffect(() => {
    const newSubcategory = subcatKeys.length ? subcatKeys[0] : '';
    setSubcategory(newSubcategory);
  }, [subcatKeys, deviceName]);

  // Get devices for current subcategory or all category devices
  const deviceList = useMemo(() => {
    if (catSpec.subcategories && subcategory && catSpec.subcategories[subcategory]) {
      return catSpec.subcategories[subcategory].items || [];
    }
    return catSpec.items || [];
  }, [catSpec, subcategory]);

  // Filter devices by search query
  const filteredDevices = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return deviceList;

    return deviceList.filter((device: any) => {
      const searchText = [device.label, device.brand, device.model, device.key].filter(Boolean).join(' ').toLowerCase();
      return searchText.includes(query);
    });
  }, [deviceList, q]);

  return (
    <>
      {loading && (
        <RotatingLines
          visible={true}
          height='36'
          width='36'
          color='#45B549'
          strokeWidth='5'
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
          wrapperStyle={{}}
          wrapperClass='spinner-wrapper'
        />
      )}
      {error && <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>}
      {!loading && !error && (
        <StepContainer step={step}>
          {!loading && !error && catSpec.label && selectedDevice && (
            <DeviceDetail device={selectedDevice} categorialQuestions={categorialQuestions} step={step} setStep={setStep} />
          )}
          {!loading && !error && catSpec.label && !selectedDevice && step === 1 && (
            <ModelSelect
              catSpec={catSpec}
              subcatKeys={subcatKeys}
              subcategory={subcategory}
              setSubcategory={setSubcategory}
              q={q}
              setQ={setQ}
              items={filteredDevices}
              lowMatches={[]}
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
