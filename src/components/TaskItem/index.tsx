import React from 'react';

import { Task } from '../../redux/types/task.types';

import classes from './TaskItem.module.scss';

interface TaskItemProps {
  task: Task;
  onSelect: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onSelect }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={classes.card} onClick={() => onSelect(task)}>
      <span className={classes.index}>№ {task.id}</span>
      <h2 className={classes.title}>{task.title}</h2>
      <p className={classes.description}>{task.description}</p>
      <small className={classes.tag}>
        Создано: {formatDate(new Date(task.createdAt))}
      </small>
      <small className={classes.tag}>В работе: {task.timeInWork}</small>
      <small className={classes.tag}>Приоритет: {task.priority}</small>
    </div>
  );
};
