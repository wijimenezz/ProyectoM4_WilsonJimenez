import { useRef } from "react";
import type { Attachment } from "./TypesTaskForm";

// --- Ícono de subida ---
const UploadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M14 18V10M14 10l-3 3M14 10l3 3"
      stroke="#6366F1"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 18a4 4 0 01-.5-7.97A6 6 0 0117.5 9a5 5 0 014.4 7.5"
      stroke="#94A3B8"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M10 22h8"
      stroke="#94A3B8"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

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

// --- Sub-componente: Dropzone ---

interface DropzoneProps {
  onAdd: (files: Attachment[]) => void;
}

const Dropzone = ({ onAdd }: DropzoneProps) => {
  // referencia al input file
  const inputRef = useRef<HTMLInputElement>(null);

  // cuando usuario selecciona archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    // convertir FileList → Attachment[]
    const mappedFiles: Attachment[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type.startsWith("image") ? "img" : "doc",
    }));

    // enviar archivos al padre
    onAdd(mappedFiles);
  };

  return (
    <div
      className="dropzone"
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
    >
      {/* input REAL oculto */}
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        onChange={handleFileChange}
      />

      <div className="dropzone__icon" aria-hidden="true">
        <UploadIcon />
      </div>

      <p className="dropzone__primary-text">
        Drag files here or <span className="dropzone__link">browse</span>
      </p>

      <p className="dropzone__helper-text">
        Supports PNG, JPG, PDF, DOCX up to 25 MB each
      </p>
    </div>
  );
};

// --- Sub-componente: AttachThumb (una miniatura por archivo) ---
interface AttachThumbProps {
  attachment: Attachment;
  onRemove: (id: string) => void;
}

const AttachThumb = ({ attachment, onRemove }: AttachThumbProps) => (
  <div
    className="attachment-thumb"
    aria-label={`Attachment: ${attachment.name}`}
  >
    <div
      className={`attachment-thumb__preview attachment-thumb__preview--${
        attachment.type === "img" ? "img" : "doc"
      }`}
    >
      {attachment.type === "img" ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="16"
            height="16"
            rx="2"
            stroke="#6366F1"
            strokeWidth="1.2"
          />
          <circle cx="6" cy="6.5" r="2" stroke="#6366F1" strokeWidth="1.2" />
          <path
            d="M1 12l4-4 3 3 2-2 7 5"
            stroke="#6366F1"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 1h7l4 4v12H4V1z"
            stroke="#EF4444"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M10 1v5h5"
            stroke="#EF4444"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M6 10h6M6 13h4"
            stroke="#EF4444"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
    <span className="attachment-thumb__name">{attachment.name}</span>
    <button
      className="attachment-thumb__remove"
      type="button"
      aria-label={`Remove ${attachment.name}`}
      onClick={() => onRemove(attachment.id)}
    >
      <CloseIcon />
    </button>
  </div>
);

// --- Componente principal: AttachmentsField ---
interface AttachmentsFieldProps {
  attachments: Attachment[];
  onRemove: (id: string) => void;
  onAdd: (files: Attachment[]) => void;
}

export const AttachmentsField = ({
  attachments,
  onRemove,
  onAdd,
}: AttachmentsFieldProps) => (
  <div className="form-group">
    <span className="form-label">Attachments</span>
    <Dropzone onAdd={onAdd} />
    {attachments.length > 0 && (
      <div className="attachment-previews" aria-label="Uploaded attachments">
        {attachments.map((att) => (
          <AttachThumb key={att.id} attachment={att} onRemove={onRemove} />
        ))}
      </div>
    )}
  </div>
);
