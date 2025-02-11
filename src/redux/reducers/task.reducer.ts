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
  tasks: JSON.parse(localStorage.getItem('tasks') || '{}'),
};

export const taskReducer = (
  state = initialState,
  action: TaskActions
): TaskState => {
  let newState: TaskState;

  switch (action.type) {
    case ADD_TASK: {
      const { projectId, task } = action.payload;
      newState = {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: [...(state.tasks[projectId] || []), task],
        },
      };
      break;
    }

    case MOVE_TASK: {
      const { projectId, taskId, newStatus } = action.payload;
      newState = {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        },
      };
      break;
    }

    case UPDATE_TASK: {
      const { projectId, taskId, updatedTask } = action.payload;
      newState = {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          ),
        },
      };
      break;
    }

    case DELETE_TASK: {
      const { projectId, taskId } = action.payload;
      newState = {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].filter(
            (task) => task.id !== taskId
          ),
        },
      };
      break;
    }

    case ADD_SUBTASK: {
      const { projectId, parentTaskId, subtask } = action.payload;
      newState = {
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
      break;
    }

    default:
      return state;
  }

  localStorage.setItem('tasks', JSON.stringify(newState.tasks));

  return newState;
};
