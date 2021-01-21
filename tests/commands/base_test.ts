import { Client } from "../../src/client.ts";
import { CommandisMessage } from "../../src/overrides/CommandisMessage.ts";

export default {
  name: "hello",
  description: "sends hello",
  category: "tests",
  run: (client: Client, msg: CommandisMessage) => {
    msg.reply("No elo ci");
  },
};
