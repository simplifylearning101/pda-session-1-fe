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
    <div className="flex flex-col min-h-screen p-8">
      {/* Top section: Room Key and Leave Room Button */}
      <div className="flex flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Room Details</h1>
        <div className="flex items-center gap-4">
          <div className="p-4 border rounded bg-green-50 text-green-800 text-center min-w-[180px]">
            <span className="font-bold">Room Key:</span> {roomKey}
          </div>
          {userName && (
            <button
              onClick={handleLeaveRoom}
              className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700"
            >
              Leave Room
            </button>
          )}
        </div>
      </div>
      {/* Main content: Create Quiz Card and user list */}
      <div className="flex flex-row flex-1">
        <div className="flex-1 flex items-center justify-center">
          {/* Large Create Quiz Card with darker grey background */}
          <div className="bg-gray-300 shadow-2xl rounded-2xl p-10 flex flex-col items-center justify-center w-full max-w-xl min-h-[300px] border-2 border-blue-400">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Create a Quiz</h2>
            <p className="mb-6 text-gray-600 text-center">Start a new quiz for this room. You can add questions and customize your quiz.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200">
              Create Quiz
            </button>
          </div>
        </div>
        <aside className="w-72 border-l pl-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">({users.length}) Users Joined</h2>
          <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
            <div className="grid grid-cols-2 gap-3">
              {users.map((user, idx) => (
                <div key={idx} className="p-3 bg-gray-100 rounded shadow-sm text-gray-800 font-medium text-center">
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
