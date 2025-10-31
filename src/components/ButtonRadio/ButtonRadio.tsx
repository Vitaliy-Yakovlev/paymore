import React from 'react';
import { RadioButtonProps } from './types';
import css from './ButtonRadio.module.css';

const ButtonRadio: React.FC<RadioButtonProps> = ({ options, value, onChange }) => {
  return (
    <>
      {options.map((option, index) => {
        return (
          <button
            key={index}
            type='button'
            className={`${css.radioLabel} ${value === option ? css.active : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        );
      })}
    </>
  );
};

export default ButtonRadio;
