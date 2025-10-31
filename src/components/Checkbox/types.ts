import React from 'react';

export interface CheckboxProps {
  label: string | React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
