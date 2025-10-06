export type MainMenuKey =
  | "intro"
  | "quiz"
  | "present"
  | "future"
  | "roadmap"
  | "copilot"
  | "demo"
  | "prompt_engg"
  | "ai_agents"
  | "agents_framework"
  | "mcp"
  | "a2a";

export type MainMenuItem = { key: MainMenuKey; label: string; href?: string };

export const MAIN_MENU: MainMenuItem[] = [
  { key: "intro", label: "Session Intro", href: "/about-session" },
  { key: "quiz", label: "Fun Quiz", href: "/create-quiz" },
  { key: "present", label: "Present State" },
  { key: "future", label: "Possible future state" },
  { key: "roadmap", label: "How to prepare for future?" },
  { key: "prompt_engg", label: "Prompt Engineering" },
  { key: "copilot", label: "Leveraging copilot" },
  { key: "demo", label: "A demo of copilot" },
  { key: "ai_agents", label: "AI Agents" },
  { key: "agents_framework", label: "Agents Framework" },
  { key: "mcp", label: "MCP" },
  { key: "a2a", label: "A2A protocol" },
];
