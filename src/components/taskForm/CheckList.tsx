import { useState } from "react";
import type { ChecklistItem } from "../../types/TaskCard.Types";

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M2 2l6 6M8 2L2 8"
      stroke="#64748B"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// --- Sub-componente: ChecklistItem (una fila) ---
interface ChecklistItemRowProps {
  item: ChecklistItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const ChecklistItemRow = ({
  item,
  onToggle,
  onRemove,
}: ChecklistItemRowProps) => (
  <li className={`checklist__item${item.done ? " checklist__item--done" : ""}`}>
    <label className="checkbox-label" htmlFor={item.id}>
      <input
        className="checkbox-input"
        type="checkbox"
        id={item.id}
        checked={item.done}
        onChange={() => onToggle(item.id)}
      />
      <span className="checkbox-custom" aria-hidden="true" />
      <span className="checkbox-text">{item.text}</span>
    </label>
    <button
      className="checklist__remove"
      type="button"
      aria-label="Remove checklist item"
      onClick={() => onRemove(item.id)}
    >
      <CloseIcon />
    </button>
  </li>
);

// --- Componente principal: ChecklistField ---
interface ChecklistProps {
  items: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
}

export const Checklist = ({ items, onChange }: ChecklistProps) => {
  const [newItemText, setNewItemText] = useState("");

  const doneCount = items.filter((i) => i.done).length;
  const progress =
    items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0;

  const handleToggle = (id: string) => {
    onChange(items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  };

  const handleRemove = (id: string) => {
    onChange(items.filter((i) => i.id !== id));
  };

  const handleAdd = () => {
    if (!newItemText.trim()) return;
    onChange([
      ...items,
      { id: `cl-${Date.now()}`, text: newItemText.trim(), done: false },
    ]);
    setNewItemText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="form-group">
      {/* Header con contador */}
      <div className="checklist-header">
        <span className="form-label">Checklist</span>
        <span
          className="checklist-header__count"
          aria-label={`${doneCount} of ${items.length} items completed`}
        >
          {doneCount} / {items.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div
        className="checklist-progress"
        aria-label={`Checklist progress: ${progress}%`}
      >
        <div className="task-card__progress-bar">
          <div
            className="task-card__progress-fill"
            style={{ "--progress": `${progress}%` } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Lista de items */}
      <ul className="checklist" aria-label="Task checklist">
        {items.map((item) => (
          <ChecklistItemRow
            key={item.id}
            item={item}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        ))}
      </ul>

      {/* Input para agregar item */}
      <div className="checklist__add-row">
        <input
          className="form-input form-input--sm"
          type="text"
          placeholder="Add checklist item..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="New checklist item text"
        />
        <button
          className="checklist__add-btn"
          type="button"
          onClick={handleAdd}
          disabled={!newItemText.trim()}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 1v10M1 6h10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Add
        </button>
      </div>
    </div>
  );
};
