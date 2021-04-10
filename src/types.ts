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
  name: EventsNames;
  run: Function;
}

export type EventsNames = "DEBUG" | "READY" | "RAW" |
  "APPLICATION_COMMAND_CREATE" | "APPLICATION_COMMAND_DELETE" | "APPLICATION_COMMAND_UPDATE" |
  "CHANNEL_CREATE" | "CHANNEL_DELETE" | "CHANNEL_PINS_UPDATE" | "CHANNEL_UPDATE" |
  "GUILD_BAN_ADD" | "GUILD_BAN_ADD" |
  "GUILD_CREATE" | "GUILD_DELETE" |
  "GUILD_MEMBER_ADD" | "GUILD_MEMBER_REMOVE" | "GUILD_MEMBER_UPDATE" | "GUILD_MEMBERS_CHUNK" |
  "GUILD_ROLE_CREATE" | "GUILD_ROLE_CREATE" | "GUILD_ROLE_UPDATE" |
  "INTERACTION_CREATE" |
  "INVITE_CREATE" | "INVITE_DELETE" |
  "MESSAGE_CREATE" | "MESSAGE_DELETE_BULK" | "MESSAGE_DELETE" | "MESSAGE_UPDATE" |
  "MESSAGE_REACTION_ADD" | "MESSAGE_REACTION_REMOVE_ALL" | "MESSAGE_REACTION_REMOVE" |
  "PRESENCE_UPDATE" |
  "TYPING_START" |
  "VOICE_SERVER_UPDATE" | "VOICE_STATE_UPDATE"