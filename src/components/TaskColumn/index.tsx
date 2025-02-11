import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { TaskItem } from '../TaskItem';
import { Task } from '../../redux/types/task.types';

import classes from './TaskColumn.module.scss';

interface TaskColumnProps {
  tasks: Task[];
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ tasks }) => {
  return (
    <div className={classes.wrapper}>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              className={classes.item}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskItem task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};
