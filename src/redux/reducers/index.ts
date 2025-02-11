import { combineReducers } from 'redux';

import { taskReducer } from './task.reducer';
import { projectsReducer } from './project.reducer';

export const rootReducer = combineReducers({
  tasks: taskReducer,
  projects: projectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
