import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the privacy policy and terms live at plain crawlable URLs
  // on any static host (Firebase Hosting, Pages, S3). The Play Console Data
  // Safety form needs those URLs; an in-app copy does not satisfy it.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
