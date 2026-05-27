interface ProgressBarProps {
  value: number; // 0-100
  variant?: "default" | "success" | "danger";
  label?: string;
}

export const ProgressBar = ({
  value,
  variant = "default",
  label,
}: ProgressBarProps) => {
  const fillClass = [
    "task-card__progress-fill",
    variant === "success" ? "task-card__progress-fill--success" : "",
    variant === "danger" ? "task-card__progress-fill--danger" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      className="task-card__progress"
      aria-label={label ?? `Progress: ${value}%`}
    >
      <div className="task-card__progress-bar">
        <div
          className={fillClass}
          style={{ "--progress": `${value}%` } as React.CSSProperties}
        />
      </div>
      <span className="task-card__progress-label">{value}%</span>
    </div>
  );
};
