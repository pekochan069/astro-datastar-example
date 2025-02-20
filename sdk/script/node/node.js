"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const serverSentEventGenerator_js_1 = require("./serverSentEventGenerator.js");
const hostname = "127.0.0.1";
const port = 3000;
const server = (0, node_http_1.createServer)(async (req, res) => {
    if (req.url === "/") {
        const headers = new Headers({ "Content-Type": "text/html" });
        res.setHeaders(headers);
        res.end(`<html><head><script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@v1.0.0-beta.1/bundles/datastar.js"></script></head><body><div id="toMerge" data-signals-foo="'World'" data-on-load="@get('/merge')">Hello</div></body></html>`);
    }
    else if (req.url?.includes("/test")) {
        const reader = await serverSentEventGenerator_js_1.ServerSentEventGenerator.readSignals(req);
        if (reader.success) {
            const events = reader.signals.events;
            if (isEventArray(events)) {
                serverSentEventGenerator_js_1.ServerSentEventGenerator.stream(req, res, (stream) => {
                    testEvents(stream, events);
                });
            }
        }
        else {
            res.end(reader.error);
        }
    }
    else if (req.url?.includes("/await")) {
        serverSentEventGenerator_js_1.ServerSentEventGenerator.stream(req, res, async (stream) => {
            stream.mergeFragments('<div id="toMerge">Merged</div>');
            await delay(5000);
            stream.mergeFragments('<div id="toMerge">After 10 seconds</div>');
        });
    }
    else {
        res.end("Path not found");
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
function isEventArray(events) {
    return events instanceof Array && events.every((event) => {
        return typeof event === "object" && event !== null &&
            typeof event.type === "string";
    });
}
function testEvents(stream, events) {
    events.forEach((event) => {
        const { type, ...e } = event;
        switch (type) {
            case "mergeFragments":
                if (e !== null && typeof e === "object" && "fragments" in e) {
                    const { fragments, ...options } = e;
                    stream.mergeFragments(fragments, options || undefined);
                }
                break;
            case "removeFragments":
                if (e !== null && typeof e === "object" && "selector" in e) {
                    const { selector, ...options } = e;
                    stream.removeFragments(selector, options || undefined);
                }
                break;
            case "mergeSignals":
                if (e !== null && typeof e === "object" && "signals" in e) {
                    const { signals, ...options } = e;
                    stream.mergeSignals(signals, options || undefined);
                }
                break;
            case "removeSignals":
                if (e !== null && typeof e === "object" && "paths" in e) {
                    const { paths, ...options } = e;
                    stream.removeSignals(paths, options || undefined);
                }
                break;
            case "executeScript":
                if (e !== null && typeof e === "object" && "script" in e) {
                    const { script, ...options } = e;
                    stream.executeScript(script, options || undefined);
                }
                break;
        }
    });
}
