/** @type {import('next').NextConfig} */

const repoName = "Surat";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isProd
    ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}/` }
    : {}),
  reactStrictMode: true,
};

module.exports = nextConfig;
