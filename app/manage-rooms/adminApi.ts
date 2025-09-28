import { BACKEND_URL } from "../config";

export async function verifyAdmin(secretKey: string): Promise<boolean> {
  const res = await fetch(`${BACKEND_URL}/api/verify-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ secretKey }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  return data.valid === true;
}
