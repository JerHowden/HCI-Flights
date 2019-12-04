import React, {Component, Fragment} from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from './Card'

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));

class Resources extends Component {
    constructor(props) {
        super(props);

        this.state = { 

         }

    }
    render() { 
        // const classes = useStyles();
        return ( 
            <Fragment>
                {/* <Card
                    image={'https://images.unsplash.com/photo-1575318634028-6a0cfcb60c59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                    title={'YOMOMMA'}
                    date={'9.18.2019'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                    icon={'coffee'}
                    iconDesc={' Sint commodo deserunt'}
                ></Card> */}
                {/* <Card
                    image={'https://images.unsplash.com/photo-1575290970649-8490709215cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                    title={'YOMOMMA'}
                    date={'9.29.2019'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                    icon={'bicycle'}
                    iconDesc={' Do proident cupidatat'}
                ></Card> */}
                
                <Grid container spacing={3} direction="row" justify="space-around" alignItems="center" style={{'margin-top': '30px'}}>
                    <Grid item xs={4} style={{ flexBasis: 'auto'}}>
                        <Card
                            image={'https://images.unsplash.com/photo-1575290970649-8490709215cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                            title={'YOMOMMA'}
                            date={'9.29.2019'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                            icon={'bicycle'}
                            iconDesc={' Do proident cupidatat'}
                        ></Card>
                    </Grid>
                    <Grid item xs={4} style={{flexBasis: 'auto'}}>
                        <Card
                            image={'https://images.unsplash.com/photo-1575290970649-8490709215cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                            title={'YOMOMMA'}
                            date={'9.29.2019'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                            icon={'bicycle'}
                            iconDesc={' Do proident cupidatat'}
                        ></Card>
                    </Grid>
                    <Grid item xs={4} style={{flexBasis: 'auto'}}>
                        <Card
                            image={'https://images.unsplash.com/photo-1575290970649-8490709215cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}
                            title={'YOMOMMA'}
                            date={'9.29.2019'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                            icon={'bicycle'}
                            iconDesc={' Do proident cupidatat'}
                        ></Card>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}
 
export default withRouter(Resources)
