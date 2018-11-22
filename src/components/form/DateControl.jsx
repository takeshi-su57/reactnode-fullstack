import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

export class DateControl extends Component {
  state = {
    date: null,
    focused: false,
  };
  render() {
    const { input } = this.props;
    return (
      <SingleDatePicker
        date={this.state.date} // momentPropTypes.momentObj or null
        onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id={input.name} // PropTypes.string.isRequired,
      />
    );
  }
}
