import {
  Project,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from '../types/project.types';

export const addProject = (project: Project) => ({
  type: ADD_PROJECT,
  payload: project,
});

export const updateProject = (projectId: string, updatedProject: Project) => ({
  type: UPDATE_PROJECT,
  payload: { projectId, updatedProject },
});

export const deleteProject = (id: string) => ({
  type: DELETE_PROJECT,
  payload: id,
});
