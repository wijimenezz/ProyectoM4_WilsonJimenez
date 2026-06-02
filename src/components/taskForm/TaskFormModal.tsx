import "./TaskFormModal.css";
import { useState } from "react";
import { ModalHeader } from "./ModalHeader";
import { ColorSelector } from "./ColorSelector";
import { DeadlinePicker } from "./DeadLinePicker";
import { AttachmentsField } from "./Attachment";
import { Checklist } from "./CheckList";
import { ModalFooter } from "./ModalFooter";
import type {
  Attachment,
  BadgeColor,
  ChecklistItem,
  ColorLabelMap,
  TaskFormData,
} from "../../types/TaskCard.Types";
import { DEFAULT_COLOR_LABELS } from "../../types/TaskCard.Types";

interface TaskFormModalProps {
  onClose?: () => void;
  onSubmit?: (data: TaskFormData) => void;
}

export const TaskFormModal = ({ onClose, onSubmit }: TaskFormModalProps) => {
  // --- Estado del formulario ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<BadgeColor>("indigo");
  const [colorLabels, setColorLabels] = useState<ColorLabelMap>({
    ...DEFAULT_COLOR_LABELS,
  });
  const [deadline, setDeadline] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  // --- Handlers ---
  const handleLabelChange = (c: BadgeColor, name: string) => {
    setColorLabels((prev) => ({ ...prev, [c]: name }));
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAttachments = (newFiles: Attachment[]) => {
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const handleSubmit = () => {
    const data: TaskFormData = {
      title,
      description,
      color,
      colorLabel: colorLabels[color],
      deadline,
      attachments,
      checklist,
    };
    onSubmit?.(data);
    onClose?.();
  };

  const handleSaveDraft = () => {
    console.log("Draft saved:", {
      title,
      description,
      color,
      colorLabel: colorLabels[color],
      deadline,
      attachments,
      checklist,
    });
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
        {/* Cabecera */}
        <ModalHeader title="Create New Task" onClose={onClose} />

        {/* Cuerpo */}
        <div className="modal__body">
          <form
            className="task-form"
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Título */}
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

            {/* Descripción */}
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

            {/* Color + Deadline */}
            <div className="form-row form-row--two-col">
              <div className="form-group">
                <span className="form-label" id="color-selector-label">
                  Label color
                </span>
                <ColorSelector
                  selected={color}
                  onChange={setColor}
                  labels={colorLabels}
                  onLabelChange={handleLabelChange}
                />
              </div>
              <DeadlinePicker value={deadline} onChange={setDeadline} />
            </div>

            {/* Adjuntos */}
            <AttachmentsField
              attachments={attachments}
              onRemove={handleRemoveAttachment}
              onAdd={handleAddAttachments}
            />

            {/* Checklist */}
            <Checklist items={checklist} onChange={setChecklist} />
          </form>
        </div>

        {/* Pie */}
        <ModalFooter
          onClose={onClose}
          onSaveDraft={handleSaveDraft}
          onSubmit={handleSubmit}
        />
      </article>
    </div>
  );
};

export default TaskFormModal;
