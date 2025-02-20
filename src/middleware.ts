import { defineMiddleware } from "astro:middleware";
import { ServerSentEventGenerator } from "datastar-sdk/src/web/serverSentEventGenerator.js";

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  if (pathname.startsWith("/partials")) {
    const reader = await ServerSentEventGenerator.readSignals(context.request);
    if (!reader.success) {
      return new Response("Error reading signals", { status: 400, headers: { "Content-Type": "text/html" } });
    }

    const response = await next(context.request);
    const html = await response.text();

    return ServerSentEventGenerator.stream((stream) => {
      stream.mergeFragments(html);
      stream.close();
    });
  }

  return next();
});
