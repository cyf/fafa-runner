/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/fafa-runner",
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  output: "export",
  reactStrictMode: true,
};

module.exports = nextConfig;
