"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BACKEND_URL } from "../config";

export default function CreateQuiz() {
  const [topics, setTopics] = useState(["", "", "", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const roomKey = searchParams.get("roomKey");

  const handleTopicChange = (idx: number, value: string) => {
    const newTopics = [...topics];
    newTopics[idx] = value;
    setTopics(newTopics);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!topics[0].trim() || !topics[1].trim()) {
      setError("Please enter topics for the first two fields. They are mandatory.");
      setSubmitted(false);
      return;
    }
    if (!roomKey) {
      setError("Room key not found. Please access this page from room details.");
      setSubmitted(false);
      return;
    }
  fetch(`${BACKEND_URL}/api/create-quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomKey, topics }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to create quiz");
        }
        setSuccess("Quiz topics saved successfully!");
        setSubmitted(true);
      })
      .catch((err) => {
        setError(err.message);
        setSubmitted(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-8">
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
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-300">Create Quiz</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg flex flex-col items-center">
        <h2 className="text-xl font-bold mb-6 text-blue-300">Enter 5 Topics for Your Quiz</h2>
        <div className="w-full flex flex-col gap-4 mb-6">
          {topics.map((topic, idx) => (
            <input
              key={idx}
              type="text"
              value={topic}
              onChange={e => handleTopicChange(idx, e.target.value)}
              className="border rounded px-3 py-2 text-lg bg-gray-900 text-gray-100"
              placeholder={`Topic ${idx + 1}${idx < 2 ? ' (required)' : ''}`}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200"
        >
          Submit
        </button>
        {submitted && (
          <>
            {success ? (
              <div className="mt-4 text-green-400 font-semibold">{success}</div>
            ) : null}
            {error ? (
              <div className="mt-4 text-red-400 font-semibold">{error}</div>
            ) : null}
          </>
        )}
      </form>
    </div>
  );
}
