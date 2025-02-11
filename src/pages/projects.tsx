import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProjectList } from '../components';

import { RootState } from '../redux/reducers';
import { addProject, deleteProject } from '../redux/actions/project.actions';

export const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  const onAddProject = () => {
    dispatch(
      addProject({
        id: Date.now().toString(),
        title: `${projects.length} - ${new Date().toLocaleString()}`,
      })
    );
  };

  const onDeleteProject = (id: string) => {
    dispatch(deleteProject(id));
  };

  return (
    <div id='projects'>
      <ProjectList
        items={projects}
        onAdd={onAddProject}
        onDelete={(id) => onDeleteProject(id)}
      />
    </div>
  );
};
