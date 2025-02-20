import { sseHeaders } from "../types.js";
import { ServerSentEventGenerator as AbstractSSEGenerator } from "../abstractServerSentEventGenerator.js";
import process from "node:process";
function isRecord(obj) {
    return typeof obj === "object" && obj !== null;
}
/**
 * ServerSentEventGenerator class, responsible for initializing and handling
 * server-sent events (SSE) as well as reading signals sent by the client.
 * Cannot be instantiated directly, you must use the stream static method.
 */
export class ServerSentEventGenerator extends AbstractSSEGenerator {
    constructor(req, res) {
        super();
        Object.defineProperty(this, "req", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "res", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.req = req;
        this.res = res;
        this.res.writeHead(200, sseHeaders);
        this.req.on("close", () => {
            this.res.end();
        });
    }
    /**
     * Initializes the server-sent event generator and executes the streamFunc function.
     *
     * @param req - The NodeJS request object.
     * @param res - The NodeJS response object.
     * @param onStart - A function that will be passed the initialized ServerSentEventGenerator class as it's first parameter.
     */
    static async stream(req, res, onStart, options) {
        const generator = new ServerSentEventGenerator(req, res);
        try {
            const stream = onStart(generator);
            if (stream instanceof Promise)
                await stream;
        }
        catch (error) {
            const errorStream = options && options.onError
                ? options.onError(generator, error)
                : null;
            if (errorStream instanceof Promise)
                await errorStream;
        }
        res.end();
    }
    send(event, dataLines, options) {
        const eventLines = super.send(event, dataLines, options);
        eventLines.forEach((line) => {
            this.res.write(line);
        });
        return eventLines;
    }
    /**
     * Reads client sent signals based on HTTP methods
     *
     * @params request - The NodeJS Request object.
     *
     * @returns An object containing a success boolean and either the client's signals or an error message.
     */
    static async readSignals(request) {
        if (request.method === "GET") {
            const url = new URL(`http://${process.env.HOST ?? "localhost"}${request.url}`);
            const params = url.searchParams;
            try {
                if (params.has("datastar")) {
                    const signals = JSON.parse(params.get("datastar"));
                    if (isRecord(signals)) {
                        return { success: true, signals };
                    }
                    else
                        throw new Error("Datastar param is not a record");
                }
                else
                    throw new Error("No datastar object in request");
            }
            catch (e) {
                if (isRecord(e) && "message" in e && typeof e.message === "string") {
                    return { success: false, error: e.message };
                }
                else {
                    return {
                        success: false,
                        error: "unknown error when parsing request",
                    };
                }
            }
        }
        const body = await new Promise((resolve, _) => {
            let chunks = "";
            request.on("data", (chunk) => {
                chunks += chunk;
            });
            request.on("end", () => {
                resolve(chunks);
            });
        });
        let parsedBody = {};
        try {
            if (typeof body !== "string")
                throw Error("body was not a string");
            parsedBody = JSON.parse(body);
        }
        catch (e) {
            if (isRecord(e) && "message" in e && typeof e.message === "string") {
                return { success: false, error: e.message };
            }
            else {
                return {
                    success: false,
                    error: "unknown error when parsing request",
                };
            }
        }
        return { success: true, signals: parsedBody };
    }
}
