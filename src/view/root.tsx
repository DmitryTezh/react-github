import { useState } from 'react';
import { Provider } from 'react-redux';
import { App } from './app';
import { AppContext, createAppContextData } from '../core';
import { store } from '../core';

export const Root = () => {
    const [context] = useState(() => createAppContextData(store));
    return (
        <Provider store={store}>
            <AppContext.Provider value={context}>
                <App/>
            </AppContext.Provider>
        </Provider>
    );
};