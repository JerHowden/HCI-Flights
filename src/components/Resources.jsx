import React, {Component, Fragment} from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from './Card'
import './Resources.css'

class Resources extends Component {
    constructor(props) {
        super(props);

        this.state = { 

         }

    }
    render() { 
        
        return ( 
            <Fragment>
                <Grid container spacing={3} direction="row" justify="space-around" alignItems="center" style={{'margin-top': '30px'}}>
                    <Grid item xs={4} style={{ flexBasis: 'auto'}}>
                        <Link to={'/map/study'}>
                            <Card
                                style={{width: '900px'}}
                                image={'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'Places to Study'}
                                date={'Resource Guide'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </Link>
                    </Grid>
                    <Grid item xs={4} style={{flexBasis: 'auto'}}>
                        <a href='https://www.depts.ttu.edu/english/undergrad_advising/faq/faq_registration.php' target="_blank" rel="noopener noreferrer">
                            <Card
                                image={'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'How to Register for Classes'}
                                date={'ttu.edu'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </a>
                    </Grid>
                    <Grid item xs={4} style={{flexBasis: 'auto'}}>
                        <a href='https://www.ttu.edu/campus-life/student-life/' target="_blank" rel="noopener noreferrer">
                            <Card
                                image={'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'Clubs and Organizations at Texas Tech'}
                                date={'ttu.edu'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </a>
                    </Grid>
                </Grid>
                <Grid container spacing={3} direction="row" justify="space-around" alignItems="center" style={{ 'margin-top': '30px' }}>
                    <Grid item xs={4} style={{ flexBasis: 'auto' }}>
                        <a href='https://www.depts.ttu.edu/scc/Virtual_Library/time_management_primary.php' target="_blank" rel="noopener noreferrer">
                            <Card
                                image={'https://images.unsplash.com/photo-1514474959185-1472d4c4e0d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'Time Management in College'}
                                date={'ttu.edu'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </a>
                    </Grid><Grid item xs={4} style={{ flexBasis: 'auto' }}>
                        <a href='https://www.depts.ttu.edu/studenthealth/MentalHealthResourceslist/' target="_blank" rel="noopener noreferrer">
                            <Card
                                image={'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'Mental Health Resources'}
                                date={'ttu.edu'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </a>
                    </Grid><Grid item xs={4} style={{ flexBasis: 'auto' }}>
                        <a href='https://www.ttu.edu/it4students/' target="_blank" rel="noopener noreferrer">
                            <Card
                                image={'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'Helpful Links'}
                                date={'ttu.edu'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </a>
                    </Grid>
                </Grid>
                <Grid container spacing={3} direction="row" justify="space-around" alignItems="center" style={{ 'margin-top': '30px', 'margin-bottom': '30px' }}>
                    <Grid item xs={4} style={{ flexBasis: 'auto' }}>
                        <Link to={'/map/food'}>
                            <Card
                                image={'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'Where to eat on Campus'}
                                date={'Resource Guide'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </Link>
                    </Grid><Grid item xs={4} style={{ flexBasis: 'auto' }}>
                        <Link to={'/map/leisure'}>
                            <Card
                                image={'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'Where to hangout on campus'}
                                date={'Resource Guide'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </Link>
                    </Grid><Grid item xs={4} style={{ flexBasis: 'auto' }}>
                        <a href='https://www.depts.ttu.edu/soar/lc/' target="_blank" rel="noopener noreferrer">
                            <Card
                                image={'https://images.unsplash.com/photo-1522881193457-37ae97c905bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                                title={'TTU Learning Center'}
                                date={'ttu.edu'}
                                icon={'bars'}
                                iconDesc={'Learn more'}
                            ></Card>
                        </a>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}
 
export default withRouter(Resources)
