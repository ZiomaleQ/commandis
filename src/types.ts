import { EmbedBuilder, PermissionEnum, Snowflake } from "../deps.ts";

export interface Command {
  name: string;
  run: Function;
  category?: string;
  parameters?: CommandParameter[]
  permissions?: PermissionEnum[];
  description: string;
  hidden?: boolean;
  help?: EmbedBuilder | string;
  aliases?: string[];
  allowDirect?: boolean;
  allowDm?: boolean;
  restrictions?: {
    guild?: Snowflake | Snowflake[];
    users?: Snowflake | Snowflake[];
  };
}

export interface CommandParameter {
  name: string
  type: CommandParameterType
  /** If you want to set nullable value as default property set it to `null` */
  default?: any
  /** If `default` property is set, defaults to `false`. In any other case value is true. */
  required?: boolean
}

export interface CommandArguments extends CommandParameter {
  value?: any
}

export enum CommandParameterType {
  BOOL, INT, FLOAT, STRING, QUOTED, REST
}

export interface Restriction {
  id: Snowflake | Snowflake[];
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