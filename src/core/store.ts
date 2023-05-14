import { configureStore } from '@reduxjs/toolkit';
import { ownSlice, gitSlice } from '../reducer';

export const store = configureStore({
    reducer: {
        own: ownSlice.reducer,
        git: gitSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
