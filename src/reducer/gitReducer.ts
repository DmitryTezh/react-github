import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GitRepo, GitState } from '../model';

const initialState: GitState = {
    repos: {
        presentation: {
            busy: false,
            page: undefined,
        },
        data: {},
        pages: {},
    },
};

export interface GitRepoPagePayload {
    page: number;
    repos: GitRepo[];
}

export const gitSlice = createSlice({
    name: 'git',
    initialState,
    reducers: {
        setRepoBusy: (state: GitState, action: PayloadAction<boolean>) => {
            state.repos.presentation.busy = action.payload;
        },
        setRepoPage: (state: GitState, action: PayloadAction<number>) => {
            state.repos.presentation.page = action.payload;
        },
        addRepoPage: (state: GitState, action: PayloadAction<GitRepoPagePayload>) => {
            const { page, repos } = action.payload;
            const ids: number[] = [];
            for (const repo of repos) {
                state.repos.data[repo.id] = repo;
                ids.push(repo.id);
            }
            state.repos.pages[page] = { ids };
        },
    },
});