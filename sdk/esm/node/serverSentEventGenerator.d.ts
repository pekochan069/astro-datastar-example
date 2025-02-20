import { DatastarEventOptions, EventType } from "../../src/types.js";
import { ServerSentEventGenerator as AbstractSSEGenerator } from "../../src/abstractServerSentEventGenerator.js";
import { IncomingMessage, ServerResponse } from "node:http";
import type { Jsonifiable } from "type-fest";
/**
 * ServerSentEventGenerator class, responsible for initializing and handling
 * server-sent events (SSE) as well as reading signals sent by the client.
 * Cannot be instantiated directly, you must use the stream static method.
 */
export declare class ServerSentEventGenerator extends AbstractSSEGenerator {
  protected req: IncomingMessage;
  protected res: ServerResponse;
  protected constructor(req: IncomingMessage, res: ServerResponse);
  /**
   * Initializes the server-sent event generator and executes the streamFunc function.
   *
   * @param req - The NodeJS request object.
   * @param res - The NodeJS response object.
   * @param onStart - A function that will be passed the initialized ServerSentEventGenerator class as it's first parameter.
   */
  static stream(
    req: IncomingMessage,
    res: ServerResponse,
    onStart: (stream: ServerSentEventGenerator) => Promise<void> | void,
    options?: Partial<{
      onError: (stream: ServerSentEventGenerator, error: unknown) => Promise<void> | void;
    }>
  ): Promise<void>;
  protected send(event: EventType, dataLines: string[], options: DatastarEventOptions): string[];
  /**
   * Reads client sent signals based on HTTP methods
   *
   * @params request - The NodeJS Request object.
   *
   * @returns An object containing a success boolean and either the client's signals or an error message.
   */
  static readSignals(request: IncomingMessage): Promise<
    | {
        success: true;
        signals: Record<string, Jsonifiable>;
      }
    | {
        success: false;
        error: string;
      }
  >;
}
//# sourceMappingURL=serverSentEventGenerator.d.ts.map
