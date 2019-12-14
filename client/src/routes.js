import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from './store'

import Landing from './components/Landing'
import Signup from './components/Signup'
class Routes extends Component{
	componentDidMount() {
		this.props.loadInitialData()
	}
	render() {
		const {isLoggedIn} = this.props
		console.log(isLoggedIn)
		return(
			<Router>
				<Switch>
					<Route exact path='/' component={Landing} user={this.props}/>
					<Route exact path="/signup" component={Signup} />
				</Switch>
			</Router>
		)
	}
}

const mapState = (state) => {
	return {
		isLoggedIn: !!state.user.username
	}
}

const mapDispatch = (dispatch) => {
	return { 
		loadInitialData() {
			dispatch(me())
		}
	}
}

export default connect(mapState, mapDispatch)(Routes)
