interface ModalFooterProps {
  onClose?: () => void;
  onSaveDraft?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
}

export const ModalFooter = ({
  onClose,
  onSaveDraft,
  onSubmit,
  submitLabel = "Create Task",
}: ModalFooterProps) => (
  <footer className="modal__footer">
    <button className="btn btn--ghost btn--sm" type="button" onClick={onClose}>
      Cancel
    </button>
    <div className="modal__footer-right">
      <button
        className="btn btn--secondary btn--sm"
        type="button"
        onClick={onSaveDraft}
      >
        Save as draft
      </button>
      <button
        className="btn btn--primary btn--sm"
        type="button"
        onClick={onSubmit}
      >
        {submitLabel}
      </button>
    </div>
  </footer>
);
