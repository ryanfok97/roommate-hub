import React, { Component } from 'react';
import moment from 'moment';

import Card from 'react-bootstrap/Card';

class CalendarEvent extends Component {
    formatDate(obj) {
        if (obj.date) {
            return moment(obj.date).calendar();
        } else if (obj.dateTime) {
            return moment(obj.dateTime).calendar();
        } 
    }

    render() {
        console.log('hi');
        console.log(this.props.event);
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.event.summary}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.event.organizer.email}</Card.Subtitle>
                    <Card.Text>
                        Start: {this.formatDate(this.props.event.start)} \\
                        End: {this.formatDate(this.props.event.end)}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default CalendarEvent;