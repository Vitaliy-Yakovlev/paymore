import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ModelSelectProps } from './types';
import Button from '../Button';
import css from './ModelSelect.module.css';

const ModelSelect: React.FC<ModelSelectProps> = ({
  catSpec,
  subcatKeys,
  subcategory,
  setSubcategory,
  q,
  setQ,
  items,
  category,
  brand,
  model,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Here you can add processing for the selected image
    // Here you can add logic for processing the image
    if (file) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const imageUrl = URL.createObjectURL(file);
      // TODO: Add image processing logic here
      // console.log('Selected image URL:', imageUrl);
    }
    // For example, barcode recognition or sending to the server
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [items.length]);

  return (
    <div className={css.wrapperModelSelect}>
      <div className={css.wrapperSearch}>
        <label className={css.btnAddIcon} title='Select an image'>
          +
          <input type='file' accept='image/*' onChange={handleFileSelect} style={{ display: 'none' }} />
        </label>
        <input
          className={css.inputSearch}
          type='text'
          name='search'
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder='Search for a model'
        />
        <div className={css.wrapperBtnIcon}>
          <button className={css.btnIcon} type='button'>
            <svg width={22} height={22}>
              <use href='/img/sprite-icon.svg#mic' />
            </svg>
          </button>
          <button className={css.btnIcon} type='button'>
            <svg width={24} height={24}>
              <use href='/img/sprite-icon.svg#voice' />
            </svg>
          </button>
        </div>
      </div>

      <p className={css.subtitle}>
        <svg width={18} height={18}>
          <use href='/img/sprite-icon.svg#mic' />
        </svg>
        Ai voice assistant. Helps you to enter devices faster{' '}
      </p>
      <p className={css.subtitle}>
        <svg width={18} height={18}>
          <use href='/img/sprite-icon.svg#voice' />
        </svg>
        Barcode reader. Upload image or scan barcode on your device{' '}
      </p>

      <p className={css.title}>Choose device model</p>

      {/* Subcategory selector */}
      {subcatKeys.length > 0 && (
        <div className={css.subcategorySelector}>
          <p className={css.subcategoryTitle}>Choose subcategory:</p>
          <div className={css.subcategoryButtons}>
            {subcatKeys.map(key => (
              <button
                key={key}
                className={`${css.subcategoryButton} ${subcategory === key ? css.active : ''}`}
                onClick={() => setSubcategory(key)}
              >
                {catSpec.subcategories[key]?.label || key}
              </button>
            ))}
          </div>
        </div>
      )}

      <ul className={css.list}>
        {currentItems.map((item: any) => (
          <li
            className={`${css.item}`}
            key={item.key}
            onClick={() => {
              let cleanKey = item.key;
              cleanKey = cleanKey.replace(/[-_]\d+\s*(GB|TB|MB)$/gi, '');
              cleanKey = cleanKey.replace(/[-_]\d+$/, '');

              const deviceSlug = cleanKey.toLowerCase().replace(/_/g, '-');

              navigate(`/category/${brand}/${model}/${deviceSlug}`, {
                state: {
                  device: item,
                  categoryKey: category,
                  path: `/category/${brand}/${model}/${deviceSlug}`,
                },
              });
            }}
          >
            <div className={css.itemContent}>
              {item.device_image && <img className={css.deviceImage} src={item.device_image} alt={item.label} />}

              <strong className={css.deviceLabel}>{item.label}</strong>
              <svg className={css.nextIcon} width={9} height={16}>
                <use href='/img/sprite-icon.svg#next-step' />
              </svg>
            </div>
          </li>
        ))}
        {currentItems.length === 0 && <p className={css.noDevices}>No devices found matching your criteria</p>}
      </ul>

      <div className='wrapper-btn-step' style={{ marginTop: '30px' }}>
        <Button onClick={handlePrevious} disabled={currentPage === 0}>
          <svg className={'arrow-icon'} width={17} height={16}>
            <use href='/img/sprite-icon.svg#arrow-next-back' />
          </svg>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          Next Page
          <svg className={'arrow-icon next'} width={17} height={16}>
            <use href='/img/sprite-icon.svg#arrow-next-back' />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ModelSelect;
