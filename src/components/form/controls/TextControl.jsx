import React, { Component } from 'react';

export class TextControl extends Component {
  render() {
    const { input, meta, placeholder, label } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <input
          {...input}
          type="text"
          className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
          id={input.name}
          placeholder={placeholder}
        />
        {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
      </div>
    );
  }
}
