import { BACKEND_URL } from "../config";
export async function createRoom(secretKey: string): Promise<{ roomKey: string }> {
  const res = await fetch(`${BACKEND_URL}/api/create-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ secretKey }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create room");
  }
  return res.json();
}
