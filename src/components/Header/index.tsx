import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

import classes from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={classes.wrapper}>
      <nav className={classes.navbar}>
        <menu className={classes.menu}>
          <li>
            <Link className={classes.menuLink} to={ROUTES.PROJECTS}>
              Мои проекты
            </Link>
          </li>
        </menu>
      </nav>
    </header>
  );
};
