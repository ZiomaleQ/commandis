import { Client } from "../../src/client.ts";
import { CommandisMessage } from "../../src/overrides/CommandisMessage.ts";
import { EmbedBuilder } from "../../deps.ts";

export default {
  name: "test4",
  description: "test2",
  category: "tests",
  help: "This is it. What? The end.",
  run: (client: Client, msg: CommandisMessage) => {
    msg.reply("No elo ci");
  },
};
