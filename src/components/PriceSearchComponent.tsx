import React, { useState, useEffect } from 'react';
import { usePriceList } from '../hooks/usePriceList';

export const PriceSearchComponent: React.FC = () => {
  const { searchDevicePrices, getBrands, getDevices, getStorageVariants, getDevicePrice, loading, error } =
    usePriceList();

  const [brands, setBrands] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [storageOptions, setStorageOptions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Форма пошуку
  const [searchForm, setSearchForm] = useState({
    brand: '',
    device: '',
    storage: '',
    condition: 'Good' as 'Excellent' | 'Good' | 'Fair',
    originalBox: true,
    originalCharger: true,
    unlocked: true,
  });

  // Завантаження брендів при ініціалізації
  useEffect(() => {
    const loadBrands = async () => {
      const brandsList = await getBrands();
      setBrands(brandsList);
    };
    loadBrands();
  }, [getBrands]);

  // Завантаження пристроїв при зміні бренду
  useEffect(() => {
    if (searchForm.brand) {
      const loadDevices = async () => {
        const devicesList = await getDevices(searchForm.brand);
        setDevices(devicesList);
        setSearchForm(prev => ({ ...prev, device: '', storage: '' }));
      };
      loadDevices();
    } else {
      setDevices([]);
      setSearchForm(prev => ({ ...prev, device: '', storage: '' }));
    }
  }, [searchForm.brand, getDevices]);

  // Завантаження варіантів пам'яті при зміні пристрою
  useEffect(() => {
    if (searchForm.device) {
      const loadStorage = async () => {
        const storageList = await getStorageVariants(searchForm.device);
        setStorageOptions(storageList);
        setSearchForm(prev => ({ ...prev, storage: '' }));
      };
      loadStorage();
    } else {
      setStorageOptions([]);
      setSearchForm(prev => ({ ...prev, storage: '' }));
    }
  }, [searchForm.device, getStorageVariants]);

  const handleSearch = async () => {
    if (!searchForm.device || !searchForm.storage) {
      alert("Будь ласка, оберіть пристрій та варіант пам'яті");
      return;
    }

    const results = await searchDevicePrices({
      device_name: searchForm.device,
      brand: searchForm.brand,
      storage: searchForm.storage,
      condition: searchForm.condition,
      original_box: searchForm.originalBox,
      original_charger: searchForm.originalCharger,
      unlocked: searchForm.unlocked,
    });

    setSearchResults(results);
  };

  const handleGetExactPrice = async () => {
    if (!searchForm.device || !searchForm.storage) {
      alert("Будь ласка, оберіть пристрій та варіант пам'яті");
      return;
    }

    const result = await getDevicePrice(
      searchForm.device,
      searchForm.storage,
      searchForm.condition,
      searchForm.originalBox,
      searchForm.originalCharger,
    );

    if (result) {
      setSearchResults([result]);
    }
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-6'>Пошук цін пристроїв</h2>

      {/* Форма пошуку */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Бренд</label>
          <select
            value={searchForm.brand}
            onChange={e => setSearchForm(prev => ({ ...prev, brand: e.target.value }))}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Оберіть бренд</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Пристрій</label>
          <select
            value={searchForm.device}
            onChange={e => setSearchForm(prev => ({ ...prev, device: e.target.value }))}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={!searchForm.brand}
          >
            <option value=''>Оберіть пристрій</option>
            {devices.map(device => (
              <option key={device} value={device}>
                {device}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Пам'ять</label>
          <select
            value={searchForm.storage}
            onChange={e => setSearchForm(prev => ({ ...prev, storage: e.target.value }))}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={!searchForm.device}
          >
            <option value=''>Оберіть пам'ять</option>
            {storageOptions.map(storage => (
              <option key={storage} value={storage}>
                {storage}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Стан</label>
          <select
            value={searchForm.condition}
            onChange={e =>
              setSearchForm(prev => ({ ...prev, condition: e.target.value as 'Excellent' | 'Good' | 'Fair' }))
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='Excellent'>Відмінний</option>
            <option value='Good'>Хороший</option>
            <option value='Fair'>Задовільний</option>
          </select>
        </div>

        <div className='flex items-center space-x-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={searchForm.originalBox}
              onChange={e => setSearchForm(prev => ({ ...prev, originalBox: e.target.checked }))}
              className='mr-2'
            />
            Оригінальна коробка
          </label>
        </div>

        <div className='flex items-center space-x-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={searchForm.originalCharger}
              onChange={e => setSearchForm(prev => ({ ...prev, originalCharger: e.target.checked }))}
              className='mr-2'
            />
            Оригінальна зарядка
          </label>
        </div>
      </div>

      {/* Кнопки пошуку */}
      <div className='flex space-x-4 mb-6'>
        <button
          onClick={handleSearch}
          disabled={loading}
          className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
        >
          {loading ? 'Пошук...' : 'Пошук цін'}
        </button>
        <button
          onClick={handleGetExactPrice}
          disabled={loading}
          className='px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50'
        >
          {loading ? 'Пошук...' : 'Точна ціна'}
        </button>
      </div>

      {/* Помилки */}
      {error && <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>Помилка: {error}</div>}

      {/* Результати пошуку */}
      {searchResults.length > 0 && (
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Результати пошуку:</h3>
          {searchResults.map((result, index) => (
            <div key={index} className='p-4 border border-gray-200 rounded-lg'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div>
                  <strong>Пристрій:</strong> {result.device_name}
                </div>
                <div>
                  <strong>Бренд:</strong> {result.brand}
                </div>
                <div>
                  <strong>Пам'ять:</strong> {result.storage}
                </div>
                <div>
                  <strong>Стан:</strong> {result.condition}
                </div>
                <div>
                  <strong>Ціна продажу:</strong> ${result.sale_price?.toFixed(2) || 'N/A'}
                </div>
                <div>
                  <strong>Фінальна ціна:</strong> ${result.final_price?.toFixed(2) || 'N/A'}
                </div>
              </div>

              {result.deductions && (result.deductions.no_box > 0 || result.deductions.no_charger > 0) && (
                <div className='mt-2 text-sm text-gray-600'>
                  <strong>Знижки:</strong>
                  {result.deductions.no_box > 0 && (
                    <span className='ml-2'>Без коробки: -${result.deductions.no_box.toFixed(2)}</span>
                  )}
                  {result.deductions.no_charger > 0 && (
                    <span className='ml-2'>Без зарядки: -${result.deductions.no_charger.toFixed(2)}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
