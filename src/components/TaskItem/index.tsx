import React from 'react';
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';

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

  const getDateDifference = (start: Date, end: Date) => {
    const days = differenceInCalendarDays(end, start);
    const hours = differenceInHours(end, start);
    const minutes = differenceInMinutes(end, start);

    if (days) return `${days} дн`;
    if (!days && hours) return `${hours} ч`;
    if (!hours && minutes) return `${minutes} мин`;
    if (!minutes) return 'Только что';
  };

  return (
    <div className={classes.card} onClick={() => onSelect(task)}>
      <span className={classes.index}>№ {task.id}</span>
      <h2 className={classes.title}>{task.title}</h2>
      <p className={classes.description}>{task.description}</p>
      <small className={classes.tag}>
        Создано: {formatDate(new Date(task.createdAt))}
      </small>
      <small className={classes.tag}>
        Дедлайн: {formatDate(new Date(task.deadline))}
      </small>
      <small className={classes.tag}>
        В работе: {getDateDifference(new Date(task.createdAt), new Date())}
      </small>
      <small className={classes.tag}>Приоритет: {task.priority}</small>
    </div>
  );
};
