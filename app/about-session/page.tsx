"use client";

export default function AboutSession() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-8">
      <div className="w-full flex items-center mb-6">
        <div className="flex-1 flex justify-start">
          <a
            href="/"
            className="mr-4 px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200"
          >
            ← Main App
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-300">About This Session</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="max-w-xl text-lg leading-relaxed bg-gray-800 p-6 rounded-xl shadow-lg">
        <p>
          Welcome to Applied LLM session, exclusively for PDA students! This session is designed to introduce you to the world of Applied LLMs, prompt engineering, agent frameworks, and hands-on development of AI-powered applications. You'll explore how large language models can be leveraged for interactive quizzes, and then build agents, explore agents frameworks.
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>Session Overview & Objectives</li>
          <li>Fun Quiz driven by AI</li>
          <li>Prompt Engineering Techniques</li>
          <li>Building Fullstack LLM Apps</li>
          <li>Creating and Managing AI Agents</li>
          <li>Understanding Agent Frameworks & MCP</li>
          <li>Agent-to-Agent Protocols</li>
        </ul>
        <p className="mt-4">
           A free 10 weeks course on same topic is also available <a href="https://github.com/simplifylearning101/LLM_beginner_course" target="_blank">here</a>
        </p>
      </div>
    </div>
  );
}
