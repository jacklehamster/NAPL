import { ExecutionContext } from "@cloudflare/workers-types";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

function stamp(request: Request, resp: Response) {
  const headers = new Headers(resp.headers);

  // PROOF you're hitting this Worker
  headers.set("X-Worker", "napl-coop");

  // COOP/COEP
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Embedder-Policy", "require-corp");

  // Avoid “why didn’t it update?”
  headers.set("Cache-Control", "no-store");

  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers,
  });
}

export default {
  async fetch(
    request: Request,
    env: any,
    ctx: ExecutionContext,
  ): Promise<Response> {
    try {
      // Make "/" serve "/index.html"
      const url = new URL(request.url);
      if (url.pathname === "/") url.pathname = "/index.html";
      const mapped = new Request(url.toString(), request);

      const resp = await getAssetFromKV(
        { request: mapped, waitUntil: ctx.waitUntil.bind(ctx) },
        {},
      );
      return stamp(request, resp);
    } catch (e) {
      return stamp(request, new Response("Not Found", { status: 404 }));
    }
  },
};
