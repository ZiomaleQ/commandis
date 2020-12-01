import { EventEmitter } from "../deps.ts"

export class Iterator extends EventEmitter {
    private _canceled: boolean = false
    constructor() {
        super()
    }

    // This is the best we can do - there's no async iterator cancel
    cancel() {
        return this._canceled = true
    }

    async iterate(values: AsyncIterableIterator<Deno.FsEvent>): Promise<boolean> {
        try {
            for await (let value of values) {
                if (value.kind == "access") continue;
                this.emit(value.kind, value.paths);
                if (this._canceled) break;
            }
        } catch (err) {
            this.emit('debug', err)
        }
        this.emit('end')
        return true;
    }
}