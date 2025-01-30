/* eslint-disable react/prop-types */
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
