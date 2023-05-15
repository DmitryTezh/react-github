import { configureStore } from '@reduxjs/toolkit';
import { createEnvironment } from './environment';
import { ownSlice, gitSlice } from '../reducer';
import { once } from '../utils';

export const createStore = once(() => configureStore({
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
}));

type Store = ReturnType<typeof createStore>;
export type AppDispatch = Store["dispatch"];
