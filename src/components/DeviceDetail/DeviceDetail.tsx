import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ArrowSvg from '../../img/arrow-nex-back.svg';
import Button from '../Button';
import ButtonRadio from '../ButtonRadio';
import Checkbox from '../Checkbox';
import css from './DeviceDetail.module.css';

interface DeviceDetailProps {
  device: any;
  deviceVariants: any[];
  catSpec: any;
  category: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const DeviceDetail: React.FC<DeviceDetailProps> = ({ device, deviceVariants, catSpec, category, step, setStep }) => {
  const navigate = useNavigate();
  const { brand, model } = useParams();
  const [selectedStorage, setSelectedStorage] = useState<string | number>(device.storage);
  const [selectedCondition, setSelectedCondition] = useState<string | number>(device.condition);
  const [additionalDetails, setAdditionalDetails] = useState<{ [key: string]: boolean }>({
    charger_included: false,
    box_included: false,
    device_unlocked: false,
    nothing_of_these: false,
  });

  const [batteryHealth, setBatteryHealth] = useState<number>(74);

  const handleStorageChange = (value: string | number) => {
    setSelectedStorage(prev => (value === prev ? '' : value));
  };

  const handleConditionChange = (value: string | number) => {
    setSelectedCondition(prev => (value === prev ? '' : value));
  };
  return (
    <div>
      <div className={css.wrapperDeviceHeader}>
        {device.device_image && <img width={123} height={123} src={device.device_image} alt={device.label} />}
        <div className={css.wrapperDeviceInfo}>
          <h1 className={css.deviceLabel}>{device.label}</h1>
          <Button onClick={() => navigate('/category')} colorButton={'green'}>
            Change item
          </Button>
        </div>
      </div>

      {step === 2 && (
        <div>
          <p className={css.title}>Additional details</p>

          <div className={css.wrapperCheckbox}>
            <Checkbox
              label={'Charger included'}
              checked={additionalDetails.charger_included}
              onChange={() => {
                setAdditionalDetails(prev => ({
                  ...prev,
                  charger_included: !prev.charger_included,
                  nothing_of_these: false,
                }));
              }}
            />

            <Checkbox
              label={'Box Included'}
              checked={additionalDetails.box_included}
              onChange={() => {
                setAdditionalDetails(prev => ({
                  ...prev,
                  box_included: !prev.box_included,
                  nothing_of_these: false,
                }));
              }}
            />

            <Checkbox
              label={'Device is unlocked'}
              checked={additionalDetails.device_unlocked}
              onChange={() => {
                setAdditionalDetails(prev => ({
                  ...prev,
                  device_unlocked: !prev.device_unlocked,
                  nothing_of_these: false,
                }));
              }}
            />

            <Checkbox
              label={'Nothing of these'}
              checked={additionalDetails.nothing_of_these}
              onChange={() => {
                if (!additionalDetails.nothing_of_these) {
                  setAdditionalDetails({
                    charger_included: false,
                    box_included: false,
                    device_unlocked: false,
                    nothing_of_these: true,
                  });
                  return;
                }
                setAdditionalDetails(prev => ({
                  ...prev,
                  nothing_of_these: !prev.nothing_of_these,
                }));
              }}
            />
          </div>

          <p className={css.title}>Storage size</p>

          <div className={css.wrapperRadioBtn}>
            <ButtonRadio options={['128GB', '256GB', '512GB', '1TB']} value={selectedStorage} onChange={handleStorageChange} />
          </div>

          <p className={css.title} style={{ marginBottom: '0px' }}>
            Battery health
          </p>
          <p className={css.description}>Move the slider to match the battery’s “Maximum Capacity”</p>

          <p className={css.title} style={{ marginBottom: '12px' }}>
            Battery % (if applicable)
          </p>

          <div className={css.sliderContainer}>
            <input
              className={css.batterySlider}
              onChange={e => setBatteryHealth(Number(e.target.value))}
              type='range'
              min='0'
              max='100'
              value={batteryHealth}
              style={{
                background: `linear-gradient(to right, #45B549 0%, #45B549 ${batteryHealth}%, #E0E0E0 ${batteryHealth}%, #E0E0E0 100%)`,
              }}
            />
          </div>
          <p className={css.currentText}>Current: {batteryHealth}%</p>
        </div>
      )}

      {step === 3 && (
        <>
          <p className={css.text}>Choose the correct condition to get an accurate quote for your device trade-in.</p>

          <div className={css.wrapperBntRadio}>
            <ButtonRadio options={['Flawless', 'Good', 'Fair']} value={selectedCondition} onChange={handleConditionChange} />
          </div>
        </>
      )}
      <div className='wrapper-btn-step' style={{ marginTop: '30px' }}>
        <Button
          onClick={() => {
            if (step === 2) {
              setStep(prev => prev - 1);
              navigate(`/category/${brand}/${model}`);
              return;
            }

            if (step === 3) {
              setStep(prev => prev - 1);
            }
          }}
        >
          <svg className={'arrow-icon'} width={17} height={16}>
            <use href={ArrowSvg} />
          </svg>
          Go back
        </Button>
        <Button
          onClick={() => {
            if (step === 2) {
              setStep(prev => prev + 1);
              return;
            }

            navigate('/summary');
          }}
          disabled={
            step === 2 ? !selectedStorage || Object.values(additionalDetails).every(element => element === false) : !selectedCondition
          }
          active={
            (Boolean(selectedStorage) && Object.values(additionalDetails).includes(true) && step === 2) ||
            (step === 3 && Boolean(selectedCondition))
          }
        >
          Continue
          <svg className={'arrow-icon next'} width={17} height={16}>
            <use href={ArrowSvg} />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default DeviceDetail;
