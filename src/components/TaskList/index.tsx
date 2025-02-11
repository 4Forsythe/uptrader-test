import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Task, TaskStatuses } from '../../redux/types/task.types';

import classes from './TaskList.module.scss';
import { TaskColumn } from '../TaskColumn';
import { TaskModal } from '../TaskForm';

interface TaskListProps {
  projectId: string;
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ projectId, tasks }) => {
  const [isModal, setIsModal] = React.useState(false);
  const [targetTask, setTargetTask] = React.useState<Task | null>(null);

  const createTask = (task: Task | null = null) => {
    setTargetTask(task);
    setIsModal(true);
  };

  const onCloseModal = () => {
    setIsModal(false);
    setTargetTask(null);
  };

  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <h1 className={classes.title}>Задачи - {tasks.length}</h1>
        <button onClick={() => createTask()}>Создать новую задачу</button>
      </header>

      <div className={classes.list}>
        {Object.values(TaskStatuses).map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                className={classes.column}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className={classes.columnTitle}>{status.toUpperCase()}</h2>
                <TaskColumn
                  tasks={tasks.filter((task) => task.status === status)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>

      <TaskModal
        isOpen={isModal}
        projectId={projectId}
        task={targetTask}
        onClose={onCloseModal}
      />
    </div>
  );
};
