import { Client } from "../../src/client.ts";
import { CommandisMessage } from "../../src/overrides/CommandisMessage.ts";

export default {
  name: "test2",
  description: "test2",
  category: "tests",
  restrictions: {
    guild: {
      id: "682660337996267542",
      whitelist: true,
    },
    user: {
      id: "344048874656366592",
      whitelist: true,
    },
  },
  run: (client: Client, msg: CommandisMessage) => {
    msg.reply("No elo ci");
  },
};
