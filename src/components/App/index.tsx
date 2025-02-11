import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Projects, Dashboard } from '../../pages';
import { Container, Header } from '../../components';

import classes from './App.module.scss';

export const App: React.FC = () => {
  return (
    <Container>
      <div className={classes.wrapper}>
        <Header />
        <main className={classes.main}>
          <Routes>
            <Route path='/' element={<Projects />} />
            <Route path='project/:id' element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Container>
  );
};
