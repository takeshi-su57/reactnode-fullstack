import React, { Component } from 'react';
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import dates from './dates';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export default class CalendarExample extends Component {
  render() {
    let allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);
    return (
      <div>
        <Calendar
          events={events}
          views={allViews}
          step={60}
          showMultiDayTimes
          max={dates.add(dates.endOf(new Date(2018, 17, 1), 'day'), -1, 'hours')}
          defaultDate={new Date(2018, 3, 1)}
          localizer={localizer}
        />
      </div>
    );
  }
}
