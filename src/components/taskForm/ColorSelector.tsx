import { CheckIcon } from "../shared/icons";
import type { SwatchColor } from "./TypesTaskForm";

//Esto General el color de la tarea, luego hay que colocarle accion

const SWATCH_COLORS: SwatchColor[] = [
  "indigo",
  "emerald",
  "amber",
  "rose",
  "violet",
  "slate",
];

<CheckIcon />;

interface ColorSelectorProps {
  selected: SwatchColor;
  onChange: (color: SwatchColor) => void;
}

export const ColorSelector = ({ selected, onChange }: ColorSelectorProps) => (
  <div
    className="color-selector"
    role="group"
    aria-labelledby="color-selector-label"
  >
    {SWATCH_COLORS.map((c) => (
      <button
        key={c}
        className={`color-selector__swatch color-selector__swatch--${c}${
          selected === c ? " color-selector__swatch--selected" : ""
        }`}
        type="button"
        aria-label={c.charAt(0).toUpperCase() + c.slice(1)}
        aria-pressed={selected === c}
        onClick={() => onChange(c)}
      >
        {selected === c && <CheckIcon />}
      </button>
    ))}
  </div>
);
