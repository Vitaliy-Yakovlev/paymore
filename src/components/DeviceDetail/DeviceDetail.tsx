import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { QuestionAnswer, CategoricalQuestionWithAnswers } from '../../types/questions';
import { DeviceWithVariants } from '../../types/category';
import Button from '../Button';
import ButtonRadio from '../ButtonRadio';
import Checkbox from '../Checkbox';
import css from './DeviceDetail.module.css';

interface DeviceDetailProps {
  device: DeviceWithVariants;
  categorialQuestions: CategoricalQuestionWithAnswers[];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const DeviceDetail: React.FC<DeviceDetailProps> = ({ device, categorialQuestions, step, setStep }) => {
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

  const handleStorageChange = (value: string | number) => {
    setSelectedStorage(prev => (value === prev ? '' : value));
  };

  const handleConditionChange = (value: string | number) => {
    setSelectedCondition(prev => (value === prev ? '' : value));
  };

  const optionsStorage: string[] =
    (categorialQuestions || [])
      .find(question => question.question.toLowerCase().includes('storage size'))
      ?.question_answers?.map((answer: QuestionAnswer) => answer.value)
      ?.sort((a: string, b: string) => {
        // Try to parse storage as numbers for sorting (e.g., "128GB" -> 128)
        const aSize = parseInt(a) || 0;
        const bSize = parseInt(b) || 0;
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
        {categorialQuestions.length !== 0 &&
          categorialQuestions.map(question => {
            return (
              <>
                {step === 2 && ['storage size', 'additional details', 'battery health'].includes(question.question.toLowerCase()) && (
                  <div>
                    {question.question && <p className={css.title}>{question.question}</p>}

                    {question.question === 'Storage Size' && optionsStorage.length !== 0 && (
                      <div className={css.wrapperRadioBtn}>
                        <ButtonRadio options={optionsStorage} value={selectedStorage} onChange={handleStorageChange} />
                      </div>
                    )}

                    {question?.question_answers.length !== 0 &&
                      question?.question_answers.map((answer: QuestionAnswer) => {
                        if (question.question.toLowerCase().includes('additional details')) {
                          return (
                            <div key={answer.id} className={css.wrapperCheckbox}>
                              <Checkbox
                                label={answer.value}
                                checked={additionalDetails[answer.value] || false}
                                onChange={() => {
                                  setAdditionalDetails(prev => ({
                                    ...prev,
                                    [answer.value]: !prev[answer.value],
                                    nothing_of_these: false,
                                  }));
                                }}
                              />
                            </div>
                          );
                        }
                        return null;
                      })}

                    {question.question.toLowerCase().includes('battery health') && (
                      <>
                        <p className={css.description}>{question.description}</p>
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

            navigate('/summary');
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
