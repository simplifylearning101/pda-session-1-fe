"use client";

export default function PromptsPage() {
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
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-300">LLMs and Prompt Engineering</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="text-lg leading-relaxed bg-gray-800 p-6 rounded-xl shadow-lg">
        <ul className="list-disc pl-6 mt-4">
          <li className="mt-2"><a href="https://github.com/simplifylearning101/LLM_beginner_course/blob/main/week1/01.md" target="_blank">What is an LLM?</a></li>
          <li className="mt-2"><a href="https://github.com/simplifylearning101/LLM_beginner_course/blob/main/week1/03.md" target="_blank">LLM Capabilities & Limitations.</a></li>
          <li className="mt-2">
            An effective LLM prompt is a clear, well-structured instruction or question given to a Large Language Model (LLM) to get a useful, accurate, and relevant response.
            <br />
            An effective prompt guides the LLM to produce the desired output by being specific, clear, and contextual. 

          </li>
            <li className="mt-2">
            Key Components of an Effective Prompt:
            <ul className="list-disc pl-6 mt-1">
                <li>Clarity: Use simple, straightforward language to avoid confusion. The prompt should clearly state what you want the LLM to do.</li>
                <ul className="list-disc pl-6 mt-1">
                    <li>Bad prompt: "Tell me about stuff in space." (Vague and unclear)</li>
                    <li>Good prompt: "Explain the main differences between planets and stars in our solar system." (Clear and specific)</li>
                </ul>
                
                <li>Specificity: Be precise about the task, including details like the topic, format, or scope.</li>
                <ul className="list-disc pl-6 mt-1">
                    <li>Bad prompt: Write something about history.</li>
                    <li>Good prompt:"Write a 100-word summary of the key events in the American Revolution." (Specifies topic, length, and format) </li>
                </ul>
                
                <li>Context: Provide relevant information that helps the LLM understand the task.</li>
                <ul className="list-disc pl-6 mt-1">
                    <li>Bad prompt: "Write a story" (Lacks context)</li>
                    <li>Good prompt: "Write a short story about a young girl in a futuristic city who discovers a hidden forest, written in a hopeful tone." (Provides setting, character, and tone)</li>
                </ul>
                
                <li>Constraints or Parameters: Include limits like word count, tone, audience, or format to shape the response.</li>
                <ul className="list-disc pl-6 mt-1">
                    <li>Bad prompt: Talk about climate change.(No constraints)</li>
                    <li>Good prompt: "Explain climate change in 50 words or less, using simple language suitable for a 10-year-old." (Sets length and audience)</li>
                </ul>
                <li>Examples: Provide an example of the desired output to guide the LLM, especially for creative or specific tasks (few-shot learning).</li>
                <ul className="list-disc pl-6 mt-1">
                    <li>Bad prompt: "Write a poem."(No examples)</li>
                    <li>Good prompt: "Write a four-line poem about the ocean, rhyming like this: The sky is blue / The grass is green / The clouds are new / The hills serene." (Gives a sample structure)</li>
                </ul>
                <li>
                Tone or Style: Specify the tone or style of the response (e.g., formal, informal, humorous, etc.).
                    <ul className="list-disc pl-6 mt-1">
                        <li>Bad prompt: "Describe a dog."</li>
                        <li>Good prompt: "Describe a dog in a humorous tone, as if writing for a comedy blog." (Sets tone and purpose)</li>
                    </ul>
                </li>
            </ul>
            </li>
            <li className="mt-2">
            Tips for Crafting Effective Prompts
            <ul className="list-disc pl-6 mt-1">
                <li>Be direct: Start with a verb like “explain,” “write,” or “list” to define the task.</li>
                <li>Avoid overloading: Don’t ask for too many things in one prompt; break complex tasks into steps.</li>
                <li>Test and refine: If the response isn’t what you want, tweak the prompt to be more specific or clear.</li>
                <li>Use delimiters: For complex prompts, use quotes or brackets to separate parts (e.g., “Summarize this text: [insert text here]”).</li>
                <li>Leverage the model’s strengths: LLMs are great at summarizing, explaining, or creating, so tailor prompts to these tasks</li>
            </ul>
            </li>
        </ul>

        <p className="mt-4">
        "Write a 300-word executive summary for a business report aimed at senior management. Use a formal tone and format the response as a single paragraph. Focus on the key benefits and risks of adopting cloud computing for a retail company. Include at least two benefits and two risks, supported by brief examples."
        </p>

        <p className="mt-4">
        "Explain how blockchain technology works for a beginner audience with no technical background. Use a clear and simple tone, and format the response as a 150-word paragraph. Cover the concept of decentralized ledgers and one real-world application."
        </p>

        <p className="mt-4">
        "Analyze the following sales data for a marketing team: 
            [insert data: ]. 
        Use a professional tone and format the response as a bullet-point list. Identify trends and suggest one actionable recommendation based on the data."
        </p>

      </div>
    </div>
  );
}
