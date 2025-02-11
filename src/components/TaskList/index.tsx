import React from 'react';
import cn from 'classnames';
import { Droppable } from 'react-beautiful-dnd';

import { Task, TaskStatuses } from '../../redux/types/task.types';

import { useModal } from '../../hooks';
import { TaskColumn, TaskForm } from '../../components';

import classes from './TaskList.module.scss';

interface TaskListProps {
  projectId: string;
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ projectId, tasks }) => {
  const { openModal } = useModal();

  const onSelectTask = (task: Task) => {
    openModal(<TaskForm projectId={projectId} task={task} />);
  };

  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <h1 className={classes.title}>Задачи - {tasks.length}</h1>
        <button
          className={classes.button}
          onClick={() => openModal(<TaskForm projectId={projectId} />)}
        >
          Создать новую задачу
        </button>
      </header>

      <div className={classes.list}>
        {Object.values(TaskStatuses).map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                className={cn(classes.column, {
                  [classes.queue]: status === TaskStatuses.QUEUE,
                  [classes.development]: status === TaskStatuses.DEVELOPMENT,
                  [classes.done]: status === TaskStatuses.DONE,
                })}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className={classes.columnTitle}>{status.toUpperCase()}</h2>
                <TaskColumn
                  tasks={tasks.filter((task) => task.status === status)}
                  onSelectTask={onSelectTask}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};
