import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build plain static files into `out/` so the site can be hosted anywhere (e.g. Netlify).
  output: "export",
  // Static export has no image optimization server; serve images as-is.
  images: { unoptimized: true },
  // Lets the dev server be opened through an ngrok tunnel.
  allowedDevOrigins: ["*.ngrok-free.dev", "*.ngrok-free.app", "*.ngrok.app", "*.ngrok.io"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
