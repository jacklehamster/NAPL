import { ExecutionContext } from "@cloudflare/workers-types";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export default {
  async fetch(): Promise<Response> {
    const headers = new Headers();

    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("content-type", "text/plain; charset=utf-8");
    headers.set("X-Worker-Version", "FORCE-TEST-1");
    headers.set("Cache-Control", "no-store");
    headers.set("CDN-Cache-Control", "no-store");
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");

    return new Response("worker is running", { headers });
  },
};

// function stamp(request: Request, resp: Response) {
//   const headers = new Headers(resp.headers);

//   headers.set("Cross-Origin-Opener-Policy", "same-origin");
//   headers.set("Cross-Origin-Embedder-Policy", "require-corp");

//   // Debug fingerprint
//   headers.set("X-Worker-Version", "coop-1");

//   // Strong no-cache signals (browser + intermediary)
//   headers.set("Cache-Control", "no-store, max-age=0");
//   headers.set("CDN-Cache-Control", "no-store");
//   headers.set("Cloudflare-CDN-Cache-Control", "no-store");
//   headers.set("Pragma", "no-cache");
//   headers.set("Expires", "0");

//   return new Response(resp.body, {
//     status: resp.status,
//     statusText: resp.statusText,
//     headers,
//   });
// }

// export default {
//   async fetch(
//     request: Request,
//     env: any,
//     ctx: ExecutionContext,
//   ): Promise<Response> {
//     // IMPORTANT: kv-asset-handler often strips query from cache key;
//     // and it also caches aggressively unless you bypass it.
//     const url = new URL(request.url);

//     // map "/" -> "/index.html" (keep query string)
//     if (url.pathname === "/") url.pathname = "/index.html";

//     const mapped = new Request(url.toString(), request);

//     try {
//       const isHtml = url.pathname.endsWith(".html");

//       const resp = await getAssetFromKV(
//         { request: mapped, waitUntil: ctx.waitUntil.bind(ctx) },
//         {
//           // ✅ This is the key: bypass edge cache for HTML
//           cacheControl: isHtml
//             ? { bypassCache: true }
//             : { edgeTTL: 31536000, browserTTL: 31536000 },
//         },
//       );

//       return stamp(request, resp);
//     } catch {
//       return stamp(request, new Response("Not Found", { status: 404 }));
//     }
//   },
// };
