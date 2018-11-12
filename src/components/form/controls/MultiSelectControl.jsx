import React, { Component } from 'react';

export class MultiSelectControl extends Component {
  render() {
    const { input, meta, label, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <select
          {...input}
          id={input.name}
          name={input.name}
          className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
          multiple
        >
          {(options || []).map(option => (
            <option key={option.key}>{option.value}</option>
          ))}
        </select>
        {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
      </div>
    );
  }
}
