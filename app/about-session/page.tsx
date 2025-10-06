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
          "How to compete with AI" - a session on preparing ourselves for future of Software engineering. Exclusively for PDA students! 
          <br />This session is designed to introduce you to the "possible" roadmap for your future role. 
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>Session Overview - 10mins</li>
          <li>Present state of affrairs in software engineering - 15mins</li>
          <li>Possible near future (1-3 years)for software engineering - 30mins</li>
        </ul>
        <ul className="list-disc pl-6 mt-4">  
          <li>How can we be better prepared for future - 15mins</li>
          <li>Prompt Engineering and why is it important - 15mins</li>
          <li>Leveraging copilot / AI assisted development - 15mins</li>
          <li>A demo of copilot - 15mins</li>
        </ul>
        <ul className="list-disc pl-6 mt-4">   
          <li>Introduction to AI Agents - 15mins</li>
          <li>Understanding Agent Frameworks - 15mins</li>
          <li>Model Context Protocol - 15mins</li>
          <li>Agent-to-Agent Protocols - 15mins</li>
        </ul>
        <p className="mt-4">
          A free 10 weeks course on Applied LLM is also available <a href="https://github.com/simplifylearning101/LLM_beginner_course" target="_blank">here</a>
        </p>
      </div>
    </div>
  );
}
