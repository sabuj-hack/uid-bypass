export default async function handler(req, res) {
  const BIN_ID = "692ada63ae596e708f786049";
  const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
  const MASTER_KEY = process.env.JSONBIN_MASTER_KEY;

  const method = req.method;

  const upstream = await fetch(JSONBIN_URL, {
    method,
    headers: {
      "X-Master-Key": MASTER_KEY,
      "Content-Type": "application/json"
    },
    body: method !== "GET" ? JSON.stringify(req.body) : undefined
  });

  const data = await upstream.text();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.status(upstream.status).send(data);
}
