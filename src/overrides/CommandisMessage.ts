import { Message } from "../../deps.ts";
import { Client } from "../client.ts";
import { StringReader } from "../stringReader.ts";


export class CommandisMessage extends Message {
    message: Message;
    stringReader: StringReader;

    constructor(message: Message, client: Client, stringReader?: StringReader) {
        super(message.data, client, message.channel, message.guild)
        this.message = message;
        this.stringReader = stringReader ?? new StringReader("", 0);
    }
}
