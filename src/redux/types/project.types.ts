export interface Project {
  id: string;
  title: string;
}

export interface ProjectsState {
  projects: Project[];
}

export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

interface AddProjectAction {
  type: typeof ADD_PROJECT;
  payload: Project;
}

interface UpdateProjectAction {
  type: typeof UPDATE_PROJECT;
  payload: { projectId: string; updatedProject: Partial<Project> };
}

interface DeleteProjectAction {
  type: typeof DELETE_PROJECT;
  payload: string; // id проекта
}

export type ProjectActionTypes =
  | AddProjectAction
  | UpdateProjectAction
  | DeleteProjectAction;
