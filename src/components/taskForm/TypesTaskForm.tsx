export type SwatchColor =
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "slate";

export interface ChecklistItem {
  id: string;
  description: string;
  text: string;
  done: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: "img" | "doc";
}

export interface TaskFormData {
  title: string;
  description: string;
  color: SwatchColor;
  deadline: string;
  attachments: Attachment[];
  checklist: ChecklistItem[];
}
