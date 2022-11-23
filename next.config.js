/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs'],
  },
  env: {
    JSON_RPC_PROVIDER: process.env.JSON_RPC_PROVIDER,
  },
};
