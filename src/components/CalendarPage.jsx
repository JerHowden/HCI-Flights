import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Grid } from '@material-ui/core'

import Events from '../data/Events.json'
import AcademicCalendar from '../data/AcademicCalendar.json'
import './CalendarPage.css'

export default class CalendarPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeFilter: ""
        }

    }

    componentDidMount() {
        // Map Academic Events into Calendar

        // Map Sports Events into Calendar

        // Map Events into Calendar

    }

    render() {
        // const localizer = momentLocalizer(moment)

        return(
            <div id="CalendarPage">
                <Grid container spacing={1} direction="row" justify='space-evenly' alignItems='center'>
                    <Grid item lg={5} style={{width: '100%', height: '100%', backgroundColor: 'black', color: 'white'}}>
                        bruh
                    </Grid>
                    <Grid item lg={5} style={{width: '100%', height: '100%', backgroundColor: 'black', color: 'white'}}>
                        moment
                    </Grid>
                </Grid>
            </div>
        )
    }
}

