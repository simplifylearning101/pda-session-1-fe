"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useRouter } from "next/navigation";
import { remove } from "firebase/database";

function RoomDetailsContent() {
  const searchParams = useSearchParams();
  const roomKey = searchParams.get("roomKey");
  const userName = searchParams.get("userName");
  const [users, setUsers] = useState<Array<{ name: string }>>([]);
  const router = useRouter();

  // Helper to find the user's Firebase key
  function getUserKey(usersObj: any, userName: string | null) {
    if (!usersObj || !userName) return null;
    return Object.entries(usersObj).find(([, val]: any) => val.name === userName)?.[0] || null;
  }

  useEffect(() => {
    if (!roomKey) return;
    const usersRef = ref(db, `rooms/${roomKey}/users`);
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.values(data) as Array<{ name: string }>;
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });
    return () => unsubscribe();
  }, [roomKey]);

  // Leave room handler
  const handleLeaveRoom = async () => {
    if (!roomKey || !userName) {
      router.push("/");
      return;
    }
    // Remove user from Firebase
    const usersRef = ref(db, `rooms/${roomKey}/users`);
    onValue(usersRef, async (snapshot) => {
      const data = snapshot.val();
      const userKey = getUserKey(data, userName);
      if (userKey) {
        await remove(ref(db, `rooms/${roomKey}/users/${userKey}`));
      }
      router.push("/");
    }, { onlyOnce: true });
  };

  return (
  <div className="flex flex-col min-h-screen p-4 sm:p-8 bg-gray-900 text-gray-100">
      {/* Top section: Main Menu link, Room Key and Leave Room Button */}
  <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <div className="flex items-center gap-4 flex-1">
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200"
            >
              ← Main Menu
            </a>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700">Room Details</h1>
          </div>
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="p-2 sm:p-4 border rounded bg-green-50 text-green-800 text-center min-w-[120px] sm:min-w-[180px]">
              <span className="font-bold">Room Key:</span> {roomKey}
            </div>
            {userName && (
              <button
                onClick={handleLeaveRoom}
                className="bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded font-semibold hover:bg-red-700"
              >
                Leave Room
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Main content: Create Quiz Card and user list */}
      <div className="flex flex-col sm:flex-row flex-1 gap-6">
        <div className="w-full sm:flex-1 flex items-center justify-center mb-6 sm:mb-0">
          <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center w-full max-w-xl min-h-[200px] sm:min-h-[300px] border-2 border-blue-400">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-300">Room Activities</h2>
            <p className="mb-4 sm:mb-6 text-gray-300 text-center text-base sm:text-lg">This area can be used for room-specific activities. The quiz flow has been consolidated into a single quiz page.</p>
            <p className="text-sm text-gray-400">To run a quiz, open the dedicated quiz page from the main menu.</p>
          </div>
        </div>
        <aside className="w-full sm:w-72 border-t sm:border-t-0 sm:border-l pt-4 sm:pl-6 flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-blue-300">({users.length}) Users Joined</h2>
          <div className="overflow-y-auto" style={{ maxHeight: "40vh" }}>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {users.map((user, idx) => (
                <div key={idx} className="p-2 sm:p-3 bg-gray-700 rounded shadow-sm text-gray-100 font-medium text-center text-sm sm:text-base">
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function RoomDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoomDetailsContent />
    </Suspense>
  );
}
