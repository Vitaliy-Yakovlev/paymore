import css from './Checkbox.module.css';
import { CheckboxProps } from './types';

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, radioCheckbox }) => {
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e);

  return (
    <label className={!radioCheckbox ? css.checkboxLabel : css.checkboxLabelRadio}>
      <input
        name='checkbox'
        type='checkbox'
        checked={checked}
        onChange={handleClick}
        className={`${!radioCheckbox ? css.checkboxInput : css.checkboxInputRadio} ${css.visuallyHidden}`}
      />
      <span className={!radioCheckbox ? css.checkmark : css.checkmarkRadio} />
      {label}
    </label>
  );
};
export default Checkbox;
