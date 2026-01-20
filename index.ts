import { ExecutionContext } from "@cloudflare/workers-types";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export default {
  async fetch(
    request: Request,
    env: any,
    ctx: ExecutionContext,
  ): Promise<Response> {
    let resp: Response;

    try {
      resp = await getAssetFromKV(
        { request, waitUntil: ctx.waitUntil.bind(ctx) },
        {
          mapRequestToAsset: (req) => {
            const url = new URL(req.url);
            if (url.pathname === "/") url.pathname = "/index.html";
            if (url.pathname.endsWith("/")) url.pathname += "index.html";
            return new Request(url.toString(), req);
          },
        },
      );
    } catch {
      // Optional SPA fallback
      const url = new URL(request.url);
      if (!url.pathname.includes(".")) {
        const fallback = new URL(request.url);
        fallback.pathname = "/index.html";
        resp = await getAssetFromKV({
          request: new Request(fallback.toString(), request),
          waitUntil: ctx.waitUntil.bind(ctx),
        });
      } else {
        return new Response("Not Found", { status: 404 });
      }
    }

    const headers = new Headers(resp.headers);

    // ✅ Cross-Origin Isolation
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");

    // Recommended for COEP so the browser won’t block your own cross-originless resources
    // (Safe default; doesn’t “open” your site)
    headers.set("Cross-Origin-Resource-Policy", "same-origin");

    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers,
    });
  },
};
