import { forwardRef, type JSX } from "react";
import type { ToolbarRowProps } from "./Toolbar.tsx";
import "./Toolbar.css";

interface ToolbarRowRefProps extends ToolbarRowProps {}

const ToolbarRowRef = forwardRef<HTMLSelectElement, ToolbarRowRefProps>(
  ({ title, label, defaultValue, children }, ref): JSX.Element => (
    <div className="row">
      <div className="col-25">
        <label htmlFor={label}>{title}</label>
      </div>
      <div className="col-75">
        <select name={label} id={label} defaultValue={defaultValue} ref={ref}>
          {children}
        </select>
      </div>
    </div>
  ),
);
ToolbarRowRef.displayName = "ToolbarRowRef";
export default ToolbarRowRef;
