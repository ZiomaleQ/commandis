import { Client } from "../../src/client.ts";
import { CommandContext } from '../../src/CommandContext.ts';

export default {
  name: "hello",
  description: "sends hello",
  category: "tests",
  run: (client: Client, msg: CommandContext) => {
    msg.reply("Hi", true);
    msg.reply("Hi but w/o ping", true, false)
  },
};
