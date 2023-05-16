import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { App } from './app';
import { AppContext, createAppContextData } from '../core';
import { createStore } from '../core';

export const Root = () => {
    const store = useMemo(createStore, []);
    const context = useMemo(() => createAppContextData(store), [store]);

    return (
        <Provider store={store}>
            <AppContext.Provider value={context}>
                <App/>
            </AppContext.Provider>
        </Provider>
    );
};