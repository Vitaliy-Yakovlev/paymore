import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import ModelSelect from '../components/ModelSelect';
import DeviceDetail from '../components/DeviceDetail';
import StepContainer from '../components/StepContainer/StepContainer';
import { useCategories, useCategorialQuestions } from '../hooks/useCategories';
import { useDevices, useDeviceVariants, useDeviceVariantPrice } from '../hooks/useDevices';
import { QuestionAnswersMap } from '../types/questions';
import NotPurchaseDevice from '../components/NotPurchaseDevice';

const DevicePage: React.FC = () => {
  const { brand, model, deviceName } = useParams<{ brand: string; model: string; deviceName?: string }>();
  const location = useLocation();
  const [step, setStep] = useState<number>(1);
  const [currentSelectedDevice, setCurrentSelectedDevice] = useState<any>(location.state?.device || null);
  const [selectedCategory] = useState<number | null>(location.state?.device?.category_id || location.state?.categoryId || null);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(location.state?.device?.id || null);

  const [selectedDeviceVariant, setSelectedDeviceVariant] = useState<number | null>(null);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswersMap>({});
  const [questionAnswersIds, setQuestionAnswersIds] = useState<number[]>([]);
  const [deviceSearchTerm, setDeviceSearchTerm] = useState<string>('');
  const [debouncedDeviceSearchTerm, setDebouncedSearchTerm] = useState(deviceSearchTerm);
  // console.log('🚀 ~ JSON.stringify(questionAnswers, null, 2):', JSON.stringify(questionAnswers, null, 2));
  // console.log('🚀 ~ JSON.stringify(questionAnswersIds, null, 2):', JSON.stringify(questionAnswersIds, null, 2));

  const { categories, loading: loadingCategories } = useCategories();
  const {
    categorialQuestions,
    // loading: loadingQuestions,
    error: questionsError,
  } = useCategorialQuestions(selectedCategory, selectedDevice);

  const { devices /* loading: loadingDevices */ } = useDevices(debouncedDeviceSearchTerm, selectedCategory);
  const { deviceVariants /* loading: loadingDevicesVariants */ } = useDeviceVariants(selectedDevice);

  const {
    salePrice,
    // loading: loadingFinalPrice,
    // error: finalPriceError,
  } = useDeviceVariantPrice(selectedCategory || 0, selectedDeviceVariant || 0, questionAnswersIds);

  function handleQuestionChange(questionId: number, answerId: number, value: string): void {
    setQuestionAnswers(prev => ({ ...prev, [questionId]: { answerId, value } }));

    setQuestionAnswersIds(prev => {
      const otherAnswers = prev.filter(id => Object(questionAnswers)[questionId]?.answerId !== id);
      return [...otherAnswers, answerId];
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(deviceSearchTerm);
    }, 400); // wait 400 ms after the last keystroke

    return () => clearTimeout(timer);
  }, [deviceSearchTerm]);

  useEffect(() => {
    if (selectedDevice) {
      const device = devices.find(d => d.id === selectedDevice) || null;
      setCurrentSelectedDevice(device);
    }
  }, [selectedDevice, devices, location, step]);

  useEffect(() => {
    if (deviceName) {
      setStep(2);
    } else if (brand && model) {
      setStep(1);
      setDebouncedSearchTerm('');
    }
  }, [deviceName, brand, model]);

  return (
    <>
      {loadingCategories && (
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
      {questionsError && <div style={{ padding: '20px', color: 'red' }}>Error: {questionsError}</div>}
      {!loadingCategories && !questionsError && step > 0 && (
        <StepContainer step={step}>
          {!loadingCategories && !questionsError && [2, 3].includes(step) && (
            <DeviceDetail
              currentSelectedDevice={currentSelectedDevice}
              step={step}
              setStep={setStep}
              handleQuestionChange={handleQuestionChange}
              deviceVariants={deviceVariants}
              categorialQuestions={categorialQuestions as any}
              setSelectedDeviceVariant={setSelectedDeviceVariant}
              salePrice={salePrice}
            />
          )}
          {!loadingCategories && !questionsError && step === 1 && (
            <ModelSelect
              items={devices}
              setDeviceSearchTerm={setDeviceSearchTerm}
              deviceSearchTerm={deviceSearchTerm}
              setSelectedDevice={setSelectedDevice}
              category={categories.find(c => c.id === selectedCategory)?.key || ''}
              brand={brand || ''}
              model={model || ''}
              setStep={setStep}
            />
          )}
        </StepContainer>
      )}
      {!loadingCategories && !questionsError && !step && <NotPurchaseDevice categories={categories} />}
    </>
  );
};

export default DevicePage;
