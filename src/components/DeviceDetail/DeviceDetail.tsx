import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [additionalDetails, setAdditionalDetails] = useState<{ [key: string]: boolean }>({});
  const initializedRef = useRef(false);

  const initializeBatteryHealth = useCallback(() => {
    if (!initializedRef.current && categorialQuestions.length > 0) {
      const batteryQuestion = categorialQuestions.find(q => q.question.toLowerCase().includes('battery health'));
      if (batteryQuestion) {
        handleQuestionChange(batteryQuestion.id, batteryQuestion.id, batteryHealth.toString());
        initializedRef.current = true;
      }
    }
  }, [categorialQuestions, batteryHealth, handleQuestionChange]);

  useEffect(() => {
    initializeBatteryHealth();
  }, [initializeBatteryHealth]);

  const getQuestionsForStep = (stepNumber: number) => {
    if (stepNumber === 2) {
      return categorialQuestions.filter(q => !q.question.toLowerCase().includes('condition'));
    }
    if (stepNumber === 3) {
      return categorialQuestions.filter(q => q.question.toLowerCase().includes('condition'));
    }
    return [];
  };

  const getQuestionType = (question: string) => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('storage')) {
      return 'storage';
    }
    if (lowerQuestion.includes('additional details') || lowerQuestion.includes('charger included')) {
      return 'additional_details';
    }
    if (lowerQuestion.includes('battery health')) {
      return 'battery_health';
    }
    if (lowerQuestion.includes('condition')) {
      return 'condition';
    }

    return 'generic';
  };

  const isFormValid = () => {
    if (step === 2) {
      const step2Questions = getQuestionsForStep(2);

      if (step2Questions.length === 0) {
        return true;
      }

      if (optionsStorage.length > 0 && !Boolean(selectedStorage)) {
        return false;
      }

      for (const question of step2Questions) {
        const questionType = getQuestionType(question.question);

        switch (questionType) {
          case 'storage':
            if (optionsStorage.length > 0 && !Boolean(selectedStorage)) {
              return false;
            }
            break;
          case 'additional_details':
            if (question.question.toLowerCase().includes('charger included')) {
              continue;
            }

            if (!Object.values(additionalDetails).some(element => element === true)) {
              return false;
            }
            break;
          case 'battery_health':
            break;
          case 'generic':
            if (!Object.values(additionalDetails).some(element => element === true)) {
              return false;
            }
            break;
        }
      }

      return true;
    }

    if (step === 3) {
      const step3Questions = getQuestionsForStep(3);

      if (step3Questions.length === 0) {
        return true;
      }

      return Boolean(selectedCondition);
    }

    return true;
  };

  const handleStorageChange = (value: string | number) => {
    const newValue = value === selectedStorage ? '' : value;
    setSelectedStorage(newValue);

    // Find selected variant and pass to parent component
    const selectedVariant = deviceVariants.find(variant => variant.storage === newValue);
    if (selectedVariant && newValue) {
      setSelectedDeviceVariant(selectedVariant.id);
      // Call parent handler to update question answers
      handleQuestionChange(0, selectedVariant.id, newValue.toString()); // questionId 0 for storage
    } else {
      setSelectedDeviceVariant(null);
    }
  };

  const handleConditionChange = (value: string | number) => {
    const newValue = value === selectedCondition ? '' : value;
    setSelectedCondition(newValue);

    // Find condition question and answer
    const conditionQuestion = categorialQuestions.find(q => q.question.toLowerCase().includes('condition'));
    const conditionAnswer = conditionQuestion?.question_answers.find(answer => answer.value === newValue);

    if (conditionQuestion && conditionAnswer && newValue) {
      // Call parent handler to update question answers
      handleQuestionChange(conditionQuestion.id, conditionAnswer.id, newValue.toString());
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
        {step === 2 && deviceVariants && optionsStorage.length > 0 && (
          <>
            <p className={css.title}>Storage size</p>
            <div className={css.wrapperRadioBtn}>
              <ButtonRadio options={optionsStorage} value={selectedStorage} onChange={handleStorageChange} />
            </div>
          </>
        )}

        {getQuestionsForStep(2).length !== 0 &&
          getQuestionsForStep(2).map(variant => {
            return (
              <>
                {step === 2 && (
                  <div key={variant.id}>
                    {getQuestionType(variant.question) === 'additional_details' && (
                      <>
                        <p className={css.title}>{variant.question}</p>
                        {variant.question.toLowerCase().includes('charger included') && (
                          <div className={css.wrapperCheckbox}>
                            <Checkbox
                              label='Charger Included'
                              checked={additionalDetails.charger_included || false}
                              onChange={() => {
                                const newChecked = !additionalDetails.charger_included;
                                setAdditionalDetails(prev => ({
                                  ...prev,
                                  charger_included: newChecked,
                                }));
                                const yesAnswer = variant.question_answers.find(answer => answer.value.toLowerCase().includes('yes'));
                                const noAnswer = variant.question_answers.find(answer => answer.value.toLowerCase().includes('no'));

                                if (newChecked && yesAnswer) {
                                  handleQuestionChange(variant.id, yesAnswer.id, yesAnswer.value);
                                } else if (!newChecked && noAnswer) {
                                  handleQuestionChange(variant.id, noAnswer.id, noAnswer.value);
                                }
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}

                    {variant.question.toLowerCase().includes('battery health') && (
                      <>
                        <p className={css.title} style={{ marginBottom: 0 }}>
                          Battery health
                        </p>

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

                              handleQuestionChange(variant.id, variant.id, e.target.value);
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

                    {getQuestionType(variant.question) === 'generic' && (
                      <>
                        <p className={css.title}>{variant.question}</p>
                        {variant.description && <p className={css.description}>{variant.description}</p>}
                        {variant.question_answers.length > 0 && (
                          <div>
                            {variant.question_answers.map(answer => (
                              <div key={answer.id} className={css.wrapperCheckbox}>
                                <Checkbox
                                  label={answer.value}
                                  checked={additionalDetails[answer.value] || false}
                                  onChange={() => {
                                    const newChecked = !additionalDetails[answer.value];
                                    setAdditionalDetails(prev => ({
                                      ...prev,
                                      [answer.value]: newChecked,
                                    }));
                                    handleQuestionChange(variant.id, answer.id, answer.value);
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </>
            );
          })}

        {step === 3 && getQuestionsForStep(3).length > 0 && (
          <>
            <p className={css.text}>{getQuestionsForStep(3)[0]?.description}</p>

            <div className={css.wrapperBntRadio}>
              {getQuestionsForStep(3)[0]?.question_answers.length !== 0 && (
                <ButtonRadio
                  options={getQuestionsForStep(3)[0]?.question_answers.map(answer => answer.value) || []}
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

            console.log('Navigating to /summary with salePrice:', salePrice);
            navigate('/summary', { state: { salePrice } });
          }}
          disabled={!isFormValid()}
          active={isFormValid()}
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
