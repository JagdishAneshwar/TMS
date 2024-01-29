import React from 'react'

const Input = ({label, type, value, id, onChange, require, wd}) => {
  return (
    <div className={`${wd} mb-4`}>
    <label htmlfor="name" className="form-label">
      {label}
    </label>
    <input
      type={type}
      className="form-control"
      id={id}
      aria-describedby="emailHelp"
      name={id}
      value={value}
      onChange={onChange}
      required={require}
    />
  </div>
  )
}

export default Input