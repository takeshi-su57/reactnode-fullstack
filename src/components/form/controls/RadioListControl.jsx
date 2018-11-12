import React, { Component } from 'react';

export class RadioListControl extends Component {
  render() {
    const { input, meta, label, options } = this.props;
    console.log(input);
    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <div>
          {(options || []).map(item => (
            <div className="form-check form-check-inline" key={item.key}>
              <input
                {...input}
                className="form-check-input"
                type="radio"
                id={item.key}
                name={input.name}
                value={item.key}
              />
              <label className="form-check-label" htmlFor={item.key}>
                {item.value}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
