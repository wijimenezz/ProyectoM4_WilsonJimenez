import type {
  Attachment,
  ChecklistItem,
} from "../../../taskForm/TypesTaskForm";

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
  onClick?: () => void;
}

export type ColumnId = "todo" | "in-progress" | "done" | "backlog";

export interface Task {
  id: string;
  title: string;
  description: string;

  badge: {
    label: string;
    color: BadgeColor;
  };

  deadline?: string;

  progress: number;

  assignees: Array<{
    initials: string;
    label: string;
  }>;

  checklist: ChecklistItem[];

  attachments: Attachment[];

  columnId: ColumnId;

  done?: boolean;
}
