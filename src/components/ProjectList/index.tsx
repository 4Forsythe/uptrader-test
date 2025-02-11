import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Pen, X } from 'lucide-react';

import { useModal } from '../../hooks';
import { ROUTES } from '../../constants';
import { ProjectForm } from '../../components';
import { Project } from '../../redux/types/project.types';
import { deleteProject } from '../../redux/actions/project.actions';

import classes from './ProjectList.module.scss';

interface ProjectListProps {
  items: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ items }) => {
  const dispatch = useDispatch();
  const { openModal } = useModal();

  const onSelectProject = (project: Project) => {
    openModal(<ProjectForm project={project} />);
  };

  const onDeleteProject = (id: string) => {
    dispatch(deleteProject(id));
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.title}>Проекты - {items.length}</h1>
        <button
          className={classes.button}
          onClick={() => openModal(<ProjectForm />)}
        >
          Создать новый проект
        </button>
      </header>

      <ul className={classes.list}>
        {items.map((item) => (
          <li className={classes.listItem} key={item.id}>
            <button
              className={classes.action}
              onClick={() => onSelectProject(item)}
            >
              <Pen size={20} />
            </button>
            <Link
              className={classes.card}
              to={`${ROUTES.DASHBOARD}/${item.id}`}
            >
              {item.title}
            </Link>
            <button
              className={classes.action}
              onClick={() => onDeleteProject(item.id)}
            >
              <X size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
