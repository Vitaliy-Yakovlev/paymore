import React, { ReactNode } from 'react';
import css from './StepContainer.module.css';

export interface StepContainerProps {
  children: ReactNode;
  step: number;
}

const StepContainer: React.FC<StepContainerProps> = ({ children, step }) => {
  return (
    <div className={css.stepContainer}>
      <div className='wrapper-step-current'>
        <div className='step-current-text'>
          <p className='step-text'>
            STEP {step} / {4}
          </p>
          <p className='step-text'>Item price</p>
        </div>
        <div className='step-current'>
          {Array.from({ length: 4 }, (_, index) => index + 1).map(stepIndex => (
            <span key={stepIndex} className={`step-current-value ${step >= stepIndex ? 'active' : ''}`}></span>
          ))}
        </div>
      </div>

      <div className={css.stepContent}>{children}</div>
    </div>
  );
};

export default StepContainer;
