export interface GitOwner {
    id: number;
    name?: string;
    login: string;
    url: string;
    avatar: string;
}

export interface GitRepo {
    id: number;
    name: string;
    fullName: string;
    description?: string;
    url: string;
    owner: GitOwner;
}