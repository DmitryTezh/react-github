import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GitRepo, GitState } from '../model';

const initialState: GitState = {
    repos: {
        presentation: {
            busy: false,
        },
        pagination: {
            current: undefined,
            last: undefined,
        },
        data: {},
        pages: {},
    },
};

export const gitSlice = createSlice({
    name: 'git',
    initialState,
    reducers: {
        setRepoBusy: (state: GitState, action: PayloadAction<boolean>) => {
            state.repos.presentation.busy = action.payload;
        },
        setPrevRepoPage: (state: GitState) => {
            const pagination = state.repos.pagination;
            if (pagination.last == null) {
                pagination.current = undefined;
                return;
            }
            if (pagination.current == null) {
                pagination.current = 1;
                return;
            }
            if (pagination.current > 1) {
                pagination.current--;
            }
        },
        setNextRepoPage: (state: GitState) => {
            const { pagination } = state.repos;
            if (pagination.last == null) {
                pagination.current = undefined;
                return;
            }
            if (pagination.current == null) {
                pagination.current = 1;
                return;
            }
            if (pagination.current < pagination.last) {
                pagination.current++;
            }
        },
        addRepoPage: (state: GitState, action: PayloadAction<GitRepo[]>) => {
            const ids: number[] = [];
            for (const repo of action.payload) {
                state.repos.data[repo.id] = repo;
                ids.push(repo.id);
            }
            const { pagination } = state.repos;
            pagination.last = (pagination.last ?? 0) + 1;
            state.repos.pages[pagination.last] = { ids };
        },
    },
});