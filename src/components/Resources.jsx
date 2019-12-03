import React, {Component, Fragment} from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import Card from './Card'

class Resources extends Component {
    constructor(props) {
        super(props);

        this.state = { 

         }

    }
    render() { 
        return ( 
            <Fragment>
                <Card
                    image={'https://images.unsplash.com/photo-1575318634028-6a0cfcb60c59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                    title={'YOMOMMA'}
                    date={'9.18.2019'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                ></Card>
                <Card
                    image={'https://images.unsplash.com/photo-1575290970649-8490709215cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                    title={'YOMOMMA'}
                    date={'9.29.2019'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                ></Card>
                
            </Fragment>
        );
    }
}
 
export default withRouter(Resources)
