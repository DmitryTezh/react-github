import { Octokit } from 'octokit';
import { once } from '../utils';

export interface Environment {
    remoteApi: InstanceType<typeof Octokit>;
}

const createRemoteApi = once(() => new Octokit({}));

export const createEnvironment = (): Environment => ({
    remoteApi: createRemoteApi(),
});