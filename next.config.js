/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    SECRET_KEY: process.env.SECRET_KEY,
    SHOPIFY_THEME_APP_EXTENSION_ID: 'demo-theme',
    SCOPES: process.env.SCOPES,
    HOSTSCHEME: 'https',
    HOST: process.env.HOST,
    APP_SLUG: process.env.APP_SLUG,
    MONGODB_API_URL: process.env.MONGODB_API_URL,
    MONGODB_API_KEY: process.env.MONGODB_API_KEY,
    wa_cf: process.env.wa_cf,
  },
};

module.exports = nextConfig;
