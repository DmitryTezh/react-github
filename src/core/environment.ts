import { Octokit } from 'octokit';

export interface Environment {
    remoteApi: InstanceType<typeof Octokit>;
}

export const createEnvironment = (): Environment => ({
    remoteApi: new Octokit({}),
});