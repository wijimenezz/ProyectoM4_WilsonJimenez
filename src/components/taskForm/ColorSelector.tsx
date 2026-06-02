// ColorSelector.tsx
import type { BadgeColor, ColorLabelMap } from "../../types/TaskCard.Types";

const COLORS: BadgeColor[] = [
  "indigo",
  "emerald",
  "amber",
  "rose",
  "violet",
  "slate",
];

interface ColorSelectorProps {
  selected: BadgeColor;
  onChange: (color: BadgeColor) => void;
  labels: ColorLabelMap;
  onLabelChange: (color: BadgeColor, name: string) => void;
}

export const ColorSelector = ({
  selected,
  onChange,
  labels,
  onLabelChange,
}: ColorSelectorProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
      }}
    >
      {/* Swatches */}
      <div className="color-selector" aria-label="Label color selector">
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={`color-selector__swatch color-selector__swatch--${color} ${
              selected === color ? "color-selector__swatch--selected" : ""
            }`}
            title={labels[color]}
            aria-label={`${labels[color]} (${color})`}
            aria-pressed={selected === color}
            onClick={() => onChange(color)}
          >
            {selected === color && (
              <svg
                className="color-selector__check"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Input de nombre para el color seleccionado */}
      <div className="form-group">
        <label className="form-label" htmlFor={`color-label-${selected}`}>
          Name for this color
          <span className="form-label__optional"> (e.g. Urgent)</span>
        </label>
        <input
          className="form-input"
          id={`color-label-${selected}`}
          type="text"
          value={labels[selected]}
          onChange={(e) => onLabelChange(selected, e.target.value)}
          placeholder="Label name..."
          maxLength={20}
        />
      </div>
    </div>
  );
};
