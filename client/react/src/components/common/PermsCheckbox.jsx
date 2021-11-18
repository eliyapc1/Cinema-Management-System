import React from "react";

const PermsCheckbox = ({ name, label, onChange, checked }) => {
  return (
    <div className="list-group-item">
      <div className="form-check form-switch">
        <input
          className="form-check-input me-1"
          role="switch"
          type="checkbox"
          id={name}
          name={name}
          onChange={onChange}
          checked={checked}
        />
        <label class="form-check-label" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default PermsCheckbox;
