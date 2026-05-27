import "./TaskFormModal.css";
import { useState } from "react";
import type {
  Attachment,
  ChecklistItem,
  SwatchColor,
  TaskFormData,
} from "./TypesTaskForm";
import { ModalHeader } from "./ModalHeader";
import { ColorSelector } from "./ColorSelector";
import { DeadlinePicker } from "./DeadLinePicker";
import { AttachmentsField } from "./Attachment";
import { Checklist } from "./CheckList";
import { ModalFooter } from "./ModalFooter";

interface TaskFormModalProps {
  onClose?: () => void;
  onSubmit?: (data: TaskFormData) => void;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: "cl-1", text: "Review existing wireframes", done: true },
  { id: "cl-2", text: "Create initial mockup in Figma", done: true },
  { id: "cl-3", text: "Get stakeholder feedback", done: false },
  { id: "cl-4", text: "Implement revisions", done: false },
  { id: "cl-5", text: "Final design handoff to dev", done: false },
];

const INITIAL_ATTACHMENTS: Attachment[] = [
  { id: "att-1", name: "wireframe.png", type: "img" },
  { id: "att-2", name: "brief.pdf", type: "doc" },
];

export const TaskFormModal = ({ onClose, onSubmit }: TaskFormModalProps) => {
  // --- Estado del formulario ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<SwatchColor>("indigo");
  const [deadline, setDeadline] = useState("");
  const [attachments, setAttachments] =
    useState<Attachment[]>(INITIAL_ATTACHMENTS);
  const [checklist, setChecklist] =
    useState<ChecklistItem[]>(INITIAL_CHECKLIST);

  // --- Handlers ---
  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = () => {
    onSubmit?.({ title, description, color, deadline, attachments, checklist });
    onClose?.();
  };

  // --- Render ---
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <article className="modal">
        {/* ① Cabecera: título + botón cerrar */}
        <ModalHeader title="Create New Task" onClose={onClose} />

        {/* ② Cuerpo: el formulario */}
        <div className="modal__body">
          <form
            className="task-form"
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Campo: título */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-title">
                Task title
              </label>
              <input
                className="form-input form-input--lg"
                type="text"
                id="task-title"
                name="title"
                placeholder="Enter a clear task title..."
                aria-required="true"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Campo: descripción */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-description">
                Description
              </label>
              <textarea
                className="form-textarea"
                id="task-description"
                name="description"
                placeholder="Add details, context, acceptance criteria..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Fila: color + fecha límite */}
            <div className="form-row form-row--two-col">
              <div className="form-group">
                <span className="form-label" id="color-selector-label">
                  Label color
                </span>
                {/* ③ Átomo: selector de color */}
                <ColorSelector selected={color} onChange={setColor} />
              </div>
              {/* ④ Átomo: selector de fecha */}
              <DeadlinePicker value={deadline} onChange={setDeadline} />
            </div>

            {/* ⑤ Molécula: adjuntos */}
            <AttachmentsField
              attachments={attachments}
              onRemove={handleRemoveAttachment}
            />

            {/* ⑥ Molécula: checklist */}
            <Checklist items={checklist} onChange={setChecklist} />
          </form>
        </div>

        {/* ⑦ Pie: botones de acción */}
        <ModalFooter
          onClose={onClose}
          onSaveDraft={() => console.log("draft saved")}
          onSubmit={handleSubmit}
        />
      </article>
    </div>
  );
};

export default TaskFormModal;
