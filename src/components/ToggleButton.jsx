/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const ToggleButton = forwardRef(({ label, defaultChecked, checkedTitle, uncheckedTitle }, ref) => {
  return (
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
  );
});
ToggleButton.displayName = "ToggleButton";
export default ToggleButton;
