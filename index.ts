export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // If user requests a "directory" path, serve its index.html
    // e.g. "/" -> "/index.html", "/foo/" -> "/foo/index.html"
    if (url.pathname.endsWith("/")) {
      url.pathname += "index.html";
    }

    // If user requests root without trailing slash, optionally redirect to "/"
    if (url.pathname === "") {
      return Response.redirect(url.origin + "/", 301);
    }
    console.log(">>>", url);

    // Try to fetch the asset
    let resp = await env.ASSETS.fetch(new Request(url.toString(), request));

    // Optional SPA fallback: if not found and it's not a file request, serve /index.html
    if (resp.status === 404 && !url.pathname.includes(".")) {
      const spaUrl = new URL(request.url);
      spaUrl.pathname = "/index.html";
      resp = await env.ASSETS.fetch(new Request(spaUrl.toString(), request));
    }

    // Add COOP/COEP headers
    const headers = new Headers(resp.headers);
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");

    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers,
    });
  },
};
