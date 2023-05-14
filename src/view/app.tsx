import React, { useEffect } from 'react';
import logo from '../logo.svg';
import { useAppContext } from '../core';
import './app.css';
import 'bootstrap/dist/css/bootstrap.css';

export const App = () => {
    const { actions } = useAppContext();
    useEffect(() => {
        const fetch = async () => {
            await actions.requestGitRepos({ page: 1 });
            await actions.requestGitRepos({ page: 2 });
        };
        fetch();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
};

