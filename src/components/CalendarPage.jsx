import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import { Grid } from '@material-ui/core'

import Events from '../data/Events.json'
import SportsEvents from '../data/AthleticEvents.json'
import AcademicCalendar from '../data/AcademicCalendar.json'
import './CalendarPage.css'

export default class CalendarPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			activeFilter: "",
			events: []
		}

	}

	componentDidMount() {

		let allEvents = []

		// Map Academic Events into Calendar
		let academicEvents = AcademicCalendar.vcalendar[0].vevent.map(event => {
			return({
				title: event.summary,
				start: moment.utc(event.dtstart[0]).toDate(),
				end: moment.utc(event.dtend[0]).toDate(),
				allDay: !!event.dtstart[1].value,
				category: "Academic",
			})
		})
		console.log(academicEvents)
		allEvents.concat(academicEvents)

		// Map Sports Events into Calendar

		// Map Events into Calendar

		this.setState({ events: allEvents }, () => console.log(this.calendar))

	}

	render() {
		const localizer = momentLocalizer(moment)

		return(
			<div id="CalendarPage">
				<Calendar
					ref={calendar => this.calendar = calendar}
					localizer={localizer}
					events={AcademicCalendar.vcalendar[0].vevent.map(event => {
			return({
				title: event.summary,
				start: moment.utc(event.dtstart[0]).toDate(),
				end: moment.utc(event.dtend[0]).toDate(),
				allDay: !!event.dtstart[1].value,
				category: "Academic",
			})
		})}
					startAccessor="start"
					endAccessor="end"
					style={{height: 500}}
				/>
			</div>
		)
	}
}

