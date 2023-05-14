export const raise = (error: string): never => {
    throw new Error(error);
};

export const invariant = (condition: boolean, error?: string) => {
    if (condition) {
        return;
    }
    raise(error ?? 'Invariant broken');
};