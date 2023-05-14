import type { AppOwnState } from './ownState';
import type { GitState } from './gitState';

export * from './ownState';
export * from './gitState';
export * from './gitTypes';

export interface AppState {
    own: AppOwnState;
    git: GitState;
}