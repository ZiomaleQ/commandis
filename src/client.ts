import { Client as Corddis, Intents, Message, User } from "../deps.ts";
import { StringReader } from "./stringReader.ts";
import { Command, CommandisOptions, Event } from "./types.ts";

export class Client extends Corddis {
    commands: Command[] = [];
    local_events: Event[] = [];
    options: CommandisOptions;
    constructor(options: CommandisOptions = {}, commands: Command[] = [], events: Event[] = []) {
        super(options.token)
        this.options = this.makeOptions(options)
        this.addIntents(...(this.options.intents ?? []))
        this.commands = commands;
        this.local_events = events;
    }

    makeOptions(options: CommandisOptions): CommandisOptions {
        return {
            autogenHelp: options.autogenHelp ?? true,
            commandDir: options.commandDir ?? Deno.cwd() + "/commands",
            readCommands: options.readCommands ?? true,
            eventsDir: options.eventsDir ?? Deno.cwd() + "/events",
            readEvents: options.readEvents ?? true,
            intents: options.intents ?? [Intents.GUILD_MESSAGES, Intents.DIRECT_MESSAGES],
            prefix: options.prefix ?? "!",
            debug: options.debug || false
        }
    }

    async login(token: string = this.options.token ?? ""): Promise<boolean> {
        if (this.options.readCommands) {
            [...Deno.readDirSync(this.options.commandDir ?? Deno.cwd())]
                .filter(it => it.isFile && it.name.endsWith(".ts"))
                .map(async it => import(`${this.options.commandDir}/${it.name}`))
                .forEach(async it => this.commands.push((await it).default as Command));
        }

        if (this.options.readEvents) {
            let eventDir = this.options.eventsDir ?? Deno.cwd()
            for (const entry of Deno.readDirSync(eventDir)) {
                if (!entry.isFile && entry.name.endsWith(".ts")) continue;
                let event = await import(`${eventDir}/${entry.name}`).then(it => it.default as Event)
                this.on(event.name, event.run.bind(null, this))
            }
        }

        this.on("MESSAGE_CREATE", async (msg: Message) => {
            var prefix = this.options.prefix ?? ""
            if (msg.data.content.startsWith(prefix)) {
                let interpreter = new StringReader(msg.data.content.substring(prefix.length));
                let command = interpreter.readWord()
                this.commands.find(cmd => cmd.name == command)?.run.call(null, this, msg)
            }
        })
        if (this.options.debug) this.on("debug", console.log)
        return await super.login(token)
    }
}