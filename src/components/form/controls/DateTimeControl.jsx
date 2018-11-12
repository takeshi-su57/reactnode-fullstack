import React, { Component } from 'react';

import DateTime from 'react-datetime';
import './react-datetime.css';

const renderInput = (props, openCalendar) => {
  const { input, meta, ...rest } = props;
  const inputClasses = `form-control ${
    meta.touched && meta.invalid ? ' is-invalid' : meta.touched && meta.valid ? ' is-valid' : ''
  }`;
  return (
    <div className="input-group datepicker-control">
      <input
        {...rest}
        id={input.name}
        name={input.name}
        type="text"
        className={inputClasses}
        onBlur={input.onBlur}
        onChange={e => {
          rest.onChange(e);
          input.onChange(e);
        }}
        onFocus={e => {
          rest.onFocus(e);
          input.onFocus(e);
        }}
        onKeyDown={rest.onKeyDown}
        onClick={rest.onClick}
      />
      <div className="input-group-append">
        <span className="input-group-text" id="basic-addon1" onClick={openCalendar}>
          <i className="fa fa-calendar" />
        </span>
      </div>
      {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
    </div>
  );
};

export class DateTimeControl extends Component {
  render() {
    const { input, meta, label } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        {/* https://github.com/YouCanBookMe/react-datetime */}
        <DateTime
          closeOnSelect={true}
          timeFormat={false}
          onChange={input.onChange}
          renderInput={renderInput}
          inputProps={{ meta, input }}
        />
      </div>
    );
  }
}
