const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/fafa-runner",
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    domains: ["www.kjxbyz.com"],
  },
};

module.exports = withContentlayer(nextConfig);
