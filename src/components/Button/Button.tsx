import { ButtonProps } from './types';
import css from './Button.module.css';

const Button: React.FC<ButtonProps> = ({ onClick, children, style, disabled, active, colorButton }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${css.button} ${active ? css.active : ''} ${css[colorButton || '']}`}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
