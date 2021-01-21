import { Client } from "../../src/client.ts";
import { CommandisMessage } from "../../src/overrides/CommandisMessage.ts";

export default {
  name: "test1",
  description: "test1",
  category: "tests",
  restrictions: {
    guild: "682660337996267542",
    user: "344048874656366592",
  },
  run: (client: Client, msg: CommandisMessage) => {
    msg.reply("No elo ci");
  },
};
