import React from 'react';

const Input = ({ label, type, value, id, onChange, required, wd }) => {
  return (
    <div className={`${wd} mb-4`}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      {type == "file" ? (
      <input
        type={type}
        className="form-control"
        id={id}
        aria-describedby="emailHelp"
        name={id}
        onChange={onChange}
        required={required}
      />):(      <input
        type={type}
        className="form-control"
        id={id}
        aria-describedby="emailHelp"
        name={id}
        value={value}
        onChange={onChange}
        required={required}
      />)}
    </div>
  );
};

export default Input;
