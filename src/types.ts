import { EmbedBuilder, PermissionEnum, Snowflake } from "../deps.ts";

export type Snowflakes = Snowflake[] | Snowflake;

export interface Command {
  name: string;
  run: Function;
  category: string;
  permissions?: PermissionEnum[];
  description: string;
  hidden?: boolean;
  help?: EmbedBuilder | string;
  aliases?: string[];
  restrictions?: {
    guild?: Restriction | Snowflakes;
    users?: Restriction | Snowflakes;
  };
}

export interface Restriction {
  id: Snowflakes;
  blacklist: boolean;
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
}

export interface Event {
  name: string;
  run: Function;
}
