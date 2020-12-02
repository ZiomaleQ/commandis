import { Message } from "../../deps.ts";
import { Client } from "../../src/client.ts";
import { CommandisMessage } from "../../src/overrides/CommandisMessage.ts";

export default {
    name: "lel",
    run: (client: Client, msg: CommandisMessage) => { msg.reply("No elo ci") },
    description: "string1",
    category: "string"
}