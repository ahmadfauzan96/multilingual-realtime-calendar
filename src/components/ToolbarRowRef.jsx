/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const ToolbarRowRef = forwardRef(({ title, label, defaultValue, children }, ref) => {
  return (
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
  );
});
ToolbarRowRef.displayName = "ToolbarRowRef";
export default ToolbarRowRef;
