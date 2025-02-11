export enum TaskStatuses {
  QUEUE = 'Queue',
  DEVELOPMENT = 'Development',
  DONE = 'Done',
}

export enum TaskPriorities {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  createdAt: string;
  timeInWork?: number;
  completedAt?: string;
  files?: string[];
  subtasks: Task[] | [];
  comments: Comment[] | [];
}

export interface TaskState {
  tasks: {
    [projectId: string]: Task[];
  };
}

export const ADD_TASK = 'ADD_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const ADD_SUBTASK = 'ADD_SUBTASK';

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: { projectId: string; task: Task };
}

interface MoveTaskAction {
  type: typeof MOVE_TASK;
  payload: { projectId: string; taskId: string; newStatus: TaskStatuses };
}

interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: { projectId: string; taskId: string; updatedTask: Partial<Task> };
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: { projectId: string; taskId: string };
}

interface AddSubtaskAction {
  type: typeof ADD_SUBTASK;
  payload: { projectId: string; parentTaskId: string; subtask: Task };
}

export type TaskActions =
  | AddTaskAction
  | MoveTaskAction
  | UpdateTaskAction
  | DeleteTaskAction
  | AddSubtaskAction;
