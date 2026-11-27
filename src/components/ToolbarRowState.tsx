import type { ChangeEvent, Dispatch, JSX, SetStateAction } from "react";
import type { ToolbarRowProps } from "./Toolbar.tsx";
import "./Toolbar.css";

interface ToolbarRowStateProps extends ToolbarRowProps {
  /** Function to update the state based on the selected value. */
  setState: Dispatch<SetStateAction<string>>;
}

export default function ToolbarRowState({
  title,
  label,
  defaultValue,
  children,
  setState,
}: ToolbarRowStateProps): JSX.Element {
  return (
    <div className="row">
      <div className="col-25">
        <label htmlFor={label}>{title}</label>
      </div>
      <div className="col-75">
        <select
          name={label}
          id={label}
          defaultValue={defaultValue}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setState(e.target.value)}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
