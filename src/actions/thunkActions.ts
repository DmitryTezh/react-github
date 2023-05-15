import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from '../core/store';
import type { AppState, GitRepo } from '../model';
import type { Environment } from '../core';
import { gitSlice } from '../reducer';

const gitActions = gitSlice.actions;

interface ThunkActionConfig {
    dispatch: AppDispatch;
    state: AppState;
    extra: Environment;
}

export const requestGitRepos = createAsyncThunk<void, undefined, ThunkActionConfig>(
    'gitRepos/fetch',
    async (_, { dispatch, getState, extra }) => {
        const state = getState();
        if (state.git.repos.presentation.busy) {
            console.warn('Git repos loading in progress');
            return;
        }
        const last = state.git.repos.pagination.last;
        const ids = last != null ? state.git.repos.pages[last]?.ids : undefined;
        const from = ids?.[ids.length - 1];
        dispatch(gitActions.setRepoBusy(true));
        try {
            const { data } = await extra.remoteApi.rest.repos.listPublic({ since: from });
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
            dispatch(gitActions.addRepoPage(repos));
        } catch (e) {
            console.warn(e);
        } finally {
            dispatch(gitActions.setRepoBusy(false));
        }
    },
);