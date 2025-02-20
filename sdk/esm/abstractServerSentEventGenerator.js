import { DefaultMapping, } from "./types.js";
import { DefaultExecuteScriptAttributes } from "./consts.js";
import { DefaultSseRetryDurationMs } from "./consts.js";
/**
 * Abstract ServerSentEventGenerator class, responsible for initializing and handling
 * server-sent events (SSE) as well as reading signals sent by the client.
 *
 * The concrete implementation must override the send and constructor methods as well
 * as implement readSignals and stream static methods.
 */
export class ServerSentEventGenerator {
    constructor() { }
    /**
     * Sends a server-sent event (SSE) to the client.
     *
     * Runtimes should override this method by calling the parent function
     *  with `super.send(event, dataLines, options)`. That will return all the
     * datalines as an array of strings that should be streamed to the client.
     *
     * @param eventType - The type of the event.
     * @param dataLines - Lines of data to send.
     * @param [sendOptions] - Additional options for sending events.
     */
    send(event, dataLines, options) {
        const { eventId, retryDuration } = options || {};
        const typeLine = [`event: ${event}\n`];
        const idLine = eventId ? [`id: ${eventId}\n`] : [];
        const retryLine = [
            `retry: ${retryDuration ?? DefaultSseRetryDurationMs}\n`,
        ];
        return typeLine.concat(idLine, retryLine, dataLines.map((data) => {
            return `data: ${data}\n`;
        }), ["\n\n"]);
    }
    eachNewlineIsADataLine(prefix, data) {
        return data.split("\n").map((line) => {
            return `${prefix} ${line}`;
        });
    }
    eachOptionIsADataLine(options) {
        return Object.keys(options).filter((key) => {
            return !this.hasDefaultValue(key, options[key]);
        }).flatMap((key) => {
            return this.eachNewlineIsADataLine(key, options[key].toString());
        });
    }
    hasDefaultValue(key, val) {
        if (key === DefaultExecuteScriptAttributes.split(" ")[0]) {
            return val === DefaultExecuteScriptAttributes.split(" ")[1];
        }
        if (key in DefaultMapping) {
            return val === DefaultMapping[key];
        }
        return false;
    }
    /**
     * Sends a merge fragments event.
     *
     * @param fragments - HTML fragments that will be merged.
     * @param [options] - Additional options for merging.
     */
    mergeFragments(data, options) {
        const { eventId, retryDuration, ...renderOptions } = options ||
            {};
        const dataLines = this.eachOptionIsADataLine(renderOptions)
            .concat(this.eachNewlineIsADataLine("fragments", data));
        return this.send("datastar-merge-fragments", dataLines, {
            eventId,
            retryDuration,
        });
    }
    /**
     * Sends a remove fragments event.
     *
     * @param selector - CSS selector of fragments to remove.
     * @param [options] - Additional options for removing.
     */
    removeFragments(selector, options) {
        const { eventId, retryDuration, ...eventOptions } = options ||
            {};
        const dataLines = this.eachOptionIsADataLine(eventOptions)
            .concat(this.eachNewlineIsADataLine("selector", selector));
        return this.send("datastar-remove-fragments", dataLines, {
            eventId,
            retryDuration,
        });
    }
    /**
     * Sends a merge signals event.
     *
     * @param data - Data object that will be merged into the client's signals.
     * @param options - Additional options for merging.
     */
    mergeSignals(data, options) {
        const { eventId, retryDuration, ...eventOptions } = options ||
            {};
        const dataLines = this.eachOptionIsADataLine(eventOptions)
            .concat(this.eachNewlineIsADataLine("signals", JSON.stringify(data)));
        return this.send("datastar-merge-signals", dataLines, {
            eventId,
            retryDuration,
        });
    }
    /**
     * Sends a remove signals event.
     *
     * @param paths - Array of paths to remove from the client's signals
     * @param options - Additional options for removing signals.
     */
    removeSignals(paths, options) {
        const eventOptions = options || {};
        const dataLines = paths.flatMap((path) => path.split(" ")).map((path) => `paths ${path}`);
        return this.send("datastar-remove-signals", dataLines, eventOptions);
    }
    /**
     * Executes a script on the client-side.
     *
     * @param script - Script code to execute.
     * @param options - Additional options for execution.
     */
    executeScript(script, options) {
        const { eventId, retryDuration, attributes, ...eventOptions } = options || {};
        const attributesDataLines = this.eachOptionIsADataLine(attributes ?? {})
            .map((line) => `attributes ${line}`);
        const dataLines = attributesDataLines.concat(this.eachOptionIsADataLine(eventOptions), this.eachNewlineIsADataLine("script", script));
        return this.send("datastar-execute-script", dataLines, {
            eventId,
            retryDuration,
        });
    }
}
