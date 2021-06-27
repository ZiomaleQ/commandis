import { Client } from "../../src/client.ts";
import { CommandContext } from '../../src/CommandContext.ts';

export default {
  name: "test4",
  description: "test2",
  category: "tests",
  help: "This is it. What? The end.",
  run: (client: Client, msg: CommandContext) => {
    msg.reply("No elo ci");
  },
};
