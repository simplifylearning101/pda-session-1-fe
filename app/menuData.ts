export type MainMenuKey =
  | "intro"
  | "quiz"
  | "role"
  | "future"
  | "roadmap"
  | "copilot"
  | "demo"
  | "prompt_engg"
  | "ai_agents"
  | "ai_automation"
  | "mcp"
  | "outro";

export type MainMenuItem = { key: MainMenuKey; label: string; href?: string };

export const MAIN_MENU: MainMenuItem[] = [
  { key: "intro", label: "Intro", href: "/about-session" },
  { key: "quiz", label: "Quiz", href: "/quiz" },
  { key: "role", label: "Evolution of Software Engineering", href: "/present" },
  { key: "future", label: "Future state of Software Engineering", href: "/future" },
  { key: "roadmap", label: "How to prepare for future?" },
  { key: "prompt_engg", label: "LLMs and Prompt Engineering" },
  { key: "copilot", label: "Leveraging Coding Assistants" },
  { key: "demo", label: "A Quick Demo of Copilot" },
  { key: "ai_agents", label: "Intro to AI Agents & Framework" },
  { key: "mcp", label: "MCP & A2A" },
  { key: "ai_automation", label: "AI Automation using n8n" },
  { key: "outro", label: "Outro" },
];
