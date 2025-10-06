"use client"

import React, { useState } from "react"
import pointsJson from "./points.json"

type Point = {
  id: number
  heading: string
  description: string
}

export default function PresentPage() {
  const points: Point[] = pointsJson.points as Point[]
  const [revealedCount, setRevealedCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-8">
      <div className="w-full flex items-center mb-6">
        <div className="flex-1 flex justify-start">
          <a href="/" className="mr-4 px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200">← Back</a>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-300">AI in Software Engineering</h1>
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {points.map((p, idx) => (
            <div
              key={p.id}
              className={`group relative rounded-lg p-4 shadow-lg transition-all duration-300 ${idx < revealedCount ? 'bg-gray-800 border border-gray-700' : 'bg-gray-700/30 border border-dashed border-gray-600/30 opacity-60'}`}>
              {/* Heading always visible when revealed, otherwise show placeholder */}
              {idx < revealedCount ? (
                <>
                  <h3 className="font-semibold text-lg text-blue-200">{p.heading}</h3>

                  {/* Tooltip / popup shown while hovering the card */}
                  <div className="pointer-events-none absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 w-64 p-3 rounded bg-gray-800 text-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20">
                    <div className="text-sm">{p.description}</div>
                  </div>
                </>
              ) : (
                <div className="text-gray-400 italic">Hidden</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => setRevealedCount(c => Math.min(points.length, c + 1))}
            disabled={revealedCount >= points.length}
          >
            {revealedCount >= points.length ? 'All revealed' : 'Reveal next point'}
          </button>
        </div>
      </div>
    </div>
  )
}
