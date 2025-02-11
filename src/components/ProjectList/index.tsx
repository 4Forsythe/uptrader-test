import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants';
import { Project } from '../../redux/types/project.types';

import classes from './ProjectList.module.scss';

interface ProjectListProps {
  items: Project[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  items,
  onAdd,
  onDelete,
}) => {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.title}>Проекты - {items.length}</h1>
        <button onClick={onAdd}>Создать новый проект</button>
      </header>

      <ul className={classes.list}>
        {items.map((item) => (
          <li className={classes.listItem} key={item.id}>
            <Link
              className={classes.card}
              to={`${ROUTES.DASHBOARD}/${item.id}`}
            >
              {item.title}
            </Link>
            <button
              className={classes.remove}
              onClick={() => onDelete(item.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
