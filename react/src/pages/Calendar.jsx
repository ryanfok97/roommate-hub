import React, { Component } from 'react';
import Client from '../client';
import CalendarEvent from '../components/CalendarEvent';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendars: []
        }
    }

    async componentWillMount() {
        await Client.listEvents((response) => {
            this.setState({
                calendars: response
            })
        });
    }

    renderCalendar(calendar) {
        let events;
        events = calendar.events.map((event) => (
            <CalendarEvent event={event} />
        ));
        return (
            <div>
                <h3>{calendar.creator}</h3>
                {events}
            </div>
        );
    }
    
    render() {
        let calendars = this.state.calendars.map((calendar) => (
            this.renderCalendar(calendar)
        ));

        return (
            <div>
                Calendar
                
                <div>
                    {calendars}
                </div>
            </div>
        );
    }
}

export default Calendar;