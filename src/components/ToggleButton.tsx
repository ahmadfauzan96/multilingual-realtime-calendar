import { forwardRef, type JSX } from "react";
import "./ToggleButton.css";

interface ToggleButtonProps {
  /** The label for the toggle. */
  label: string;
  /** The default checked state. */
  defaultChecked: boolean;
  /** The title for the checked state. */
  checkedTitle: string;
  /** The title for the unchecked state. */
  uncheckedTitle: string;
}

const ToggleButton = forwardRef<HTMLInputElement, ToggleButtonProps>(
  ({ label, defaultChecked, checkedTitle, uncheckedTitle }, ref): JSX.Element => (
    <div className="can-toggle can-toggle--size-small demo-rebrand-1">
      <input id={label} name={label} type="checkbox" defaultChecked={defaultChecked} ref={ref} />
      <label htmlFor={label}>
        <div
          className="can-toggle__switch"
          data-checked={checkedTitle}
          data-unchecked={uncheckedTitle}
        />
      </label>
    </div>
  ),
);
ToggleButton.displayName = "ToggleButton";
export default ToggleButton;
