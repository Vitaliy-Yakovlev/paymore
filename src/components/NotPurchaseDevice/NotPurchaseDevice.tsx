import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import confetti from 'canvas-confetti';
import { NotPurchaseDeviceProps } from './types';
import DeviceList from '../DeviceList';
import Button from '../Button';
import InputSearch from '../Inputs/InputSearch';
import Checkbox from '../Checkbox/Checkbox';
import ButtonRadio from '../ButtonRadio';
import css from './NotPurchaseDevice.module.css';

const GoogleMap = () => {
  return (
    <div className={css.mapContainer}>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.398!2d-74.0059728!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e10c5af%3A0x1b2d3e4f5g6h7i8j!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus'
        width='100%'
        height='200'
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen={true}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        title='Store Location'
      />
      <p className={css.mapLabel}>Visit our store to complete your transaction</p>
    </div>
  );
};

interface SelectedItem {
  id: number;
  key: string;
  label: string;
  device_image?: string | null;
}

const NotPurchaseDevice = ({ categories }: NotPurchaseDeviceProps) => {
  const [deviceSearchTerm, setDeviceSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);

  const [selectDevice, setSelectDevice] = useState<SelectedItem | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | number>('');
  const [verificationChecked, setVerificationChecked] = useState(false);
  const navigate = useNavigate();

  // Confetti animation
  const makeShot = useCallback((particleRatio: number, opts: any): void => {
    const config = { ...opts, origin: { y: 0.7 }, particleCount: Math.floor(200 * particleRatio) };
    confetti(config);
  }, []);

  const launchConfetti = useCallback((): void => {
    makeShot(0.25, { spread: 26, startVelocity: 55 });
    makeShot(0.2, { spread: 60 });
    makeShot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    makeShot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    makeShot(0.1, { spread: 120, startVelocity: 45 });
  }, [makeShot]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(deviceSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [deviceSearchTerm]);

  useEffect(() => {
    if (currentStep === 3) {
      launchConfetti();
    }
  }, [launchConfetti, currentStep]);

  const currentItems = [
    {
      brand: 'Apple',
      category_id: 33,
      created_at: '2025-11-12T18:54:44.095545+00:00',
      device_image: null,
      gtin: null,
      icon: null,
      id: 20,
      is_active: true,
      key: 'iphone_5',
      mpn: null,
      subcategory_id: null,
      updated_at: '2025-11-12T18:54:44.095545+00:00',
      label: 'iPhone 5',
    },
  ];

  const categoriesAsItems = categories.map(category => ({
    id: category.id,
    key: category.key,
    label: category.label,
    device_image: category.icon || null,
  }));

  const devicesAsItems = currentItems.map(item => ({
    id: item.id,
    key: item.key,
    label: item.label,
    device_image: item.device_image,
  }));

  const filteredCategories = categoriesAsItems.filter(category => {
    if (!debouncedSearchTerm.trim()) return true;

    const searchTerm = debouncedSearchTerm.toLowerCase();
    return category.label.toLowerCase().includes(searchTerm) || category.key.toLowerCase().includes(searchTerm);
  });

  const filteredDevices = devicesAsItems.filter(device => {
    if (!debouncedSearchTerm.trim()) return true;

    const searchTerm = debouncedSearchTerm.toLowerCase();
    return device.label.toLowerCase().includes(searchTerm) || device.key.toLowerCase().includes(searchTerm);
  });

  const current = currentStep ? filteredDevices : filteredCategories;

  const handleItemClick = (item: any) => {
    if (currentStep === 0) {
      setCurrentStep(1);
      setDeviceSearchTerm('');
      const parts = item.key.split('_');
      const path = parts.slice(0, 2).join('/').toLowerCase();
      navigate(`/category/${path}`);
    }
    if (currentStep === 1) {
      setSelectDevice(item);
      setCurrentStep(2);
    }
  };

  const handleConditionChange = (value: string | number) => {
    setSelectedCondition(value);
  };

  const textBtn: { [key: string]: string } = {
    Recycle: 'recycling',
    Donate: 'donating',
    Consign: 'consigning',
  };

  return (
    <div className={css.wrapperNotPurchaseDevice}>
      {currentStep < 2 && (
        <>
          <InputSearch value={deviceSearchTerm} onChange={setDeviceSearchTerm} placeholder='Search for a model' />
          <p className={css.title}>
            {currentStep === 0 ? 'Choose category' : 'Choose device model'}
            {debouncedSearchTerm.trim() && <span className={css.searchResults}> - Found {current.length} results</span>}
          </p>
          <DeviceList items={current} onItemClick={handleItemClick} />
        </>
      )}

      {selectDevice && currentStep === 2 && (
        <>
          <div className={css.wrapperDeviceHeader}>
            <img width={123} height={123} src={selectDevice.device_image ? selectDevice.device_image : ''} alt={selectDevice.label} />
            <div className={css.wrapperDeviceInfo}>
              <h1 className={css.deviceLabel}>{selectDevice.label}</h1>
              <Button
                onClick={() => {
                  setCurrentStep(0);
                  setSelectDevice(null);
                  setDeviceSearchTerm('');
                }}
                colorButton={'green'}
              >
                Change item
              </Button>
            </div>
          </div>

          <p className={css.text}>PayMore does not purchase this item, but we can offer you alternative options:</p>

          <div className={css.wrapperBntRadio}>
            <ButtonRadio options={['Recycle', 'Donate', 'Consign']} value={selectedCondition} onChange={handleConditionChange} />
          </div>

          <div className='wrapper-btn-step' style={{ marginTop: '30px' }}>
            <Button
              onClick={() => {
                if (currentStep === 2) {
                  setCurrentStep(3);
                  return;
                }

                if (currentStep === 3) {
                  setCurrentStep(2);
                }
              }}
            >
              <svg className={'arrow-icon'} width={17} height={16}>
                <use href='/img/sprite-icon.svg#arrow-next-back' />
              </svg>
              Go back
            </Button>
            <Button
              onClick={() => {
                if (currentStep === 2) {
                  setCurrentStep(prev => prev + 1);
                  return;
                }
              }}
              disabled={!selectedCondition}
              active={Boolean(selectedCondition)}
            >
              Continue
              <svg className={'arrow-icon next'} width={17} height={16}>
                <use href='/img/sprite-icon.svg#arrow-next-back' />
              </svg>
            </Button>
          </div>
        </>
      )}

      {selectDevice && currentStep === 3 && (
        <div className='wrapper-offer-claim-page'>
          <div className='offer-claim-page'>
            <h1 className='offer-claim-page-title'>Congratulations 🎉</h1>
            <p className='offer-claim-page-subtitle' style={{ marginBottom: '20px' }}>
              Your offer is ready, claim your cash!
            </p>

            <GoogleMap />

            <label className='offer-claim-page-label'>
              Enter your email to secure this offer
              <input className='offer-claim-page-input' type='email' placeholder='your@email.com' />
            </label>

            <label className='offer-claim-page-label'>
              4 -digit commission / rewards code (optional)
              <input className='offer-claim-page-input' type='number' placeholder='1234' />
            </label>

            <div className='wrapper-verification'>
              <Checkbox
                label={
                  <p>
                    I agree to the store’s verification & payout policies.
                    <span className='view-rewards-btn'>View rewards</span>
                  </p>
                }
                checked={verificationChecked}
                onChange={e => setVerificationChecked(e.target.checked)}
              />
            </div>

            <Button disabled={!verificationChecked} onClick={() => navigate('/category')} colorButton={'green'}>
              Send a {textBtn[selectedCondition]}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotPurchaseDevice;
