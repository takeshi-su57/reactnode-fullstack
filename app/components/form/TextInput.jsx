import React from 'react';

const TextInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      className={'form-control' + (error && touched ? ' is-invalid' : '')}
      {...input}
      placeholder={label}
      type={type}
    />
    {touched &&
      ((error && <div className="invalid-feedback">{error}</div>) ||
        (warning && <div>{warning}</div>))}
  </div>
);
export { TextInput };
