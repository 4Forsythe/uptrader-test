import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import {
  Task,
  TaskPriorities,
  TaskStatuses,
} from '../../redux/types/task.types';

import { addTask } from '../../redux/actions/task.actions';

interface TaskModalProps {
  projectId: string;
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  projectId,
  task,
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState(TaskPriorities.LOW);
  const [status, setStatus] = React.useState(TaskStatuses.QUEUE);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      addTask(projectId, {
        id: Date.now().toString(),
        title,
        description,
        priority,
        status,
        createdAt: new Date().toISOString(),
        subtasks: [],
        comments: [],
      })
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{task ? 'Редактировать задачу' : 'Создать новую задачу'}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='title'>Название</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='description'>Описание</label>
          <textarea
            id='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='priority'>Приоритет</label>
          <select
            id='priority'
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TaskPriorities)
            }
          >
            <option value={TaskPriorities.LOW}>Низкий</option>
            <option value={TaskPriorities.MEDIUM}>Средний</option>
            <option value={TaskPriorities.HIGH}>Высокий</option>
          </select>
        </div>
        <div>
          <label htmlFor='status'>Статус</label>
          <select
            id='status'
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskStatuses)}
          >
            <option value={TaskStatuses.QUEUE}>Очередь</option>
            <option value={TaskStatuses.DEVELOPMENT}>Разработка</option>
            <option value={TaskStatuses.DONE}>Готово</option>
          </select>
        </div>
        <div>
          <button type='submit'>Сохранить</button>
        </div>
      </form>
    </Modal>
  );
};
