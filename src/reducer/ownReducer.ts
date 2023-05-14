import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppOwnState, Theme } from '../model';

const initialState: AppOwnState = {
    layout: {
        theme: 'light',
    },
};

export const ownSlice = createSlice({
    name: 'own',
    initialState,
    reducers: {
        setTheme: (state: AppOwnState, action: PayloadAction<Theme>) => {
            state.layout.theme = action.payload;
        },
    },
});
