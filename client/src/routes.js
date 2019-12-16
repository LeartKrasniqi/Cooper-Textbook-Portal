import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Router} from 'react-router'
import {connect} from 'react-redux'
import {me} from './store'
import history from './history'

import Landing from './components/Landing'
import Signup from './components/Signup'
import StudentHome from './components/StudentHome'
import TeacherHome from './components/TeacherHome'

class Routes extends Component{

	render() {
		return(
			<Router history={history} forceRefresh={true}>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/students' component={StudentHome}/>
					{/* {isLoggedIn && (
						<Switch>
							<Route exact path='/students' render={() => <StudentHome loginStatus={isLoggedIn} user={this.props.user}/>}/>
						</Switch>
						)} */}
				</Switch>
			</Router>
		)
	}
}


export default (Routes)
