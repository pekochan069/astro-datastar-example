import { DatastarEventOptions, EventType } from "../../src/types.js";
import { ServerSentEventGenerator as AbstractSSEGenerator } from "../../src/abstractServerSentEventGenerator.js";
import type { Jsonifiable } from "type-fest";
/**
 * ServerSentEventGenerator class, responsible for initializing and handling
 * server-sent events (SSE) as well as reading signals sent by the client.
 * Cannot be instantiated directly, you must use the stream static method.
 */
export declare class ServerSentEventGenerator extends AbstractSSEGenerator {
  protected controller: ReadableStreamDefaultController;
  protected constructor(controller: ReadableStreamDefaultController);
  /**
   * Closes the ReadableStream
   */
  close(): void;
  /**
   * Initializes the server-sent event generator and executes the streamFunc function.
   *
   * @param onStart - A function that will be passed the initialized ServerSentEventGenerator class as it's first parameter.
   * @param options? - An object that can contain options for the Response constructor as well as onError and onCancel callbacks.
   * The onAbort callback will be called whenever the request is aborted or the stream is cancelled
   * The onError callback keeps the stream open after an exception  to report the error. If it is not provided it will
   * cancel the stream and throw the error.
   *
   * @returns an HTTP Response
   */
  static stream(
    onStart: (stream: ServerSentEventGenerator) => Promise<void> | void,
    options?: Partial<{
      onError: (stream: ServerSentEventGenerator, error: unknown) => Promise<void> | void;
      onAbort: (reason: string) => Promise<void> | void;
      init: ResponseInit;
    }>
  ): Response;
  protected send(event: EventType, dataLines: string[], options: DatastarEventOptions): string[];
  /**
   * Reads client sent signals based on HTTP methods
   *
   * @params request - The HTTP Request object.
   *
   * @returns An object containing a success boolean and either the client's signals or an error message.
   */
  static readSignals(request: Request): Promise<
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
