import React from 'react';

import { Task } from '../../redux/types/task.types';

import classes from './TaskItem.module.scss';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className={classes.card}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Создано: {task.createdAt}</small>
      <small>Время в работе: {task.timeInWork}</small>
      <small>Приоритет: {task.priority}</small>
      <small>Статус: {task.status}</small>
    </div>
  );
};
