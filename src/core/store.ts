import { configureStore } from '@reduxjs/toolkit';
import { createEnvironment } from './environment';
import { ownSlice, gitSlice } from '../reducer';

export const store = configureStore({
    reducer: {
        own: ownSlice.reducer,
        git: gitSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    ...createEnvironment(),
                },
            },
        }),
});

export type AppDispatch = typeof store.dispatch;
