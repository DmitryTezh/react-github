import { Octokit } from 'octokit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from './store';
import type { AppState, GitRepo } from '../model';
import { gitSlice } from '../reducer';
import { once } from '../utils';

const octokit = once(() => new Octokit({}));
const gitActions = gitSlice.actions;

interface ThunkActionRequest {
    page: number;
}

interface ThunkActionConfig {
    dispatch: AppDispatch;
    state: AppState;
}

export const requestGitRepos = createAsyncThunk<void, ThunkActionRequest, ThunkActionConfig>(
    'gitRepos/fetch',
    async ({ page }, { dispatch, getState }) => {
        const state = getState();
        const lastIds = state.git.repos.pages[page - 1]?.ids;
        if (page !== 1 && lastIds == null) {
            console.warn('Invalid page number %s', page);
            return;
        }
        const from = lastIds?.[lastIds.length - 1];
        dispatch(gitActions.setRepoBusy(true));
        try {
            const { data } = await octokit().rest.repos.listPublic({ since: from });
            const repos: GitRepo[] = data.map(x => ({
                id: x.id,
                name: x.name,
                fullName: x.full_name,
                description: x.description ?? undefined,
                url: x.url,
                owner: {
                    id: x.owner.id,
                    name: x.owner.name ?? undefined,
                    login: x.owner.login,
                    url: x.owner.url,
                    avatar: x.owner.avatar_url,
                },
            }));
            dispatch(gitActions.addRepoPage({ page, repos }));
        } catch (e) {
            console.warn(e);
        } finally {
            dispatch(gitActions.setRepoBusy(false));
        }
    },
);