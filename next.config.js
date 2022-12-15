/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    JSON_RPC_PROVIDER: process.env.JSON_RPC_PROVIDER,
  },
};
