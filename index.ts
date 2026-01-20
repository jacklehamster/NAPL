import { ExecutionContext } from "@cloudflare/workers-types";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

function withIsolationHeaders(resp: Response) {
  const headers = new Headers(resp.headers);
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  // Optional but often helpful with COEP
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers,
  });
}

function mapToIndex(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/") url.pathname = "/index.html";
  else if (url.pathname.endsWith("/")) url.pathname += "index.html";
  return new Request(url.toString(), request);
}

export default {
  async fetch(
    request: Request,
    env: any,
    ctx: ExecutionContext,
  ): Promise<Response> {
    try {
      const resp = await getAssetFromKV(
        { request: mapToIndex(request), waitUntil: ctx.waitUntil.bind(ctx) },
        {},
      );
      return withIsolationHeaders(resp);
    } catch (err: any) {
      // SPA fallback: serve index.html for non-file paths
      const url = new URL(request.url);
      if (!url.pathname.includes(".")) {
        try {
          const fallbackUrl = new URL(request.url);
          fallbackUrl.pathname = "/index.html";
          const resp = await getAssetFromKV(
            {
              request: new Request(fallbackUrl.toString(), request),
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {},
          );
          return withIsolationHeaders(resp);
        } catch {
          return withIsolationHeaders(
            new Response("Not Found", { status: 404 }),
          );
        }
      }
      return withIsolationHeaders(new Response("Not Found", { status: 404 }));
    }
  },
};
