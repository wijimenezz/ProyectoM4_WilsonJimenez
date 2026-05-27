import { TaskCard } from "../taskCard/TaskCard";
import { KanbanColumn } from "./KanbanColumn";
import "./KanbanBoard.css";

export const KanbanBoard = () => (
  <div className="kanban-board" aria-label="Kanban board" role="region">
    <div className="kanban-board__scroll-container">
      {/* To Do */}
      <KanbanColumn title="To Do" count={2} accent="slate">
        <li className="kanban-column__list-item">
          <TaskCard
            title="Write onboarding email sequence"
            description="Create 5-email drip sequence for new free-tier signups covering key features."
            badge={{ label: "Copy", color: "violet" }}
            deadline="Jan 12, 2026"
            progress={0}
            assignees={[{ initials: "MR", label: "Assigned to: MR" }]}
          />
        </li>
        <li className="kanban-column__list-item">
          <TaskCard
            title="Configure GitHub Actions pipeline"
            description="Set up automated testing and deployment on push to main branch."
            badge={{ label: "DevOps", color: "emerald" }}
            deadline="Jan 20, 2026"
            progress={0}
            assignees={[{ initials: "TK", label: "Assigned to: TK" }]}
          />
        </li>
      </KanbanColumn>

      {/* In Progress */}
      <KanbanColumn
        title="In Progress"
        count={2}
        accent="indigo"
        countVariant="active"
      >
        <li className="kanban-column__list-item">
          <TaskCard
            title="Redesign landing page hero section"
            description="Update the hero with new brand guidelines and improved mobile layout."
            badge={{ label: "Design", color: "indigo" }}
            deadline="Dec 18, 2025"
            progress={75}
            assignees={[
              { initials: "AL", label: "Assigned to: Alice" },
              { initials: "BK", label: "Also assigned to: Bob" },
            ]}
          />
        </li>
        <li className="kanban-column__list-item">
          <TaskCard
            title="Build REST API for user authentication"
            description="JWT-based auth with login, register, and refresh token endpoints."
            badge={{ label: "Dev", color: "emerald" }}
            deadline="Jan 5, 2026"
            progress={40}
            assignees={[{ initials: "CM", label: "Assigned to: Carlos" }]}
          />
        </li>
      </KanbanColumn>

      {/* Done */}
      <KanbanColumn title="Done" count={2} accent="emerald" countVariant="done">
        <li className="kanban-column__list-item">
          <TaskCard
            title="Set up Figma design system"
            description="Create component library with tokens, typography, and color styles."
            badge={{ label: "Design", color: "indigo" }}
            progress={100}
            progressVariant="success"
            assignees={[{ initials: "AL", label: "Assigned to: Alice" }]}
            done
          />
        </li>
        <li className="kanban-column__list-item">
          <TaskCard
            title="Stakeholder project kickoff meeting"
            description="Align team on goals, timelines, and success metrics for the redesign."
            badge={{ label: "Meeting", color: "amber" }}
            progress={100}
            progressVariant="success"
            assignees={[
              { initials: "JS", label: "Assigned to: Jane" },
              { initials: "AL", label: "Also assigned to: Alice" },
            ]}
            done
          />
        </li>
      </KanbanColumn>

      {/* Backlog */}
      <KanbanColumn title="Backlog" count={2} accent="amber">
        <li className="kanban-column__list-item">
          <TaskCard
            title="Add dark mode support across all pages"
            description="Implement system-preference-aware dark mode using CSS variables and prefers-color-scheme."
            badge={{ label: "Feature", color: "slate" }}
            progress={0}
            assignees={[]}
          />
        </li>
        <li className="kanban-column__list-item">
          <TaskCard
            title="Core Web Vitals performance audit"
            description="Run Lighthouse audits and fix LCP, FID, CLS issues across all key pages."
            badge={{ label: "Perf", color: "rose" }}
            progress={0}
            assignees={[]}
          />
        </li>
      </KanbanColumn>
    </div>
  </div>
);
