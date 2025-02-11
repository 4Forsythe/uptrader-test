import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { useModal } from '../../hooks';
import {
  addProject,
  deleteProject,
  updateProject,
} from '../../redux/actions/project.actions';
import { Project } from '../../redux/types/project.types';

import classes from './ProjectForm.module.scss';

interface ProjectFormProps {
  project?: Project;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
  const [title, setTitle] = React.useState('');

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const isValid = title;

  React.useEffect(() => {
    if (project) {
      setTitle(project.title);
    }
  }, [project]);

  const onSaveProject = () => {
    if (isValid) {
      if (project) {
        dispatch(updateProject(project.id, { ...project, title }));
      } else {
        dispatch(
          addProject({
            id: Date.now().toString(),
            title,
          })
        );
      }

      closeModal();
    }
  };

  const onDeleteProject = () => {
    if (project) {
      dispatch(deleteProject(project.id));

      closeModal();
    }
  };

  return (
    <div className={classes.container}>
      <h5 className={classes.title}>
        {project ? 'Редактировать проект' : 'Создать новый проект'}
      </h5>

      <div className={classes.form}>
        <div className={classes.column}>
          <label htmlFor='title'>Название</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
      </div>

      <div className={classes.buttons}>
        <button
          className={cn(classes.formButton, classes.submit)}
          onClick={onSaveProject}
          disabled={!isValid}
        >
          Сохранить
        </button>

        {project && (
          <button
            className={cn(classes.formButton, classes.decline)}
            onClick={onDeleteProject}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};
