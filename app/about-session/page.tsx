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
            ← Back
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-300">About Session</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="text-lg leading-relaxed bg-gray-800 p-6 rounded-xl shadow-lg">
        <p>
          "How to leverage AI" - a session on preparing ourselves for future of Software engineering - exclusively for PDA students! 
          <br />This session is designed to introduce you to the "possible" roadmap for your future role. 
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>Session Overview</li>
          <li>Warm up Quiz</li>
          <li>How software engineering is evolving</li>
          <li>What could be the future state of software engineering</li>
        </ul>
        <ul className="list-disc pl-6 mt-4">  
          <li>How can we be better prepared for future</li>
          <li>LLMs and Prompt Engineering</li>
          <li>Leveraging copilot / AI assisted development</li>
          <li>Build a full stack app using copilot</li>
        </ul>
        <ul className="list-disc pl-6 mt-4">   
          <li>Introduction to AI Agents & Agentic framework</li>
          <li>Model Context Protocol</li>
          <li>Agent-to-Agent Protocols</li>
          <li>AI Automation using n8n</li>
        </ul>
        <p className="mt-4">
          A free 10 weeks course on Applied LLM is also available <a href="https://github.com/simplifylearning101/LLM_beginner_course" target="_blank">here</a>
        </p>
      </div>
    </div>
  );
}
