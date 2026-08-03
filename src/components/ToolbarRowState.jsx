/* eslint-disable react/prop-types */
import "./Toolbar.css";

/**
 * @typedef {Object} ToolbarRowStateProps
 * @property {string} title - The title of the row.
 * @property {string} label - The label for the select element.
 * @property {string} defaultValue - The default value for the select element.
 * @property {React.ReactNode} children - The options for the select element.
 * @property {React.Dispatch<React.SetStateAction<string>>} setState - Function to update the state based on the selected value.
 */
/** @param {ToolbarRowStateProps} props */
export default function ToolbarRowState({ title, label, defaultValue, children, setState }) {
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
          onChange={e => setState(e.target.value)}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
