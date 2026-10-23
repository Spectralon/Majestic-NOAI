import {ICommand} from "./commands/ICommand";

export interface ICommandService {
    execute<T>(args: Record<string, unknown>): Promise<T>;
}

export class CommandService implements ICommandService {
    private _commands: ICommand<any>[] = [];

    initialize(commands: ICommand<any>[]): void {
        this._commands = commands;
    }

    async execute<T>(args: Record<string, unknown>): Promise<T> {
        let type: string = args.type as string;
        return this._commands.find(e => e.type === type)?.execute(args);
    }
}