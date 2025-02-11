import {
  TaskState,
  TaskActions,
  ADD_TASK,
  ADD_SUBTASK,
  UPDATE_TASK,
  DELETE_TASK,
  MOVE_TASK,
} from '../types/task.types';

const initialState: TaskState = {
  tasks: {},
};

export const taskReducer = (
  state = initialState,
  action: TaskActions
): TaskState => {
  switch (action.type) {
    case ADD_TASK: {
      const { projectId, task } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: [...(state.tasks[projectId] || []), task],
        },
      };
    }

    case MOVE_TASK: {
      const { projectId, taskId, newStatus } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        },
      };
    }

    case UPDATE_TASK: {
      const { projectId, taskId, updatedTask } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          ),
        },
      };
    }

    case DELETE_TASK: {
      const { projectId, taskId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].filter(
            (task) => task.id !== taskId
          ),
        },
      };
    }

    case ADD_SUBTASK: {
      const { projectId, parentTaskId, subtask } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].map((task) =>
            task.id === parentTaskId
              ? { ...task, subtasks: [...task.subtasks, subtask] }
              : task
          ),
        },
      };
    }

    default:
      return state;
  }
};
