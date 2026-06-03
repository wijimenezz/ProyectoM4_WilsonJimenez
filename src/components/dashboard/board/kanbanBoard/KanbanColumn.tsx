import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "../../../shared/icons";

type ColumnAccent = "slate" | "indigo" | "emerald" | "amber";

interface KanbanColumnProps {
  title: string;
  columnId: string;
  count: number;
  accent: ColumnAccent;
  countVariant?: "default" | "active" | "done";
  onAddTask?: () => void;
  children: React.ReactNode;
}

export const KanbanColumn = ({
  title,
  columnId,
  count,
  accent,
  countVariant = "default",
  onAddTask,
  children,
}: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  const countClass = [
    "kanban-column__count",
    countVariant === "active" ? "kanban-column__count--active" : "",
    countVariant === "done" ? "kanban-column__count--done" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="kanban-column" aria-label={`${title} column`}>
      <header className="kanban-column__header">
        <div
          className={`kanban-column__accent kanban-column__accent--${accent}`}
          aria-hidden="true"
        />
        <div className="kanban-column__title-row">
          <h3 className="kanban-column__title">{title}</h3>
          <span className={countClass} aria-label={`${count} tasks`}>
            {count}
          </span>
        </div>
        <button
          className="kanban-column__options"
          type="button"
          aria-label="Column options"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="3" r="1.1" fill="#64748B" />
            <circle cx="7" cy="7" r="1.1" fill="#64748B" />
            <circle cx="7" cy="11" r="1.1" fill="#64748B" />
          </svg>
        </button>
      </header>

      <ul
        ref={setNodeRef}
        className={[
          "kanban-column__list",
          isOver ? "kanban-column__list--drag-over" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={`Tasks in ${title}`}
      >
        {children}
      </ul>

      <button
        className="kanban-column__add-task"
        type="button"
        aria-label={`Add task to ${title}`}
        onClick={onAddTask}
      >
        <PlusIcon strokeWidth={1.6} />
        Add a task
      </button>
    </section>
  );
};
