import React, { Component } from 'react';
import Client from '../client/client';
import CalendarEvent from '../components/CalendarEvent';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        }
    }

    async componentWillMount() {
        await Client.listEvents((response) => {
            this.setState({
                events: response
            })
        });
    }
    
    render() {
        let events;
        if (this.state && this.state.events) {
            events = this.state.events.map((event) => (
                <CalendarEvent event={event} />
            ));
        } else {
            events = <div>No events!</div>
        }

        return (
            <div>
                Calendar
                
                <div>
                    {events}
                </div>
            </div>
        );
    }
}

export default Calendar;