import { CalendarIcon } from "../shared/icons";
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

<CalendarIcon />;

interface DeadlinePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const DeadlinePicker = ({ value, onChange, error }: DeadlinePickerProps) => (
  <div className="form-group">
    <label className="form-label" htmlFor="task-deadline">
      Deadline
    </label>
    <div className="input-wrapper">
      <span className="input-wrapper__icon" aria-hidden="true">
        <CalendarIcon />
      </span>
      <input
        className={`form-input ${error ? "form-input--error" : ""}`}
        type="date"
        id="task-deadline"
        name="deadline"
        value={value}
        min={localDate}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
    {error && <span className="form-error">{error}</span>}
  </div>
);
