import React, { Component } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
import axios from 'axios'
// import TTUevents from './Events.json'

export default class Schedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: [],
            // date: new Date(),
        }

    }

componentWillMount(){

    fetch('src/components/Events.json')
    .then(res => console.log(JSON.parse(res)))

}

    render() {
        // const localizer = momentLocalizer(moment)

        return(
            <div>
                
            </div>
        )
    }
}

