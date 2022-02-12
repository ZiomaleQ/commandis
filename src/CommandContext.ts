// deno-lint-ignore-file no-explicit-any
import { Message } from "../deps.ts";
import { Client } from "./client.ts";
import { Command } from "./types.ts";

export class CommandContext extends Message {
  command: Command
  args: any[]

  constructor(message: Message, client: Client, command: Command, args: any[] = []) {
    super(message.data, client, message.channel, message.guild);
    this.command = command
    this.args = args
  }
}
