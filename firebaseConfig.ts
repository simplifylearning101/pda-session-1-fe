import { push } from "firebase/database";
// Helper to add a user to a room in Firebase
export async function addUserToRoom(roomKey: string, userName: string) {
  // Check if room exists
  const roomRef = ref(db, `rooms/${roomKey}`);
  const snapshot = await import("firebase/database").then(({ get }) => get(roomRef));
  if (!snapshot.exists()) {
    throw new Error("Invalid room key");
  }
  await push(ref(db, `rooms/${roomKey}/users`), { name: userName, joinedAt: Date.now() });
}
import { ref, set } from "firebase/database";
// Helper to create a room in Firebase
export async function createRoomInFirebase(roomKey: string, roomData: any) {
  await set(ref(db, `rooms/${roomKey}`), roomData);
}
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD51D3V4iaso_R5OC-5urVgrkFvF-FiBDo",
  authDomain: "pda-session-1.firebaseapp.com",
  databaseURL: "https://pda-session-1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pda-session-1",
  storageBucket: "pda-session-1.firebasestorage.app",
  messagingSenderId: "405312530247",
  appId: "1:405312530247:web:22beeb7c1b44f30bc78e62",
  measurementId: "G-QME1WM02ML"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);