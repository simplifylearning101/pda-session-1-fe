"use client";
import React from "react";
import { useParams } from "next/navigation";

export default function MenuPage() {
  const params = useParams();
  const key = params?.key ?? "";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100 p-8">
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
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-300">External Example </h1>
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="w-full max-w-xl">
        <div className="bg-gray-800 p-6 rounded-xl shadow text-lg">
   
        </div>
      </div>
    </div>
  );
}
