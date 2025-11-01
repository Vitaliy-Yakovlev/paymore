import React from 'react';
import { Link } from 'react-router';
import Logo from '../../img/main-logo.svg';
import css from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={css.header}>
      <Link to='/category'>
        <svg className={css.headerLogo} width='200' height='32'>
          <use href={Logo} />
        </svg>
      </Link>
    </header>
  );
};

export default Header;
