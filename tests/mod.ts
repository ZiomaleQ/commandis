import { Client as Commandis } from "../src/client.ts"
import { token } from "./token.ts"

var client = new Commandis({ hotreload: true, debug: true })
client.login(token)
