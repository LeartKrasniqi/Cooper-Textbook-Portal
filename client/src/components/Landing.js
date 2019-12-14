import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {login} from '../store'
import {connect} from 'react-redux'

class Landing extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			password: "",
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		event.preventDefault()
		this.setState({
			[event.target.name]: event.target.value
		}, console.log(this.state))
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.logIn(this.state.email, this.state.password)
	}

	redirect() {
		this.props.history.push('/signup')
	}

	render() {
		return (
			<div>
				<div>
					<h2>Cooper Union Textbook Portal</h2>
				</div>
				<div>
					{!this.props.user?(
	<div>Welcome {this.props.user.username}</div>
					):(				
					<div>
					<div>
						<h4>Please Log In</h4>
					</div>
					<form>
						<div>
							<a>Email</a>
							<input type="text" name="email" onChange={this.handleChange}/>
						</div>
						<div>
							<a>Password</a>
							<input type="password" name="password" onChange={this.handleChange}/>
						</div>
						<button onClick={this.handleSubmit}>Log In</button>
					</form>
					<div>
						<h5>Don't have an account? <a href="localhost:3001/signup" onClick={this.redirect.bind(this)}>Sign up</a> today!</h5>
					</div>
				</div>)}
				</div>
			</div>

		)
	}
}

const mapState = state => {
	return {
		user: state.user
	}
}

const mapDispatch = dispatch => {
	return {
		logIn(email, password) {
			dispatch(login(email, password))
		}
	}
}

export default connect(mapState, mapDispatch)(Landing)

