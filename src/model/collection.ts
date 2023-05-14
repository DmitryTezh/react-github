export type HasId = {
    id: number;
}

export interface Collection<T extends HasId> {
    presentation: {
        busy: boolean,
        page: number | undefined,
    },
    data: {
        [id: number]: T,
    },
    pages: {
        [page: number]: {
            ids: number[],
        },
    },
}