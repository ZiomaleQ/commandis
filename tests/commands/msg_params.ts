import { Client } from "../../src/client.ts";
import { CommandContext } from '../../src/CommandContext.ts';
import { CommandParameterType } from "../../src/types.ts";

export default {
  name: "test5",
  description: "test5",
  category: "tests",
  parameters: [{ name: "test", type: CommandParameterType.STRING }],
  help: "Another command to test commandis",
  allowDirect: true,
  run: async (_: Client, msg: CommandContext) => {
    await msg.reply("Hi!");
    msg.reply(msg.args.map(elt => JSON.stringify(elt)).join(", "))
  },
};
