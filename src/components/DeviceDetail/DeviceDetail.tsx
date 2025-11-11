import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CategorialQuestions } from '../../services/categoryService';
import { DeviceVariant } from '../../types/category';
import Button from '../Button';
import ButtonRadio from '../ButtonRadio';
import Checkbox from '../Checkbox';
import css from './DeviceDetail.module.css';

interface CategorialQuestionWithAnswers extends CategorialQuestions {
  question_answers: Array<{
    id: number;
    value: string;
  }>;
}

interface DeviceDetailProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleQuestionChange: (questionId: number, answerId: number, value: string) => void;
  currentSelectedDevice: any;
  categorialQuestions: CategorialQuestionWithAnswers[];
  deviceVariants: DeviceVariant[];
  setSelectedDeviceVariant: React.Dispatch<React.SetStateAction<number | null>>;
  salePrice: number | 0;
}

const DeviceDetail: React.FC<DeviceDetailProps> = ({
  currentSelectedDevice,
  step,
  setStep,
  handleQuestionChange,
  categorialQuestions,
  deviceVariants,
  setSelectedDeviceVariant,
  salePrice,
}) => {
  const navigate = useNavigate();
  const { brand, model } = useParams();
  const [selectedStorage, setSelectedStorage] = useState<string | number>(currentSelectedDevice?.storage || '');
  const [selectedCondition, setSelectedCondition] = useState<string | number>(currentSelectedDevice?.condition || '');
  const [batteryHealth, setBatteryHealth] = useState<number>(74);
  const [additionalDetails, setAdditionalDetails] = useState<{ [key: string]: boolean }>({
    charger_included: false,
    box_included: false,
    device_unlocked: false,
    nothing_of_these: false,
  });

  const handleStorageChange = (value: string | number) => {
    setSelectedStorage(prev => (value === prev ? '' : value));

    // Find selected variant and pass to parent component
    const selectedVariant = deviceVariants.find(variant => variant.storage === value);
    if (selectedVariant && value) {
      setSelectedDeviceVariant(selectedVariant.id);
      // Call parent handler to update question answers
      handleQuestionChange(0, selectedVariant.id, value.toString()); // questionId 0 for storage
    }
  };

  const handleConditionChange = (value: string | number) => {
    setSelectedCondition(prev => (value === prev ? '' : value));

    // Find condition question and answer
    const conditionQuestion = categorialQuestions.find(q => q.question.toLowerCase().includes('condition'));
    const conditionAnswer = conditionQuestion?.question_answers.find(answer => answer.value === value);

    if (conditionQuestion && conditionAnswer && value) {
      // Call parent handler to update question answers
      handleQuestionChange(conditionQuestion.id, conditionAnswer.id, value.toString());
    }
  };
  const parseStorageSize = (storage: string): number => {
    if (!storage) return 0;

    const numericValue = parseFloat(storage);
    if (isNaN(numericValue)) return 0;

    const upperStorage = storage.toUpperCase();

    if (upperStorage.includes('TB')) {
      return numericValue * 1024; // Convert TB to GB for comparison
    } else if (upperStorage.includes('GB')) {
      return numericValue;
    } else {
      return numericValue; // Assume GB if no unit specified
    }
  };

  const optionsStorage: string[] =
    (deviceVariants || [])
      .map((variant: DeviceVariant) => variant?.storage)
      .filter(Boolean) // Remove null/undefined values
      ?.sort((a: string, b: string) => {
        // Parse storage with units (GB, TB) for proper sorting
        const aSize = parseStorageSize(a);
        const bSize = parseStorageSize(b);
        return aSize - bSize;
      }) || [];

  return (
    <div>
      <div className={css.wrapperDeviceHeader}>
        {currentSelectedDevice?.device_image && (
          <img width={123} height={123} src={currentSelectedDevice?.device_image} alt={currentSelectedDevice?.label} />
        )}
        <div className={css.wrapperDeviceInfo}>
          <h1 className={css.deviceLabel}>{currentSelectedDevice?.label}</h1>
          <Button onClick={() => navigate('/category')} colorButton={'green'}>
            Change item
          </Button>
        </div>
      </div>

      <>
        {categorialQuestions.length !== 0 &&
          categorialQuestions.map(variant => {
            return (
              <>
                {step === 2 && ['storage size', 'additional details', 'battery health'].includes(variant.question.toLowerCase()) && (
                  <div>
                    {['storage size', 'additional details'].includes(variant.question.toLowerCase()) && (
                      <p className={css.title}>{variant.question}</p>
                    )}

                    {variant.question_answers.length !== 0 &&
                      variant.question_answers.map(answer => {
                        if (variant.question.toLowerCase().includes('additional details')) {
                          return (
                            <div key={answer.id} className={css.wrapperCheckbox}>
                              <Checkbox
                                label={answer.value}
                                checked={additionalDetails[answer.value] || false}
                                onChange={() => {
                                  const newChecked = !additionalDetails[answer.value];

                                  setAdditionalDetails(prev => ({
                                    ...prev,
                                    [answer.value]: newChecked,
                                    nothing_of_these: false,
                                  }));

                                  // Call parent handler to update question answers
                                  if (newChecked) {
                                    handleQuestionChange(variant.id, answer.id, answer.value);
                                  }
                                }}
                              />
                            </div>
                          );
                        }
                        return null;
                      })}

                    {optionsStorage && <p className={css.title}>Storage size</p>}

                    {optionsStorage.length !== 0 && (
                      <div className={css.wrapperRadioBtn}>
                        <ButtonRadio options={optionsStorage} value={selectedStorage} onChange={handleStorageChange} />
                      </div>
                    )}

                    {categorialQuestions.find(q => q.question.toLowerCase().includes('battery health')) && (
                      <>
                        {optionsStorage && (
                          <p className={css.title} style={{ marginBottom: 0 }}>
                            Battery health
                          </p>
                        )}
                        <p className={css.description}>{variant.description}</p>
                        <p className={css.title} style={{ marginBottom: '12px' }}>
                          Battery % (if applicable)
                        </p>

                        <div className={css.sliderContainer}>
                          <input
                            className={css.batterySlider}
                            onChange={e => {
                              const newBatteryHealth = Number(e.target.value);
                              setBatteryHealth(newBatteryHealth);

                              const question = categorialQuestions.find(q => q.question.toLowerCase().includes('battery health'));
                              if (question && question.question_answers.length > 0) {
                                handleQuestionChange(question.id, question.id, e.target.value);
                              }
                            }}
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
                      </>
                    )}
                  </div>
                )}
              </>
            );
          })}
        {step === 3 && categorialQuestions.find(q => q.question.toLowerCase().includes('condition')) && (
          <>
            <p className={css.text}>{categorialQuestions.find(q => q.question.toLowerCase().includes('condition'))?.description}</p>

            <div className={css.wrapperBntRadio}>
              {categorialQuestions.find(q => q.question.toLowerCase().includes('condition'))?.question_answers.length !== 0 && (
                <ButtonRadio
                  options={
                    categorialQuestions
                      .find(q => q.question.toLowerCase().includes('condition'))
                      ?.question_answers.map(answer => answer.value) || []
                  }
                  value={selectedCondition}
                  onChange={handleConditionChange}
                />
              )}
            </div>
          </>
        )}
      </>

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
            <use href='/img/sprite-icon.svg#arrow-next-back' />
          </svg>
          Go back
        </Button>
        <Button
          onClick={() => {
            if (step === 2) {
              setStep(prev => prev + 1);
              return;
            }

            navigate('/summary', { state: { salePrice } });
          }}
          disabled={
            step === 2
              ? (() => {
                  const hasStorageQuestion = categorialQuestions.some(q => q.question.toLowerCase().includes('storage size'));
                  const hasAdditionalDetailsQuestion = categorialQuestions.some(q =>
                    q.question.toLowerCase().includes('additional details'),
                  );

                  const storageValid = !hasStorageQuestion || Boolean(selectedStorage);
                  const additionalDetailsValid =
                    !hasAdditionalDetailsQuestion || Object.values(additionalDetails).some(element => element === true);

                  return !storageValid || !additionalDetailsValid;
                })()
              : (() => {
                  const hasConditionQuestion = categorialQuestions.some(q => q.question.toLowerCase().includes('condition'));
                  return hasConditionQuestion ? !selectedCondition : false;
                })()
          }
          active={(() => {
            if (step === 2) {
              const hasStorageQuestion = categorialQuestions.some(q => q.question.toLowerCase().includes('storage size'));
              const hasAdditionalDetailsQuestion = categorialQuestions.some(q => q.question.toLowerCase().includes('additional details'));

              const storageValid = !hasStorageQuestion || Boolean(selectedStorage);
              const additionalDetailsValid =
                !hasAdditionalDetailsQuestion || Object.values(additionalDetails).some(element => element === true);

              return storageValid && additionalDetailsValid;
            }
            if (step === 3) {
              const hasConditionQuestion = categorialQuestions.some(q => q.question.toLowerCase().includes('condition'));
              return hasConditionQuestion ? Boolean(selectedCondition) : true;
            }
            return false;
          })()}
        >
          Continue
          <svg className={'arrow-icon next'} width={17} height={16}>
            <use href='/img/sprite-icon.svg#arrow-next-back' />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default DeviceDetail;
