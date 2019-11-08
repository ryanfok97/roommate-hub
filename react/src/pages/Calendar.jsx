import React, { Component } from 'react';
import GoogleApiClient from '../clients/google-api-client';
import CalendarEvent from '../components/CalendarEvent';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendars: []
        }
    }

    componentWillMount() {
        GoogleApiClient.listEvents((response) => {
            this.setState({
                calendars: response
            })
        });
    }

    renderCalendar(calendar) {
        let events = calendar.events.map((event) => (
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