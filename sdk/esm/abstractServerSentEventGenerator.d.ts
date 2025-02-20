import {
  DatastarEventOptions,
  EventType,
  ExecuteScriptOptions,
  FragmentOptions,
  MergeFragmentsOptions,
  MergeSignalsOptions,
} from "../src/types.js";
import type { Jsonifiable } from "type-fest";
/**
 * Abstract ServerSentEventGenerator class, responsible for initializing and handling
 * server-sent events (SSE) as well as reading signals sent by the client.
 *
 * The concrete implementation must override the send and constructor methods as well
 * as implement readSignals and stream static methods.
 */
export declare abstract class ServerSentEventGenerator {
  protected constructor();
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
  protected send(event: EventType, dataLines: string[], options: DatastarEventOptions): string[];
  private eachNewlineIsADataLine;
  private eachOptionIsADataLine;
  private hasDefaultValue;
  /**
   * Sends a merge fragments event.
   *
   * @param fragments - HTML fragments that will be merged.
   * @param [options] - Additional options for merging.
   */
  mergeFragments(data: string, options?: MergeFragmentsOptions): ReturnType<typeof this.send>;
  /**
   * Sends a remove fragments event.
   *
   * @param selector - CSS selector of fragments to remove.
   * @param [options] - Additional options for removing.
   */
  removeFragments(selector: string, options?: FragmentOptions): string[];
  /**
   * Sends a merge signals event.
   *
   * @param data - Data object that will be merged into the client's signals.
   * @param options - Additional options for merging.
   */
  mergeSignals(data: Record<string, Jsonifiable>, options?: MergeSignalsOptions): ReturnType<typeof this.send>;
  /**
   * Sends a remove signals event.
   *
   * @param paths - Array of paths to remove from the client's signals
   * @param options - Additional options for removing signals.
   */
  removeSignals(paths: string[], options?: DatastarEventOptions): ReturnType<typeof this.send>;
  /**
   * Executes a script on the client-side.
   *
   * @param script - Script code to execute.
   * @param options - Additional options for execution.
   */
  executeScript(script: string, options?: ExecuteScriptOptions): ReturnType<typeof this.send>;
}
//# sourceMappingURL=abstractServerSentEventGenerator.d.ts.map
