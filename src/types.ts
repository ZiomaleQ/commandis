import { PermissionEnum } from "../deps.ts";

export interface Command {
  name: string;
  run: Function;
  category: string;
  permissions?: PermissionEnum[];
  description: string;
  hidden?: boolean;
  aliases?: string[];
}

export interface CommandisOptions {
  autogenHelp?: boolean;
  helpMention?: boolean;
  commandDir?: string;
  readCommands?: boolean;
  eventsDir?: string;
  readEvents?: boolean;
  token?: string;
  intents?: number[];
  prefix?: string;
  debug?: boolean;
  hotreload?: boolean;
  language?: string;
}

export interface Event {
  name: string;
  run: Function;
}
