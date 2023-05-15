import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators, Store } from '@reduxjs/toolkit';

import { actions, AppActions } from '../actions';
import type { AppDispatch } from './store';
import type { AppState } from '../model';
import { raise } from '../utils';

export interface AppContextData {
    actions: AppActions;
    getState: () => AppState;
}

const appContextStub: AppContextData = new Proxy<AppContextData>({} as any, {
    get(target: AppContextData, key: string | symbol): any {
        raise('Context is not initialized');
    },
});

export const AppContext = createContext<AppContextData>(appContextStub);

export const createAppContextData = (store: Store<AppState>): AppContextData => {
    return {
        actions: bindActionCreators(actions, store.dispatch),
        getState: store.getState,
    };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppContext = () => useContext<AppContextData>(AppContext);