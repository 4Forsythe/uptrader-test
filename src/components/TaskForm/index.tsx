import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';

import { useModal } from '../../hooks';
import {
  addTask,
  deleteTask,
  updateTask,
} from '../../redux/actions/task.actions';
import {
  Task,
  TaskPriorities,
  TaskStatuses,
} from '../../redux/types/task.types';

import 'react-datepicker/dist/react-datepicker.css';

import classes from './TaskForm.module.scss';

interface TaskFormProps {
  projectId: string;
  task?: Task;
}

export const TaskForm: React.FC<TaskFormProps> = ({ projectId, task }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [deadline, setDeadline] = React.useState<Date | null>(new Date());
  const [priority, setPriority] = React.useState(TaskPriorities.LOW);
  const [status, setStatus] = React.useState(TaskStatuses.QUEUE);

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const isValid = title && description && deadline && priority && status;

  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const onSaveTask = () => {
    if (isValid) {
      if (task) {
        dispatch(
          updateTask(projectId, task.id, {
            id: Date.now().toString(),
            title,
            description,
            priority,
            status,
            createdAt: new Date().toISOString(),
            deadline: deadline.toISOString(),
            subtasks: [],
            comments: [],
          })
        );
      } else {
        dispatch(
          addTask(projectId, {
            id: Date.now().toString(),
            title,
            description,
            priority,
            status,
            createdAt: new Date().toISOString(),
            deadline: deadline.toISOString(),
            subtasks: [],
            comments: [],
          })
        );
      }

      closeModal();
    }
  };

  const onDeleteTask = () => {
    if (task) {
      dispatch(deleteTask(projectId, task.id));

      closeModal();
    }
  };

  return (
    <div className={classes.container}>
      <h5 className={classes.title}>
        {task ? 'Редактировать задачу' : 'Создать новую задачу'}
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

        <div className={classes.column}>
          <label htmlFor='description'>Описание</label>
          <textarea
            id='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div className={classes.column}>
          <label htmlFor='status'>Состояние</label>
          <select
            id='status'
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskStatuses)}
          >
            {Object.values(TaskStatuses).map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {status !== TaskStatuses.DONE && (
          <div className={classes.column}>
            <label htmlFor='deadline'>Дедлайн</label>
            <DatePicker
              id='deadline'
              wrapperClassName={classes.datepicker}
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              dateFormat='dd/MM/yyyy'
            />
          </div>
        )}

        <div className={classes.column}>
          <label htmlFor='priority'>Приоритет</label>
          <select
            id='priority'
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TaskPriorities)
            }
          >
            {Object.values(TaskPriorities).map((priority) => (
              <option value={priority} key={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={classes.buttons}>
        <button
          className={cn(classes.formButton, classes.submit)}
          onClick={onSaveTask}
          disabled={!isValid}
        >
          Сохранить
        </button>

        {task && (
          <button
            className={cn(classes.formButton, classes.decline)}
            onClick={onDeleteTask}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};
