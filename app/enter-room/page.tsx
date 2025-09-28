"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addUserToRoom } from "../../firebaseConfig";

export default function EnterRoom() {
  const [userName, setUserName] = useState("");
  const [roomKey, setRoomKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnterRoom = async () => {
    setLoading(true);
    setError(null);
    if (!userName || !roomKey) {
      setError("Please enter both user name and room key.");
      setLoading(false);
      return;
    }
    try {
      await addUserToRoom(roomKey, userName);
      router.push(`/room-details?roomKey=${roomKey}&userName=${encodeURIComponent(userName)}`);
    } catch (err: any) {
      setError(err.message || "Failed to join room. Please check the room key.");
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
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-300">Enter Room</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="border rounded px-3 py-2 text-lg"
        />
        <input
          type="text"
          placeholder="Enter room key"
          value={roomKey}
          onChange={e => setRoomKey(e.target.value)}
          className="border rounded px-3 py-2 text-lg"
        />
        <button
          onClick={handleEnterRoom}
          disabled={loading || !userName || !roomKey}
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Entering..." : "Enter Room"}
        </button>
        {error && <div className="text-red-600 font-medium">{error}</div>}
      </div>
    </div>
  );
}
