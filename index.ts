export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Serve static assets first (from ./dist)
    const assetResp = await env.ASSETS.fetch(request);

    // If the asset doesn't exist, just return it as-is (likely 404)
    // Still add headers, though, because you might have a SPA fallback later.
    const headers = new Headers(assetResp.headers);

    // COOP/COEP for cross-origin isolation
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");

    // (Optional but commonly useful) CORS for your own origin fetches
    // Remove if you don't need it.
    // headers.set("Access-Control-Allow-Origin", "*");

    // IMPORTANT: COEP can block third-party resources unless they send CORS/CORP headers.
    // Keep this in mind if something breaks.

    return new Response(assetResp.body, {
      status: assetResp.status,
      statusText: assetResp.statusText,
      headers,
    });
  },
};
