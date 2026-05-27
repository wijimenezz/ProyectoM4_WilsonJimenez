export type BadgeColor =
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "slate";

export interface TaskCardProps {
  title: string;
  description: string;
  badge: { label: string; color: BadgeColor };
  deadline?: string;
  progress: number;
  progressVariant?: "default" | "success" | "danger";
  assignees: Array<{ initials: string; label: string }>;
  commentCount?: number;
  overdue?: boolean;
  done?: boolean;
}
