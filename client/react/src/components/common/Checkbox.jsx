import React from "react";

const Checkbox = ({ name, label, onChange, checked }) => {
  return (
    <li className="list-group-item">
      <input
        className="form-check-input me-1"
        type="checkbox"
        id={name}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={name}>{label}</label>
    </li>
  );
};

export default Checkbox;
