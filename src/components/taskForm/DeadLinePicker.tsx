import { CalendarIcon } from "../shared/icons";
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

<CalendarIcon />;

interface DeadlinePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const DeadlinePicker = ({ value, onChange }: DeadlinePickerProps) => (
  <div className="form-group">
    <label className="form-label" htmlFor="task-deadline">
      Deadline
    </label>
    <div className="input-wrapper">
      <span className="input-wrapper__icon" aria-hidden="true">
        <CalendarIcon />
      </span>
      <input
        className="form-input"
        type="date"
        id="task-deadline"
        name="deadline"
        value={value}
        min={localDate}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);
