import '@shopify/shopify-api/adapters/cf-worker';
import { shopify } from '@/lib/shopify';
export const config = { runtime: 'edge' };

// Authorize the user if not installed
export default async function Authenticate(req, res) {
  const { searchParams } = new URL(req.url);
  const shopname = searchParams.get('shop');

  let kvData = await process.env.wa_cf.get(shopname);
  kvData = JSON.parse(kvData);

  console.log('test kv data: ', kvData, shopname, searchParams);
  if (!kvData || !kvData?.installed) {
    return await shopify.auth.begin({
      shop: shopify.utils.sanitizeShop(shopname, true),
      callbackPath: '/api/token',
      isOnline: false,
      rawRequest: req,
    });
  }
}
