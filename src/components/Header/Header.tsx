import React from 'react';
import { Link } from 'react-router';
import css from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={css.header}>
      <Link to='/category'>
        <svg className={css.headerLogo}>
          <use href='/img/sprite-icon.svg#main-logo' />
        </svg>
      </Link>
    </header>
  );
};

export default Header;
