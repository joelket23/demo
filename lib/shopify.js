import {
  ApiVersion,
  Session,
  shopifyApi,
  LATEST_API_VERSION,
} from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/cf-worker";

// Setup shopify API client
export const shopify = shopifyApi({
  apiKey: process.env.API_KEY,
  apiSecretKey: process.env.SECRET_KEY,
  scopes: process.env.SCOPES,
  hostScheme: "https",
  hostName: process.env.HOST,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
});

export function restClient(shopSession) {
  const session = new Session(shopSession);
  const restClient = new shopify.clients.Rest({
    session,
    apiVersion: ApiVersion.April23,
  });

  return restClient;
}
