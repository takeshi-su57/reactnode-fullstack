import React, { Component } from 'react';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

const FORMAT = 'dd/MM/yyyy';

const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

const formatDate = (date, format, locale) => {
  return dateFnsFormat(date, format, { locale });
};

export class DateInput extends Component {
  static opened;
  constructor() {
    super();
    this.calref = React.createRef();
  }

  toggle = () => {
    if (this.opened) {
      this.calref.hideDayPicker();
      this.opened = false;
    } else {
      this.calref.showDayPicker();
      this.opened = true;
    }
  };

  render() {
    // onChange from form field bound to datepicker onDayChange event
    const { input, meta } = this.props;

    return (
      <DayPickerInput
        formatDate={formatDate}
        format={FORMAT}
        parseDate={parseDate}
        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
        ref={this.calref}
        onDayChange={input.onChange}
        classNames={{ container: 'input-group' }}
        component={props => <DatepickerInputAdapter {...props} />}
        inputProps={{ toggle: this.toggle, ...{ input }, ...{ meta } }}
      />
    );
  }
}

class DatepickerInputAdapter extends Component {
  render() {
    // const { input, meta, toggle } = this.props;
    const { valid, invalid, touched, error, toggle, ...rest } = this.props;
    return (
      <>
        {JSON.stringify(this.props)}
        <input className={`form-control ${touched ? invalid && 'is-invalid' : valid && 'is-valid'}`} {...rest} />
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon1" onClick={() => toggle()}>
            <i className="fa fa-calendar" />
          </span>
        </div>
        {touched && error && <div className="invalid-feedback">{error}</div>}
      </>
    );
  }
}
