import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from './store'

import Landing from './components/Landing'
import Signup from './components/Signup'
import StudentHome from './components/StudentHome'
class Routes extends Component{
	componentDidMount() {
		this.props.loadInitialData()
	}
	render() {
		const {isLoggedIn} = this.props
		console.log(this.props)
		return(
			<Router>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path="/signup" component={Signup} />
					{isLoggedIn && (
						<Switch>
							<Route exact path='/students' render={() => <StudentHome user={this.props.user}/>}/>
						</Switch>
						)}
				</Switch>
			</Router>
		)
	}
}

const mapState = (state) => {
	return {
		isLoggedIn: !!state.user.username,
		user: state.user
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
