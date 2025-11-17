import css from './Checkbox.module.css';
import { CheckboxProps } from './types';

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if ((e.target as HTMLElement).tagName === 'SPAN' && !(e.target as HTMLElement).classList.contains(css.checkmark)) {
      e.preventDefault();
    }
  };

  return (
    <label className={css.checkboxLabel} onClick={handleLabelClick}>
      <input
        name='checkbox'
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className={`${css.checkboxInput} ${css.visuallyHidden}`}
      />
      <span className={css.checkmark} />
      {label}
    </label>
  );
};
export default Checkbox;
