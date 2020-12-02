import { Client } from "../../src/client.ts";
import { CommandisMessage } from "../../src/overrides/CommandisMessage.ts";

export default {
    name: "hello",
    run: (client: Client, msg: CommandisMessage) => { msg.reply("No elo ci") },
    description: "sends hello",
    category: "4fun"
}