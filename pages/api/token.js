import '@shopify/shopify-api/adapters/cf-worker';
import { shopify } from '@/lib/shopify';

export const config = { runtime: 'edge' };

export default async function Token(req, res) {
  const { searchParams } = new URL(req.url);
  const shopname = searchParams.get('shop');

  let kvData = await process.env.wa_cf.get(shopname);
  kvData = JSON.parse(kvData);
  console.log('kvData token: ', kvData);

  const callbackResponse = await shopify.auth.callback({
    rawRequest: req,
  });
  await process.env.wa_cf.put(shopname, JSON.stringify({ installed: true }));
  console.log('callbackResponse: ', callbackResponse);

  return new Response('', {
    status: 302,
    // Headers are of type [string, string][]
    headers: [
      ...callbackResponse.headers,
      ['Location', `https://${shopname}/admin/apps/${process.env.APP_SLUG}`],
    ],
  });
}
