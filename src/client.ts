import { Client as Corddis, EventEmitter, Intents, Message, to } from "../deps.ts";
import { Iterator } from "./iterator.ts";
import { StringReader } from "./stringReader.ts";
import { CommandContext } from './CommandContext.ts';
import {
  Command,
  CommandisOptions,
  Event,
  EventsNames
} from "./types.ts";
import { helpCommand, checkCommandRestrictions, parseCommandArgs } from "./utils.ts";

export class Client extends Corddis {
  options: CommandisOptions;
  commands: Command[] = [];
  local_events: Event[] = [];
  directCommands: Command[] = [];
  hr: Iterator = new Iterator();
  channel: EventEmitter = new EventEmitter()

  constructor(options: CommandisOptions = {}, commands: Command[] = [], events: Event[] = []) {
    super(options.token);
    this.options = this._makeOptions(options);
    this.addIntents(...(this.options.intents ?? []));
    this.commands = commands;
    this.local_events = events;
  }

  private _makeOptions(options: CommandisOptions): CommandisOptions {
    return {
      autogenHelp: options.autogenHelp ?? true,
      helpMention: options.helpMention ?? true,
      commandDir: options.commandDir ?? Deno.cwd() + "/commands",
      readCommands: options.readCommands ?? true,
      eventsDir: options.eventsDir ?? Deno.cwd() + "/events",
      readEvents: options.readEvents ?? true,
      intents: options.intents ??
        [Intents.GUILD_MESSAGES, Intents.DIRECT_MESSAGES],
      prefix: options.prefix ?? "bot!",
      debug: options.debug ?? false,
      hotreload: options.hotreload ?? false,
    };
  }
  /** Login to and set up discord client */
  async login(token: string = this.options.token ?? ""): Promise<boolean> {
    if (!super.token) super.token = (this.options.token = token);
    if (this.options.readCommands) {
      [...Deno.readDirSync(this.options.commandDir ?? Deno.cwd())]
        .filter((it) => it.isFile && it.name.endsWith(".ts"))
        .map((it) => import(`file://${this.options.commandDir}/${it.name}`))
        .forEach(async (it) => {
          const command = (await it).default as Command
          this.commands.push((await it).default as Command)
          command.allowDirect && this.directCommands.push(command)
        });
    }

    this.options.autogenHelp && this.commands.push(helpCommand as Command)

    if (this.options.hotreload) {
      this.hr.iterate(Deno.watchFs(this.options.commandDir ?? Deno.cwd()));
      this.hr.on(
        "modify",
        (x: string[]) =>
          x.forEach(async (y) => await this._modifyCommand.call(this, y)),
      );
    }

    if (this.options.readEvents) {
      let eventDir = this.options.eventsDir ?? Deno.cwd();
      for (const entry of Deno.readDirSync(eventDir)) {
        if (!entry.isFile && !entry.name.endsWith(".ts")) continue;
        let event = await import(`file://${eventDir}/${entry.name}`).then((it) => it.default as Event);
        this.events.$attach(to(event.name), event.run.bind(null, this));
      }
    }

    this.events.$attachPrepend(to("MESSAGE_CREATE"), async (msg: Message) => {
      const prefix = this.options.prefix ?? "";
      let interpreter: StringReader, command: Command | undefined, commandName: string

      //If ping execute help command
      if (!msg.data.mention_everyone && msg.data.content.includes(`<@!${this.user?.data.id}>`) && this.options.helpMention) {
        //User can make help command by themselves, just to catch that command too~
        command = this.commands.find((cmd) => cmd.name == "help")
      }

      if (msg.data.content.startsWith(prefix)) {
        interpreter = new StringReader(msg.data.content, prefix.length);
        commandName = interpreter.readWord() ?? "help";
        command = this.commands.find((cmd) => cmd.name == commandName);

        let helpWord = interpreter.readWord();

        //Help for desired command
        if (helpWord == "help" && command?.help) return typeof command.help === "string" ? msg.reply(command.help) : msg.reply(command.help);
        if (helpWord?.length) interpreter.moveByInt(-helpWord.length);

      } else {
        interpreter = new StringReader(msg.data.content);
        const commandName = interpreter.readWord()
        if (!command) command = commandName ? this.directCommands.find(command => command.name === commandName) : undefined
      }

      //Command matched
      if (command) {
        const canExec = command.restrictions ? await checkCommandRestrictions(command, msg) : true
        if (canExec)
          command.run.call(null, this, new CommandContext(msg, this, command, await parseCommandArgs(command, msg, interpreter)))
        else return
      }
    });
    if (this.options.debug) this.events.$attach(to("DEBUG"), console.log);
    return await super.login(token);
  }

  /** Wait for a certain event */
  async waitFor(eventName: EventsNames): Promise<any> {
    return await new Promise((resolve) => {
      this.events.$attachOnce(to(eventName), resolve);
    });
  }

  private async _modifyCommand(path: string) {
    if (!this.options.readCommands) throw "Commands are not red";
    if (!path.endsWith(".ts")) return;
    var random = Math.random().toString(36).substring(2).toString();
    let command = (await import(`file://${path}#${random}`)).default as Command;
    var index = this.commands.findIndex((it) => it.name == command?.name);
    if (index < 0 && !command) return;

    var text = "Added";

    if (index < 0) this.commands.push(command);
    else {
      text = "Hotreloaded";
      this.commands[index] = command;
    }

    this.events.post(["DEBUG", `${text} command, ${command.name}`]);
  }
}
