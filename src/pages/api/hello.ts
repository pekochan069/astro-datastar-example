import type { APIRoute } from "astro";
import { ServerSentEventGenerator } from "datastar-sdk/src/web/serverSentEventGenerator.js";

export const GET: APIRoute = async ({ request }) => {
  const reader = await ServerSentEventGenerator.readSignals(request);

  if (!reader.success) {
    return new Response("Error reading signals", { status: 400, headers: { "Content-Type": "text/html" } });
  }

  if (!("api" in reader.signals)) {
    return new Response("api signal not found", { status: 400, headers: { "Content-Type": "text/html" } });
  }

  return ServerSentEventGenerator.stream((stream) => {
    stream.mergeFragments(`<div id="from-api">Hello ${reader.signals.api}</div>`);
    stream.close();
  });
};
