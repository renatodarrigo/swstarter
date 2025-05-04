async function getStats() {
  const response = await fetch(`${process.env.BACKEND_URL}/stats`);
  const data = await response.json();
  return data;
}

export async function GET() {
  const stats = await getStats();
  return new Response(JSON.stringify(stats), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
