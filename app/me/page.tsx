"use client";

export default function AboutInstructor() {
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
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-300">About Instructor</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="max-w-xl text-lg leading-relaxed bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <p>
          We are Simplify Learning, an edtech company dedicated to making AI and coding accessible for everyone.
        </p>
        <p className="mt-2">
          Our mission is to empower learners with practical, hands-on courses in AI, LLMs, and modern software development.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <a
            href="https://github.com/simplifylearning101"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200"
          >
            Visit our Github
          </a>
          <a
            href="https://youtu.be/8IU-1ijRIiw?feature=shared"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-all duration-200"
          >
            Visit our Youtube
          </a>
        </div>
      </div>
    </div>
  );
}
