import { User } from "../../deps.ts"
import { Client } from "../../src/client.ts"

export default {
    name: "READY",
    run: (client: Client, user: User) => { console.log("Logged as " + user.data.username) }
} 