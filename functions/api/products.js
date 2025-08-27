export async function onRequestGet(context) {
  const backend = context.env?.BACKEND_URL || process.env.BACKEND_URL;
  if (!backend) return new Response(JSON.stringify({ error: 'BACKEND_URL not configured' }), { status: 500 });

  try {
    const res = await fetch(`${backend}/api/products`);
    const body = await res.text();
    return new Response(body, { status: res.status, headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
}
