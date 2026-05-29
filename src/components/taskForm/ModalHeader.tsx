interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => (
  <header className="modal__header">
    <h2 className="modal__title" id="modal-title">
      {title}
    </h2>
    <button
      className="modal__close-btn"
      type="button"
      aria-label="Close modal"
      onClick={onClose}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0
         16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 3l10 10M13 3L3 13"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  </header>
);
