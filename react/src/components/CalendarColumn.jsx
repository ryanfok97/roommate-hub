import React, { Component } from 'react';
import _ from 'lodash';
import CalendarEvent from './CalendarEvent';

class CalendarColumn extends Component {
  render() {
    return (
      <div style={{ position: 'relative' }}>
        {_.map(this.props.events, (event, i) => (
          <CalendarEvent event={event} key={i} />
        ))}
      </div>
    );
  }
}

export default CalendarColumn;