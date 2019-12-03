import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import Events from '../data/Events.json'
import AcademicCalendar from '../data/AcademicCalendar.json'

export default class CalendarPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeFilter: ""
        }

    }

    render() {
        // const localizer = momentLocalizer(moment)

        return(
            <div>
                
            </div>
        )
    }
}

