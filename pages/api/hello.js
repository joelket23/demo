export const config = { runtime: "edge" };
export default async function Hello(req, res) {
  let kvData = await process.env.wa_cf.get("mystore7395.myshopify.com");
  kvData = JSON.parse(kvData);

  return new Response(kvData);
}
