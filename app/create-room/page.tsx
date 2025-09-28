"use client";
import React, { useState } from "react";
import { createRoom } from "./mockBackend";
import { useRouter } from "next/navigation";
import { createRoomInFirebase } from "../../firebaseConfig";
export default function CreateRoom() {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await createRoom(secretKey);
      // Save room data to Firebase
      await createRoomInFirebase(result.roomKey, { createdAt: Date.now(), admin: true });
      router.push(`/room-details?roomKey=${result.roomKey}`);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full flex items-center mb-6">
        <div className="flex-1 flex justify-start">
          <a
            href="/"
            className="mr-4 px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200"
          >
            ← Main Menu
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-300">Create Room</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="password"
          placeholder="Enter admin secret key"
          value={secretKey}
          onChange={e => setSecretKey(e.target.value)}
          className="border rounded px-3 py-2 text-lg"
        />
        <button
          onClick={handleCreateRoom}
          disabled={loading || !secretKey}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create New Room"}
        </button>
        {error && <div className="text-red-600 font-medium">{error}</div>}
      </div>
    </div>
  );
}
