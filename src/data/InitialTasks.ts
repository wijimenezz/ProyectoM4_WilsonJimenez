import type { Task } from "../types/TaskCard.Types";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Write onboarding email sequence",
    description:
      "Create 5-email drip sequence for new free-tier signups covering key features.",
    badge: { label: "Copy", color: "violet" },
    deadline: "Jan 12, 2026",
    progress: 0,
    assignees: [{ initials: "MR", label: "Assigned to: MR" }],
    columnId: "todo",
  },
  {
    id: "2",
    title: "Configure GitHub Actions pipeline",
    description:
      "Set up automated testing and deployment on push to main branch.",
    badge: { label: "DevOps", color: "emerald" },
    deadline: "Jan 20, 2026",
    progress: 0,
    assignees: [{ initials: "TK", label: "Assigned to: TK" }],
    columnId: "todo",
  },
  {
    id: "3",
    title: "Redesign landing page hero section",
    description:
      "Update the hero with new brand guidelines and improved mobile layout.",
    badge: { label: "Design", color: "indigo" },
    deadline: "Dec 18, 2025",
    progress: 75,
    assignees: [
      { initials: "AL", label: "Assigned to: Alice" },
      { initials: "BK", label: "Also assigned to: Bob" },
    ],
    columnId: "in-progress",
  },
  {
    id: "4",
    title: "Build REST API for user authentication",
    description:
      "JWT-based auth with login, register, and refresh token endpoints.",
    badge: { label: "Dev", color: "emerald" },
    deadline: "Jan 5, 2026",
    progress: 40,
    assignees: [{ initials: "CM", label: "Assigned to: Carlos" }],
    columnId: "in-progress",
  },
  {
    id: "5",
    title: "Set up Figma design system",
    description:
      "Create component library with tokens, typography, and color styles.",
    badge: { label: "Design", color: "indigo" },
    progress: 100,
    assignees: [{ initials: "AL", label: "Assigned to: Alice" }],
    columnId: "done",
    done: true,
  },
  {
    id: "6",
    title: "Stakeholder project kickoff meeting",
    description: "Align team on goals, timelines, and success metrics.",
    badge: { label: "Meeting", color: "amber" },
    progress: 100,
    assignees: [
      { initials: "JS", label: "Assigned to: Jane" },
      { initials: "AL", label: "Also assigned to: Alice" },
    ],
    columnId: "done",
    done: true,
  },
  {
    id: "7",
    title: "Add dark mode support across all pages",
    description:
      "Implement system-preference-aware dark mode using CSS variables.",
    badge: { label: "Feature", color: "slate" },
    progress: 0,
    assignees: [],
    columnId: "backlog",
  },
  {
    id: "8",
    title: "Core Web Vitals performance audit",
    description: "Run Lighthouse audits and fix LCP, FID, CLS issues.",
    badge: { label: "Perf", color: "rose" },
    progress: 0,
    assignees: [],
    columnId: "backlog",
  },
];
