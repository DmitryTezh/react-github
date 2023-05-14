import type { Collection } from './collection';
import type { GitRepo } from './gitTypes';

export interface GitState {
    repos: Collection<GitRepo>;
}