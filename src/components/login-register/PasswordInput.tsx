import { useState } from "react";
import { LockIcon } from "../shared/icons";
import { EyeIcon } from "lucide-react";
import type { ChangeEvent } from "react";
interface PasswordInputProps {
  id: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
  ariaLabel?: string;

  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({
  id,
  name,
  placeholder = "••••••••",
  autoComplete = "current-password",
  ariaLabel = "Toggle password visibility",
  value,
  onChange,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="input-wrapper">
      <span className="input-wrapper__icon" aria-hidden="true">
        <LockIcon />
      </span>
      <input
        className="form-input form-input--has-toggle"
        type={show ? "text" : "password"}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-required="true"
        value={value}
        onChange={onChange}
      />
      <button
        className="input-wrapper__toggle"
        type="button"
        aria-label={ariaLabel}
        onClick={() => setShow((prev) => !prev)}
      >
        <EyeIcon />
      </button>
    </div>
  );
};
