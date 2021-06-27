import { Client } from "../../src/client.ts";
import { CommandContext } from '../../src/CommandContext.ts';

export default {
  name: "test2",
  description: "test2",
  category: "tests",
  restrictions: {
    guild: ["682660337996267542"], //test server
    user: ["344048874656366592"], // Commandis author id
  },
  run: (client: Client, msg: CommandContext) => {
    msg.reply("No elo ci");
  },
};
