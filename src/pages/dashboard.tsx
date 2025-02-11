import React from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { TaskList } from '../components';

import { RootState } from '../redux/reducers';
import { TaskStatuses } from '../redux/types/task.types';
import { moveTask } from '../redux/actions/task.actions';

export const Dashboard: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const project = projects.find((project) => project.id === projectId);

  const tasks = useSelector((state: RootState) =>
    projectId ? state.tasks.tasks[projectId] || [] : []
  );

  if (!projectId || !project) {
    return <span>Проект не найден</span>;
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const id = result.draggableId;
    const status = result.destination.droppableId as TaskStatuses;

    dispatch(moveTask(projectId, id, status));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id='dashboard'>
        <TaskList projectId={projectId} tasks={tasks} />
      </div>
    </DragDropContext>
  );
};
