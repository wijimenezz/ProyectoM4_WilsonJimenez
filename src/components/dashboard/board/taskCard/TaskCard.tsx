import "./TaskCard.css";
import { Avatar } from "../../../avatar";
import {
  ClockIcon,
  CommentIcon,
  DotsVerticalIcon,
} from "../../../shared/icons";
import { ProgressBar } from "./ProgressBar";
import type { BadgeColor, TaskCardProps } from "./TaskCard.Types";

const TaskBadge = ({ color, label }: { color: BadgeColor; label: string }) => (
  <span className={`task-card__badge task-card__badge--${color}`}>{label}</span>
);

export const TaskCard = ({
  title,
  description,
  badge,
  deadline,
  progress,
  progressVariant = "default",
  assignees,
  commentCount,
  overdue = false,
  done = false,
  onClick,
}: TaskCardProps) => {
  const cardClass = [
    "task-card",
    overdue ? "task-card--overdue" : "",
    done ? "task-card--done" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={cardClass}
      aria-label={`Task: ${title}`}
      onClick={onClick}
    >
      <header className="task-card__header">
        <TaskBadge color={badge.color} label={badge.label} />
        <button
          className="task-card__menu-btn"
          type="button"
          aria-label="Task options menu"
          aria-haspopup="true"
        >
          <DotsVerticalIcon size={14} />
        </button>
      </header>

      <div className="task-card__body">
        <h3 className="task-card__title">{title}</h3>
        <p className="task-card__description">{description}</p>
      </div>

      {deadline && (
        <div
          className={`task-card__deadline${overdue ? " task-card__deadline--overdue" : ""}`}
          aria-label={`Deadline: ${deadline}${overdue ? " (overdue)" : ""}`}
        >
          <ClockIcon color={overdue ? "currentColor" : "#64748B"} />
          <span className="task-card__deadline-text">{deadline}</span>
          {overdue && <span className="task-card__overdue-badge">Overdue</span>}
        </div>
      )}

      <ProgressBar value={progress} variant={progressVariant} />

      <footer className="task-card__footer">
        <div className="task-card__avatar-stack">
          {assignees.length === 0 ? (
            <Avatar initials="" size="sm" unassigned label="Unassigned" />
          ) : (
            assignees.map((a, i) => (
              <Avatar
                key={i}
                initials={a.initials}
                size="sm"
                offset={i > 0}
                label={a.label}
              />
            ))
          )}
        </div>
        {commentCount !== undefined && (
          <span
            className="task-card__comments-count"
            aria-label={`${commentCount} comments`}
          >
            <CommentIcon />
            {commentCount}
          </span>
        )}
      </footer>
    </article>
  );
};
