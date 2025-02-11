import {
  ProjectsState,
  ProjectActionTypes,
  ADD_PROJECT,
  DELETE_PROJECT,
} from '../types/project.types';

const initialState: ProjectsState = {
  projects: JSON.parse(localStorage.getItem('projects') || '[]'),
};

export const projectsReducer = (
  state = initialState,
  action: ProjectActionTypes
): ProjectsState => {
  let newState: ProjectsState;

  switch (action.type) {
    case ADD_PROJECT:
      newState = { projects: [...state.projects, action.payload] };
      break;

    case DELETE_PROJECT:
      newState = {
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
      break;

    default:
      return state;
  }

  localStorage.setItem('projects', JSON.stringify(newState.projects));

  return newState;
};
