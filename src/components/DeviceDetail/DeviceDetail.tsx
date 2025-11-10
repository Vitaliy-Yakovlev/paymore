import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { QuestionAnswer, CategoricalQuestionWithAnswers, QuestionDeviceVariant } from '../../types/questions';
import { DeviceWithVariants } from '../../types/category';
import { getCategorialQuestions, getDeviceVariants } from '../../services/categoryService';
import Button from '../Button';
import ButtonRadio from '../ButtonRadio';
import Checkbox from '../Checkbox';
import css from './DeviceDetail.module.css';

interface DeviceDetailProps {
  device: DeviceWithVariants;
  categorialQuestions: CategoricalQuestionWithAnswers[];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedCategoryId: number | null;
  selectedDeviceId: number | null;
}

const DeviceDetail: React.FC<DeviceDetailProps> = ({
  device,
  categorialQuestions,
  step,
  setStep,
  selectedCategoryId,
  selectedDeviceId,
}) => {
  const navigate = useNavigate();
  const { brand, model } = useParams();
  const [selectedStorage, setSelectedStorage] = useState<string | number>(device.storage || '');
  const [selectedCondition, setSelectedCondition] = useState<string | number>(device.condition || '');
  const [batteryHealth, setBatteryHealth] = useState<number>(74);
  const [additionalDetails, setAdditionalDetails] = useState<{ [key: string]: boolean }>({
    charger_included: false,
    box_included: false,
    device_unlocked: false,
    nothing_of_these: false,
  });
  const [deviceVariants, setDeviceVariants] = useState<any[]>([]);
  const [loadingVariants, setLoadingVariants] = useState(false);
  const [localCategorialQuestions, setLocalCategorialQuestions] = useState<CategoricalQuestionWithAnswers[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questionAnswersIds, setQuestionAnswersIds] = useState<number[]>([]);

  // Load device variants when device changes
  useEffect(() => {
    const loadDeviceVariants = async () => {
      if (device.id) {
        setLoadingVariants(true);
        try {
          const variants = await getDeviceVariants(device.id);
          setDeviceVariants(variants);
        } catch (error) {
          console.error('Error loading device variants:', error);
        } finally {
          setLoadingVariants(false);
        }
      }
    };

    loadDeviceVariants();
  }, [device.id]);

  // Load categorial questions if not provided or when category changes
  useEffect(() => {
    const loadCategorialQuestions = async () => {
      if (!categorialQuestions.length && device.category_id) {
        setLoadingQuestions(true);
        try {
          const questions = await getCategorialQuestions(device.category_id, device.id);
          setLocalCategorialQuestions(questions as CategoricalQuestionWithAnswers[]);
        } catch (error) {
          console.error('Error loading categorial questions:', error);
        } finally {
          setLoadingQuestions(false);
        }
      }
    };

    loadCategorialQuestions();
  }, [categorialQuestions.length, device.category_id, device.id]);

  // Use provided questions or loaded ones
  const questionsToUse = categorialQuestions.length > 0 ? categorialQuestions : localCategorialQuestions;

  // Helper function to find matching battery answer based on percentage
  const findBatteryAnswer = useCallback(
    (batteryPercentage: number) => {
      const batteryQuestion = questionsToUse.find(q => q.question.toLowerCase().includes('battery health'));

      if (!batteryQuestion || !batteryQuestion.question_answers.length) {
        return null;
      }

      return batteryQuestion.question_answers.find(answer => {
        const range = answer.value; // e.g., "10-40", "41-60", "61-80", "81-100"

        if (range.includes('-')) {
          const [min, max] = range.split('-').map(num => parseInt(num.trim()));
          return batteryPercentage >= min && batteryPercentage <= max;
        }

        // Handle exact values if any
        const exactValue = parseInt(range);
        if (!isNaN(exactValue)) {
          return batteryPercentage === exactValue;
        }

        return false;
      });
    },
    [questionsToUse],
  );

  // Helper function to update battery health in questionAnswersIds
  const updateBatteryHealthAnswer = useCallback(
    (batteryPercentage: number) => {
      const matchingAnswer = findBatteryAnswer(batteryPercentage);

      setQuestionAnswersIds(prev => {
        const batteryQuestion = questionsToUse.find(q => q.question.toLowerCase().includes('battery health'));

        // Remove any previous battery health answer IDs
        const batteryAnswerIds = batteryQuestion?.question_answers.map(a => a.id) || [];
        const filteredPrev = prev.filter(id => !batteryAnswerIds.includes(id));

        if (matchingAnswer) {
          return [...filteredPrev, matchingAnswer.id];
        }

        return filteredPrev;
      });
    },
    [findBatteryAnswer, questionsToUse],
  ); // Initialize battery health answer on component mount or when questions change
  useEffect(() => {
    if (questionsToUse.length > 0) {
      updateBatteryHealthAnswer(batteryHealth);
    }
  }, [questionsToUse, batteryHealth, updateBatteryHealthAnswer]);
  const handleStorageChange = (value: string | number) => {
    setSelectedStorage(prev => (value === prev ? '' : value));

    // Update question answers IDs for storage
    setQuestionAnswersIds(prev => {
      const selectedVariant = deviceVariants.find(variant => variant.storage === value);
      const variantId = selectedVariant?.id;

      // Remove any previous storage variant IDs (they would be from deviceVariants)
      const filteredPrev = prev.filter(id => !deviceVariants.some(variant => variant.id === id));

      if (value && variantId) {
        return [...filteredPrev, variantId];
      }

      return filteredPrev;
    });
  };

  const handleConditionChange = (value: string | number) => {
    setSelectedCondition(prev => (value === prev ? '' : value));

    // Update question answers IDs for condition
    setQuestionAnswersIds(prev => {
      const conditionQuestion = questionsToUse.find(q => q.question.toLowerCase().includes('condition'));
      const conditionAnswer = conditionQuestion?.question_answers.find(answer => answer.value === value);

      // Remove any previous condition answer IDs
      const conditionAnswerIds = conditionQuestion?.question_answers.map(a => a.id) || [];
      const filteredPrev = prev.filter(id => !conditionAnswerIds.includes(id));

      if (value && conditionAnswer) {
        return [...filteredPrev, conditionAnswer.id];
      }

      return filteredPrev;
    });
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
      .map((answer: QuestionDeviceVariant) => answer?.storage)
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
        {device.device_image && <img width={123} height={123} src={device.device_image} alt={device.label} />}
        <div className={css.wrapperDeviceInfo}>
          <h1 className={css.deviceLabel}>{device.label}</h1>
          <Button onClick={() => navigate('/category')} colorButton={'green'}>
            Change item
          </Button>
        </div>
      </div>

      <>
        {loadingQuestions && <p>Loading questions...</p>}
        {loadingVariants && <p>Loading device variants...</p>}
        {questionsToUse.length !== 0 &&
          questionsToUse.map(question => {
            return (
              <>
                {step === 2 && ['storage size', 'additional details', 'battery health'].includes(question.question.toLowerCase()) && (
                  <div>
                    {question.question && <p className={css.title}>{question.question}</p>}

                    {question?.question_answers.length !== 0 &&
                      question?.question_answers.map((answer: QuestionAnswer) => {
                        if (question.question.toLowerCase().includes('additional details')) {
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

                                  // Update question answers IDs for additional details
                                  setQuestionAnswersIds(prev => {
                                    if (newChecked) {
                                      // Add this answer ID if not already present
                                      return prev.includes(answer.id) ? prev : [...prev, answer.id];
                                    } else {
                                      // Remove this answer ID
                                      return prev.filter(id => id !== answer.id);
                                    }
                                  });
                                }}
                              />
                            </div>
                          );
                        }
                        return null;
                      })}

                    {question.question === 'Storage Size' && optionsStorage.length !== 0 && (
                      <div className={css.wrapperRadioBtn}>
                        <ButtonRadio options={optionsStorage} value={selectedStorage} onChange={handleStorageChange} />
                      </div>
                    )}

                    {question.question.toLowerCase().includes('battery health') && (
                      <>
                        <p className={css.description}>{question.description}</p>
                        <p className={css.title} style={{ marginBottom: '12px' }}>
                          Battery % (if applicable)
                        </p>

                        <div className={css.sliderContainer}>
                          <input
                            className={css.batterySlider}
                            onChange={e => {
                              const newBatteryHealth = Number(e.target.value);
                              setBatteryHealth(newBatteryHealth);
                              updateBatteryHealthAnswer(newBatteryHealth);
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

                {step === 3 && question.question.toLowerCase().includes('condition') && (
                  <>
                    <p className={css.text}>{question.description}</p>

                    <div className={css.wrapperBntRadio}>
                      {question.question_answers && question.question_answers.length !== 0 && (
                        <ButtonRadio
                          options={question.question_answers.map((answer: QuestionAnswer) => answer.value)}
                          value={selectedCondition}
                          onChange={handleConditionChange}
                        />
                      )}
                    </div>
                  </>
                )}
              </>
            );
          })}
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

            navigate('/summary', { state: { selectedCategoryId, selectedDeviceId, questionAnswersIds } });
          }}
          disabled={
            step === 2
              ? (() => {
                  const hasStorageQuestion = questionsToUse.some(q => q.question.toLowerCase().includes('storage size'));
                  const hasAdditionalDetailsQuestion = questionsToUse.some(q => q.question.toLowerCase().includes('additional details'));

                  const storageValid = !hasStorageQuestion || Boolean(selectedStorage);
                  const additionalDetailsValid =
                    !hasAdditionalDetailsQuestion || Object.values(additionalDetails).some(element => element === true);

                  return !storageValid || !additionalDetailsValid;
                })()
              : (() => {
                  const hasConditionQuestion = questionsToUse.some(q => q.question.toLowerCase().includes('condition'));
                  return hasConditionQuestion ? !selectedCondition : false;
                })()
          }
          active={(() => {
            if (step === 2) {
              const hasStorageQuestion = questionsToUse.some(q => q.question.toLowerCase().includes('storage size'));
              const hasAdditionalDetailsQuestion = questionsToUse.some(q => q.question.toLowerCase().includes('additional details'));

              const storageValid = !hasStorageQuestion || Boolean(selectedStorage);
              const additionalDetailsValid =
                !hasAdditionalDetailsQuestion || Object.values(additionalDetails).some(element => element === true);

              return storageValid && additionalDetailsValid;
            }
            if (step === 3) {
              const hasConditionQuestion = questionsToUse.some(q => q.question.toLowerCase().includes('condition'));
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
