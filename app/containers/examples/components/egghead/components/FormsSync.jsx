import React, { Component } from 'react';

class FormsSync extends Component {
  static availableOptions = [
    'apple',
    'grape',
    'cherry',
    'orange',
    'pear',
    'peach'
  ];

  state = { commaseperated: '', multiline: '', multiselect: [] };
  handleCommaSeparatedChange = event => {
    const { value } = event.target;
    const allVals = value
      .split(',')
      .map(v => v.trim())
      .filter(Boolean);
    this.setState({
      commaseperated: value,
      multiline: allVals.join('\n'),
      multiselect: allVals.filter(v =>
        this.constructor.availableOptions.includes(v)
      )
    });
  };

  handleMultilineChange = event => {
    const { value } = event.target;
    const allVals = value;
    this.setState({
      multiline: value,
      commaseperated: value
        .split('\n')
        .map(v => v.trim())
        .filter(Boolean)
        .join(','),
      multiselect: allVals.filter(v =>
        this.constructor.availableOptions.includes(v)
      )
    });
  };

  handleMultiSelectChange = event => {
    const allVals = Array.from(event.target.selectedOptions).map(o => o.value);
    this.setState({
      multiselect: allVals,
      commaseperated: allVals.join(','),
      multiline: allVals.join('\n')
    });
  };

  render() {
    const { commaseperated, multiline, multiselect } = this.state;
    return (
      <div className="container">
        <div className="form-group">
          <label>Comma seperated</label>
          <input
            value={commaseperated}
            onChange={this.handleCommaSeparatedChange}
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Multiline</label>
          <textarea
            columns={this.constructor.availableOptions}
            value={multiline}
            onChange={this.handleMultilineChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Multiselect</label>
          <select
            value={multiselect}
            onChange={this.handleMultiSelectChange}
            size={this.constructor.availableOptions.length}
            multiple
            className="form-control"
            name="multiselect"
            id="multiselect"
          >
            {this.constructor.availableOptions.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export { FormsSync };
