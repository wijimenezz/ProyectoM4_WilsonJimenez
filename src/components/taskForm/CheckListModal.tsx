import { useState } from "react";

import { Checklist } from "./CheckList";
import type { ChecklistItem } from "../../types/TaskCard.Types";

interface ChecklistModalProps {
  title: string;
  description: string;

  checklist: ChecklistItem[];

  onClose: () => void;

  onSave: (checklist: ChecklistItem[]) => void;
}

export const ChecklistModal = ({
  title,
  description,
  checklist,
  onClose,
  onSave,
}: ChecklistModalProps) => {
  const [items, setItems] = useState<ChecklistItem[]>(checklist);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <article className="modal">
        <header className="modal__header">
          <div>
            <h2 className="modal__title">{title}</h2>
            <p className="modal__description">{description}</p>
          </div>

          <button
            className="btn btn--secondary btn--sm"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </header>

        <div className="modal__body">
          <Checklist items={items} onChange={setItems} />
        </div>

        <footer className="modal__footer">
          <button
            className="btn btn--ghost btn--sm"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn--primary btn--sm"
            type="button"
            onClick={() => onSave(items)}
          >
            Save
          </button>
        </footer>
      </article>
    </div>
  );
};

export default ChecklistModal;
