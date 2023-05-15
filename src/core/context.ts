import { createContext, useContext } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { bindActionCreators, Store } from '@reduxjs/toolkit';

import { actions, AppActions } from '../actions';
import type { AppDispatch } from './store';
import type { AppState } from '../model';
import { raise } from '../utils';

export interface AppContextData {
    actions: AppActions;
    getState: () => AppState;
}

const appContextStub = new Proxy<AppContextData>({} as any, {
    get(target, key): any {
        raise('Context is not initialized');
    },
});

export const AppContext = createContext(appContextStub);

export const createAppContextData = (store: Store<AppState>): AppContextData => {
    return {
        actions: bindActionCreators(actions, store.dispatch),
        getState: store.getState,
    };
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppContext = () => useContext(AppContext);