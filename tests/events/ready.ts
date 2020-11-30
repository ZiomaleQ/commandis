import { Message } from "https://deno.land/x/corddis@v0.7.1/src/structures/message.ts"
import { Client } from "../../src/client.ts"

export default {
    name: "READY",
    run: (client: Client, msg: Message) => { console.log(msg.toString()) }
} 