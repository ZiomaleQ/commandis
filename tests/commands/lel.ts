import { Message } from "../../deps.ts";
import { Client } from "../../src/client.ts";

export default {
    name: "lel",
    run: (client: Client, msg: Message) => { msg.reply("No elo ci") },
    description: "string1",
    category: "string"
}