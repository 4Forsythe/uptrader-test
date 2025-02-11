import React from 'react';

import classes from './Container.module.scss';

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};
