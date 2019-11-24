import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Main from './components/Main'
import Map from './components/Map'
import Navigation from './components/Navigation'
import './App.css';

function App() {

	library.add(fab, fas, far)

	return (
		<div className="App">
			{/* <CssBaseline/> */}
			<Navigation/>
			<Router>
				<Switch>
					<Route exact path='/' component={props => <Main {...props}/>} />
					<Route path='/map/:query' component={props => <Map {...props}/>} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
