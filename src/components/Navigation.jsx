import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div id="Navigation">
                <ul>
                    <li>
                        <FontAwesomeIcon icon="coffee" />
                    </li>
                </ul>
            </div>
        )
    }
}
