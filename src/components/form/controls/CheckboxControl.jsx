import React, { Component } from 'react';

export class CheckboxControl extends Component {
  render() {
    const { input, meta } = this.props;
    return (
      <div className="form-group">
        <div className="form-check">
          <input {...input} id={input.name} className="form-check-input" type="checkbox" />{' '}
          <label htmlFor={input.name} className="form-check-label">
            Employed?
          </label>
        </div>
        {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
      </div>
    );
  }
}
