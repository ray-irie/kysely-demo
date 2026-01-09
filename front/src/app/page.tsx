import { hc } from "hono/client";
import type { AppType } from "api";

export default async function Page() {

  const client = hc<AppType>('http://localhost:3001');
  
  const userRes = await client.users[":id"].$get({
    param: {
      id: "1",
    }
  })
  
  if (userRes.ok) {
    const user = await userRes.json();
    console.log("User data:", user);
  } else {
    console.log("Failed to fetch user:", userRes.status);
  }

  return <h1>Hello, Next.js!</h1>;
}
