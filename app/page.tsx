"use client"
import React from "react";
import { MAIN_MENU } from "./menuData";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-900 text-gray-100">
      {/* Header with Session Name, Github and Youtube buttons */}
  <header className="w-full flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-900 border-b border-gray-800 gap-2 sticky top-0 z-50">
        <span className="text-2xl font-extrabold text-blue-300 tracking-wide">Session on 'Preparing for future' - exclusively for PDA students</span>
        <div className="flex gap-4">
          <a
            href="/me"
            className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-900 transition-all duration-200"
          >
            Instructor profile
          </a>
          <a
            href="https://github.com/simplifylearning101"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-900 transition-all duration-200"
          >
            Github
          </a>
          <a
            href="https://youtu.be/8IU-1ijRIiw?feature=shared"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-900 transition-all duration-200"
          >
            Youtube
          </a>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center p-8">
  <div className="w-full max-w-4xl sticky top-20">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Main Menu</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {MAIN_MENU.map(menu => (
              <a
                key={menu.key}
                href={menu.href ?? `/menu/${menu.key}`}
                className="rounded-xl shadow-lg px-8 py-8 text-2xl font-semibold transition-all duration-200 border-2 border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800 flex items-center justify-center text-center"
              >
                {menu.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
