"use client"

import React, { useState } from "react"
import { BACKEND_URL } from "../config"
import questionsJson from "./questions.json"

type Question = {
  id: number
  text: string
  options: string[]
}

const QUESTIONS: Question[] = (questionsJson.questions as Question[])

export default function QuizPage() {
  const [revealed, setRevealed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [secret, setSecret] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)

  async function verifyAdmin(secretKey: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${BACKEND_URL}/api/verify-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey }),
      })
      if (!res.ok) {
        throw new Error(`server responded ${res.status}`)
      }
      const data = await res.json()
      return !!data?.valid
    } catch (err) {
      console.error(err)
      setError("Network or server error while verifying admin.")
      return false
    } finally {
      setLoading(false)
    }
  }

  async function onSubmitSecret(e: React.FormEvent) {
    e.preventDefault()
    const ok = await verifyAdmin(secret)
    if (ok) {
      setRevealed(true)
      setModalOpen(false)
      setSecret("")
    } else {
      setError("Invalid admin password")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-8">
      <div className="w-full flex items-center mb-6">
        <div className="flex-1 flex justify-start">
          <a
            href="/"
            className="mr-4 px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200"
          >
            ← Back
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-300">AI — Quiz</h1>
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="w-full max-w-3xl text-lg leading-relaxed bg-gray-800 p-6 rounded-xl shadow-lg">
        {!revealed ? (
          <div className="rounded-lg border border-dashed border-gray-700 bg-gray-800 p-6 text-center">
            <p className="mb-4 text-gray-300">The quiz is currently hidden. You will be able to view and answer once an instructor reveals it.</p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={() => setModalOpen(true)}
              >
                Reveal Quiz (Admin only)
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {!submitted ? (
              <div>
                {/* Single question view */}
                {QUESTIONS[current] && (
                  <div className="bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-800">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold mb-2 text-gray-100">{QUESTIONS[current].id}. {QUESTIONS[current].text}</h3>
                      <span className="text-sm text-gray-400">{current + 1} / {QUESTIONS.length}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {QUESTIONS[current].options.map((opt, idx) => (
                        <label key={idx} className={`flex items-center gap-3 p-3 border rounded hover:bg-gray-900 ${answers[QUESTIONS[current].id] === opt ? 'border-indigo-500 bg-gray-800' : 'border-gray-700'}`}>
                          <input
                            type="radio"
                            name={`q-${QUESTIONS[current].id}`}
                            value={opt}
                            className="form-radio text-indigo-400"
                            checked={answers[QUESTIONS[current].id] === opt}
                            onChange={() => setAnswers(prev => ({ ...prev, [QUESTIONS[current].id]: opt }))}
                          />
                          <span className="text-gray-200">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    className="px-4 py-2 rounded border border-gray-700"
                    onClick={() => setCurrent(i => Math.max(0, i - 1))}
                    disabled={current === 0}
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      className="px-4 py-2 rounded border border-gray-700"
                      onClick={() => setCurrent(i => Math.min(QUESTIONS.length - 1, i + 1))}
                      disabled={current === QUESTIONS.length - 1}
                    >
                      Next
                    </button>

                    {current === QUESTIONS.length - 1 ? (
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        onClick={() => {
                          // simple submit behaviour for now
                          setSubmitted(true)
                          console.log('submitted answers', answers)
                        }}
                      >
                        Submit Responses
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 text-center">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Thanks — Responses submitted</h3>
                <p className="text-gray-300 mb-4">Students' selections have been recorded (local demo). You can wire this to a backend to persist answers.</p>
                <div className="flex justify-center">
                  <a href="/" className="px-4 py-2 bg-blue-700 text-white rounded">Return to Home</a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-gray-800 text-gray-100 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-3">Admin verification</h2>
              <form onSubmit={onSubmitSecret}>
                <label className="block text-sm text-gray-300 mb-2">Enter admin password</label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="w-full rounded bg-gray-900 border border-gray-700 text-gray-100 px-3 py-2 mb-3"
                  required
                />

                {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => { setModalOpen(false); setError(null); }} className="px-4 py-2 rounded border border-gray-700">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Reveal"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
