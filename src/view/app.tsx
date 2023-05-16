import React, { useEffect, useMemo } from 'react';
import { createStructuredSelector, Selector } from 'reselect';
import { useAppContext, useAppSelector } from '../core';
import type { AppState, GitRepo } from '../model';
import { Container, Row, Col, Table, Spinner } from 'reactstrap';

import './app.css';
import 'bootstrap/dist/css/bootstrap.css';

type AppProps = {
    busy: boolean,
    page: number | undefined,
    repos: GitRepo[],
};

const busy = (state: AppState) => state.git.repos.presentation.busy;
const page = (state: AppState) => state.git.repos.pagination.current;
const repos = (state: AppState) => Object.values(state.git.repos.data);

const createPropsSelector = (): Selector<AppState, AppProps> => {
    return createStructuredSelector({
        busy,
        page,
        repos,
    });
};

export const App = () => {
    const { actions } = useAppContext();
    const { busy, repos } = useAppSelector(useMemo(createPropsSelector, []));

    useEffect(() => {
        actions.requestGitRepos();
    }, [actions]);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Table hover striped bordered>
                        <thead className="table-header">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            repos.map(repo => (
                                <tr key={repo.id}>
                                    <th>{repo.id}</th>
                                    <td>
                                        <a target="_blank" href={repo.url}>{repo.fullName}</a>
                                    </td>
                                    <td>{repo.description}</td>
                                    <td>
                                        <a target="_blank" href={repo.owner.url} title={repo.owner.name ?? repo.owner.login}>
                                            <img className="avatar" src={repo.owner.avatar} alt=""/>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    {
                        busy &&
                        <div className="d-flex justify-content-center">
                            <Spinner type="border" color="primary" />
                        </div>
                    }
                </Col>
            </Row>
        </Container>
    );
};