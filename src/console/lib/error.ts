export interface ICommand {
    print(block: string): void;
}

export class CommandError extends Error {
    command: ICommand;

    constructor(command: ICommand, message: string) {
        super();
        this.message = `CommandError: ${message}`;
        this.command = command;

        this.stack = (new Error(this.message)).stack;
    }
}