// src/features/tasks/types/task.types.ts

// ─── Colores ──────────────────────────────────────────────────────
export type BadgeColor =
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "slate";

// Nombres personalizados por usuario para cada color
export type ColorLabelMap = Record<BadgeColor, string>;

export const DEFAULT_COLOR_LABELS: ColorLabelMap = {
  indigo: "General",
  emerald: "Completado",
  amber: "En progreso",
  rose: "Urgente",
  violet: "Revisión",
  slate: "Backlog",
};

// ─── Columnas ─────────────────────────────────────────────────────
export type ColumnId = "todo" | "in-progress" | "in-review" | "done";

// ─── Checklist ────────────────────────────────────────────────────
export interface ChecklistItem {
  id: string;
  description?: string;
  text: string; // usa solo "text", elimina "description" que era duplicado
  done: boolean;
}

// ─── Attachment ───────────────────────────────────────────────────
export interface Attachment {
  id: string;
  name: string;
  url: string; // URL de Firebase Storage — obligatorio para persistencia
  type: "image" | "doc"; // "img" → "image" para ser más explícito
}

// ─── Formulario (lo que el usuario llena en el modal) ─────────────
export interface TaskFormData {
  title: string;
  description: string;
  color: BadgeColor;
  colorLabel: string; // nombre personalizado del color seleccionado
  deadline: string;
  attachments: Attachment[];
  checklist: ChecklistItem[];
}

// ─── Tarea completa (lo que vive en Firestore) ────────────────────
export interface Task {
  id: string;
  title: string;
  description: string;
  badge: {
    label: string; // viene de colorLabel del form
    color: BadgeColor;
  };
  deadline?: string;
  progress: number; // calculado: checklist done / total * 100
  assignees: Array<{ initials: string; label: string }>;
  checklist: ChecklistItem[];
  attachments: Attachment[];
  columnId: ColumnId;
  done?: boolean;
  createdAt?: number;
}
