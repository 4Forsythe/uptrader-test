import React from 'react';
import { useSelector } from 'react-redux';

import { ProjectList } from '../components';

import { RootState } from '../redux/reducers';

export const Projects: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);

  return (
    <div id='projects'>
      <ProjectList items={projects} />
    </div>
  );
};
