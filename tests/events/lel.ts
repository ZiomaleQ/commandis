import { User } from "../../deps.ts"
import { Client } from "../../src/client.ts"

export default {
    name: "MESSAGE_CREATE",
    run: (client: Client, user: User) => { console.log("Logged as " + user.data.username) }
} 