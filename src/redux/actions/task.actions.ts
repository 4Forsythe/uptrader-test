import {
  Task,
  ADD_TASK,
  ADD_SUBTASK,
  UPDATE_TASK,
  DELETE_TASK,
  MOVE_TASK,
} from '../types/task.types';

export const addTask = (projectId: string, task: Task) => ({
  type: ADD_TASK,
  payload: { projectId, task },
});

export const moveTask = (
  projectId: string,
  taskId: string,
  newStatus: string
) => ({
  type: MOVE_TASK,
  payload: { projectId, taskId, newStatus },
});

export const updateTask = (
  projectId: string,
  taskId: string,
  updatedTask: Partial<Task>
) => ({
  type: UPDATE_TASK,
  payload: { projectId, taskId, updatedTask },
});

export const deleteTask = (projectId: string, taskId: string) => ({
  type: DELETE_TASK,
  payload: { projectId, taskId },
});

export const addSubtask = (
  projectId: string,
  taskId: string,
  subtask: Task
) => ({
  type: ADD_SUBTASK,
  payload: { projectId, taskId, subtask },
});
