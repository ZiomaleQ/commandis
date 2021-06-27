import { EmbedBuilder, Guild, Message } from "../deps.ts"
import { Client } from "./client.ts"
import { CommandContext } from "./CommandContext.ts"
import { StringReader } from "./stringReader.ts"
import { Command, CommandArguments, CommandParameterType, Restriction } from "./types.ts"

export const helpCommand: Command = {
  category: "system",
  name: "help",
  hidden: true,
  description: "Help message",
  parameters: [{ name: "command", type: CommandParameterType.STRING }],
  run: (client: Client, ctx: CommandContext) => {

    //Checking for command help
    if (ctx.args[0]?.value) {
      const command = client.commands.find(command => command.name == ctx.args[0].value)
      switch (typeof command?.help) {
        case 'string':
          return ctx.channel.sendMessage({ content: command.help })
        case 'object':
          return ctx.channel.sendMessage({ embeds: [command.help] })
        default:
          return ctx.channel.sendMessage({ content: "This command has no help associated" })
      }
    }

    const grouped = groupBy(client.commands.filter((it) => !it.hidden), (it) => it.category ?? "default")

    const categories = Object.keys(grouped);
    const embed = new EmbedBuilder().title(`Hello there, my prefix is \`${client.options.prefix}\``);
    for (let category of categories) {
      embed.field(category, grouped[category].map((it) => `\`${it.name}\``).join(", "))
    }
    ctx.channel.sendMessage({ embeds: [embed] });
  }
}

function groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K) {
  return list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>)
}

export async function checkCommandRestrictions(command: Command, msg: Message): Promise<boolean> {
  if (!command.restrictions) return true
  if (msg.guild && command.restrictions.guild) {
    const guildArray = [...command.restrictions.guild]
    const restricedGuild = guildArray.find((entry) => entry == msg.guild?.data.id)

    if (restricedGuild) {
      await msg.reply(`This guild is blacklisted from using command \`${command.name}\``);
      return false
    }
  }

  if (command.restrictions.users) {
    const usersArray = [...command.restrictions.users]
    const restricedUser = usersArray.find((entry) => entry == msg.data.author.id)

    if (restricedUser) {
      await msg.reply(`You're blacklisted from using command \`${command.name}\``,);
      return false
    }
  }
  return true
}

export async function parseCommandArgs(command: Command, msg: Message, interpreter: StringReader): Promise<CommandArguments[]> {
  if (!command.parameters) return [];

  const parameters: CommandArguments[] = []

  for (const parameter of command.parameters) {
    let value

    switch (parameter.type) {
      case CommandParameterType.BOOL: interpreter.canRead() && (value = interpreter.readBool()); break;
      case CommandParameterType.STRING: interpreter.canRead() && (value = interpreter.readWord()); break;
      case CommandParameterType.FLOAT: interpreter.canRead() && (value = interpreter.readPoint()); break;
      case CommandParameterType.INT: interpreter.canRead() && (value = interpreter.readInt()); break;
      case CommandParameterType.QUOTED: interpreter.canRead() && (value = interpreter.readQuotedString()); break;
      case CommandParameterType.REST: interpreter.canRead() && (value = interpreter.getRemaing()); break;
      default: value = undefined
    }

    value == undefined && (value = parameter.default)

    if (parameter.required === true && value !== null) {
      await msg.reply(`Parameter ${parameter.name} wasn't set and doesn't have a default value`, true)
      throw Error("REQUIRED_PARAM_NOT_SET")
    }
    parameters.push({ ...parameter, value })

  }

  return parameters
}