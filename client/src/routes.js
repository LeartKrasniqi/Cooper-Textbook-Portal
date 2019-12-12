import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Landing from './components/Landing'

export default class Routes extends Component{
	render() {
		return(
			<Router>
				<Switch>
					<Route path="/" component={Landing} />
				</Switch>
			</Router>
		)
	}
}

