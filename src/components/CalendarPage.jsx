import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import { Grid } from '@material-ui/core'

import Events from '../data/Events.json'
import AthleticEvents from '../data/AthleticEvents.json'
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
					drilldownView="agenda"
					views={['month', 'agenda']}
					length={0}
					eventPropGetter={event => ({className: 'category-' + event.category.toLowerCase()})}
					events={
						AcademicCalendar.vcalendar[0].vevent.map(event => {
							return({
								title: event.summary,
								start: moment(event.dtstart[0]).toDate(),
								end: moment(event.dtend[0]).toDate(),
								allDay: !!event.dtstart[1].value,
								category: "Academic",
							})
						}).concat(AthleticEvents.map(event => {
							let start = moment(event["Start Date"])
							let end = moment(event["End Date"])
							let allDay = !event["Start Time"] || event["Start Time"].replace(/ /g,'') === "AllDay"
							if(!allDay) {
								let startSplit = event["Start Time"].split(" ")[0].split(":")
								start.hour(startSplit[0] || 0)
								start.minute(startSplit[1] || 0)
								let endSplit = event["End Time"].split(" ")[0].split(":")
								end.hour(endSplit[0] || 0)
								end.minute(endSplit[1] || 0)
								if(event["Start Time"].includes("P") || event["Start Time"].includes("p")) 
									start.hour(startSplit[0] + 12 || 0)
								if(event["End Time"].includes("P") || event["End Time"].includes("p")) 
									end.hour(endSplit[0] + 12 || 0)
							}
							return({
								title: event.Event,
								start: start.toDate(),
								end: end.toDate(),
								allDay: allDay,
								category: "Athletic",
							})
						})).concat(Events.bwEventList.events.map(event => {
							console.log(event.start.dateTime, event.end.dateTime)
							return {
								title: event.summary,
								start: moment(event.start.datetime, ["YYYYMMDDTHHmmss", "YYYYMMDD"]).toDate(),
								end: moment(event.end.datetime, ["YYYYMMDDTHHmmss", "YYYYMMDD"]).toDate(),
								allDay: event.start.allDay,
								category: "Events",
							}
						}))
					}
					startAccessor="start"
					endAccessor="end"
					style={{height: window.innerHeight - 180}}
				/>
			</div>
		)
	}
}

