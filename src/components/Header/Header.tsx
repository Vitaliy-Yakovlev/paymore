import React from 'react';
import Logo from '../../img/main-logo.svg';
import css from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={css.header}>
      <svg className={css.headerLogo} width="200" height="32">
        <use href={Logo} />
      </svg>
    </header>
  );
};

export default Header;
