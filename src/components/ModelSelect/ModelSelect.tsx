import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelSelectProps } from './types';
import { Device } from '../../types/category';
import Mic from '../../img/mic.svg';
import Voice from '../../img/voice.svg';
import Next from '../../img/next.svg';
import ArrowSvg from '../../img/arrow-nex-back.svg';
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
  lowMatches,
  category,
  brand,
  model,
  categoryLabel,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>();
  const navigate = useNavigate();

  return (
    <div className={css.wrapperModelSelect}>
      <div className={css.wrapperSearch}>
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
              <use href={Mic} />
            </svg>
          </button>
          <button className={css.btnIcon} type='button'>
            <svg width={24} height={24}>
              <use href={Voice} />
            </svg>
          </button>
        </div>
      </div>

      <p className={css.subtitle}>
        <svg width={18} height={18}>
          <use href={Mic} />
        </svg>
        Ai voice assistant. Helps you to enter devices faster{' '}
      </p>
      <p className={css.subtitle}>
        <svg width={18} height={18}>
          <use href={Voice} />
        </svg>
        Barcode reader. Upload image or scan barcode on your device{' '}
      </p>

      <p className={css.title}>Choose device model</p>

      <ul className={css.list}>
        {items.map((item: any) => (
          <li
            className={`${css.item} ${selectedDevice && item.id === selectedDevice.id ? css.active : ''}`}
            key={item.key}
            onClick={() => setSelectedDevice(item)}
          >
            <div className={css.itemContent}>
              {item.device_image && <img className={css.deviceImage} src={item.device_image} alt={item.label} />}

              <strong className={css.deviceLabel}>{item.label}</strong>
              <svg className={css.nextIcon} width={9} height={16}>
                <use href={Next} />
              </svg>
            </div>
          </li>
        ))}
        {items.length === 0 && <p className={css.noDevices}>No devices found matching your criteria</p>}
      </ul>

      <div className='wrapper-btn-step' style={{ marginTop: '30px' }}>
        <Button
          onClick={() => {
            navigate('/category');
          }}
        >
          <svg className={'arrow-icon'} width={17} height={16}>
            <use href={ArrowSvg} />
          </svg>
          Previous
        </Button>
        <Button
          onClick={() => {
            if (!selectedDevice) return;

            let cleanKey = selectedDevice.key;
            cleanKey = cleanKey.replace(/[-_]\d+\s*(GB|TB|MB)$/gi, '');
            cleanKey = cleanKey.replace(/[-_]\d+$/, '');

            const deviceSlug = cleanKey.toLowerCase().replace(/_/g, '-');

            navigate(`/category/${brand}/${model}/${deviceSlug}`, {
              state: {
                device: selectedDevice,
                categoryKey: category,
              },
            });
          }}
          disabled={!selectedDevice}
          active={!!selectedDevice}
        >
          Next Page
          <svg className={'arrow-icon next'} width={17} height={16}>
            <use href={ArrowSvg} />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ModelSelect;
