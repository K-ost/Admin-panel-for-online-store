import React from 'react'

interface InputInterface {
  type: string
  value?: string
  error?: any
  placeholder: string
  func?: any
}

const InputField: React.FC<InputInterface> = ({ error, func, placeholder, type, value }) => {
  return (
    <div className="form-field">
      <label className="form-label">{placeholder}</label>
      <input
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        defaultValue={value}
        placeholder={placeholder}
        {...func}
      />
      {error && <div className="form-text text-danger">{error}</div>}
    </div>
  )
}

export default InputField