export type Theme = 'dark' | 'light';

export interface Layout {
    theme: Theme;
}

export interface AppOwnState {
    layout: Layout;
}