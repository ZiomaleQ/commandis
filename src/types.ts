export interface Command {
    name: string;
    run: Function;
    description: string;
    category: string
}

export interface CommandisOptions {
    autogenHelp?: boolean;
    commandDir?: string;
    readCommands?: boolean;
    eventsDir?: string;
    readEvents?: boolean;
    token?: string;
    intents?: number[];
    prefix?: string;
    debug?: boolean;
    hotreload?: boolean;
}

export interface Event {
    name: string;
    run: Function;
} 