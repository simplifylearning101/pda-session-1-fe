"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { verifyAdmin } from "./adminApi";
import { ref, onValue, remove } from "firebase/database";

export default function ManageRooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showKeyPrompt, setShowKeyPrompt] = useState<string | null>(null);
  const [adminKey, setAdminKey] = useState("");
  const [keyError, setKeyError] = useState<string | null>(null);

  useEffect(() => {
    const roomsRef = ref(db, "rooms");
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const roomList = Object.entries(data).map(([key, value]: [string, any]) => ({
          key,
          ...value,
        }));
        setRooms(roomList);
      } else {
        setRooms([]);
      }
      setLoading(false);
    }, (err) => {
      setError("Failed to load rooms.");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const handleDeleteRoom = async (roomKey: string) => {
    setShowKeyPrompt(roomKey);
    setAdminKey("");
    setKeyError(null);
  };

  const confirmDeleteRoom = async () => {
    if (!showKeyPrompt) return;
    setDeleting(showKeyPrompt);
    setKeyError(null);
    const valid = await verifyAdmin(adminKey);
    if (!valid) {
      setKeyError("Invalid secret key. Room deletion not allowed.");
      setDeleting(null);
      return;
    }
    try {
      await remove(ref(db, `rooms/${showKeyPrompt}`));
      setShowKeyPrompt(null);
      setAdminKey("");
    } catch (err) {
      setError("Failed to delete room.");
    }
    setDeleting(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100 p-8">
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
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-300">Manage Rooms</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      {loading ? (
        <div className="text-lg">Loading rooms...</div>
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : rooms.length === 0 ? (
        <div className="text-lg">No rooms found.</div>
      ) : (
        <>
          <div className="w-full max-w-3xl grid gap-8">
            {rooms.map(room => (
              <div key={room.key} className="bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-blue-400">Room Key:</span> {room.key}
                  </div>
                  {room.admin && (
                    <button
                      onClick={() => handleDeleteRoom(room.key)}
                      disabled={deleting === room.key}
                      className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 disabled:opacity-50"
                    >
                      Delete Room
                    </button>
                  )}
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Users:</span>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {room.users ? (
                      Object.values(room.users).map((user: any, idx: number) => (
                        <div key={idx} className="bg-gray-700 rounded px-3 py-2 text-gray-100 text-center">
                          {user.name}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400">No users</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showKeyPrompt && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
                <h2 className="text-xl font-bold text-red-400 mb-4">Admin Verification</h2>
                <p className="mb-2 text-gray-200">Enter admin secret key to delete room:</p>
                <input
                  type="password"
                  value={adminKey}
                  onChange={e => setAdminKey(e.target.value)}
                  className="border rounded px-3 py-2 text-lg w-full mb-4 bg-gray-800 text-gray-100"
                  placeholder="Secret Key"
                  autoFocus
                />
                {keyError && (<div className="text-red-500 font-semibold mb-2">{keyError}</div>)}
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={confirmDeleteRoom}
                    disabled={!adminKey || deleting === showKeyPrompt}
                    className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleting === showKeyPrompt ? "Deleting..." : "Confirm Delete"}
                  </button>
                  <button
                    onClick={() => { setShowKeyPrompt(null); setAdminKey(""); setKeyError(null); }}
                    className="bg-gray-700 text-white px-4 py-2 rounded font-semibold hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
