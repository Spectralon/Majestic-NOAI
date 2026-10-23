export interface ICommand<T> {
    readonly type: string;

    execute(args: Record<string, unknown>): Promise<T>;
}

