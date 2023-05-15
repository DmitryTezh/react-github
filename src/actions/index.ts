import { gitSlice, ownSlice } from '../reducer';
import { requestGitRepos } from './thunkActions';

export const actions = {
    ...ownSlice.actions,
    ...gitSlice.actions,
    requestGitRepos,
};

export type AppActions = typeof actions;