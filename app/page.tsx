'use client'
import React, { useState } from "react";


type MainMenuKey = "intro" | "quiz" | "prompt_engg" | "llm_apps" | "ai_agents" | "agents_framework" | 'mcp' | 'a2a';
type SubMenuItem = { label: string; href: string };

const MAIN_MENU: { key: MainMenuKey; label: string }[] = [
  { key: "intro", label: "Session Intro" },
  { key: "quiz", label: "Fun Quiz - driven by AI" },
  { key: "prompt_engg", label: "Prompt Engineering" },
  { key: "llm_apps", label: "Fullstack LLM Apps Development" },
  { key: "ai_agents", label: "AI Agents" },
  { key: "agents_framework", label: "Agents Framework" },
  { key: "mcp", label: "MCP" },
  { key: "a2a", label: "A2A protocol" },
];

const SUB_MENU: Record<MainMenuKey, SubMenuItem[]> = {
  intro: [
    { label: "About Session", href: "/about-session" },
    { label: "About Instructor", href: "/me" },
  ],
  quiz: [
    { label: "Create Quiz", href: "/create-quiz" },
    { label: "Attempt Quiz", href: "/attempt-quiz" },
  ],
  prompt_engg: [
    { label: "Create Room", href: "/create-room" },
    { label: "Manage Rooms", href: "/manage-rooms" },
  ],
  llm_apps: [
    { label: "Create Room", href: "/create-room" },
    { label: "Manage Rooms", href: "/manage-rooms" },
  ],
  ai_agents: [
    { label: "Create Room", href: "/create-room" },
    { label: "Manage Rooms", href: "/manage-rooms" },
  ],
  agents_framework: [
    { label: "Create Room", href: "/create-room" },
    { label: "Manage Rooms", href: "/manage-rooms" },
  ],
  mcp: [
    { label: "Create Room", href: "/create-room" },
    { label: "Manage Rooms", href: "/manage-rooms" },
  ],
  a2a: [
    { label: "Create Room", href: "/create-room" },
    { label: "Manage Rooms", href: "/manage-rooms" },
  ],

};

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState<MainMenuKey>("intro");
  return (
  <div className="min-h-screen flex flex-col font-sans bg-gray-900 text-gray-100">
      {/* Header with Session Name, Github and Youtube buttons */}
  <header className="w-full flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-900 border-b border-gray-800 gap-2">
        <span className="text-2xl font-extrabold text-blue-300 tracking-wide">Session on 'Applied LLM' - for PDA</span>
        <div className="flex gap-4">
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
  <div className="flex flex-1 flex-col sm:flex-row">
        {/* Left: Session Name + Main Menu */}
  <div className="w-full sm:w-1/2 flex flex-col items-center justify-center bg-gray-800 p-4 sm:p-8 gap-6 sm:gap-8 border-b sm:border-b-0 sm:border-r border-gray-700">
    {/* Main Menu Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl h-[40vh] sm:h-auto overflow-y-auto">
      {MAIN_MENU.map(menu => (
        <button
          key={menu.key}
          onClick={() => setSelectedMenu(menu.key)}
          className={`rounded-xl shadow-lg px-8 py-8 text-2xl font-semibold transition-all duration-200 border-2 ${selectedMenu === menu.key ? "border-blue-400 bg-blue-900 text-blue-100" : "border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800"}`}
        >
          {menu.label}
        </button>
      ))}
    </div>
        </div>
        {/* Right: Sub Menu */}
  <div className="w-full sm:w-1/2 flex flex-col items-center justify-center bg-gray-900 p-4 sm:p-8 gap-6 sm:gap-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-100">Sub Menu</h2>
          <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-sm">
            {SUB_MENU[selectedMenu].map((item: SubMenuItem, idx: number) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg shadow px-6 py-6 text-lg font-medium bg-gray-800 text-gray-100 hover:bg-blue-900 border border-gray-700 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
