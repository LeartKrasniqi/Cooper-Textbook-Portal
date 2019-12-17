import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login, me } from '../store'
import { connect } from 'react-redux'
import history from '../history'
class Landing extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			password: "",
			loggedIn: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillMount() {
		this.props.loadInitialData()
	}

	componentDidUpdate() {
		// check log in
		// if (this.props.USER.user.username) {
		// 	history.push('/students')
		// }
		const user = this.props.USER.user
		if(user != null) {
			switch(user.type) {
				case 0:
					history.push('/students')
					break
				case 1:
					history.push('/teachers')
					break
				case 2:
					history.push('/admin')
					break
			}
		}
	}

	handleChange(event) {
		event.preventDefault()
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	async handleSubmit(event) {
		event.preventDefault()
		await this.props.logIn(this.state.email, this.state.password)
		history.push('/')
	}

	redirect() {
		history.push('/signup')
	}

	render() {
		const user = this.props.USER
		console.log(user)
		return (
			<div>
				<div>
					<h2>Cooper Union Textbook Portal</h2>
				</div>
				<div>
					{this.props.user ? (
						<div>Welcome {this.props.user}</div>
					) : (
							<div>
								<div>
									<h4>Please Log In</h4>
								</div>
								<form>
									<div>
										<a>Email</a>
										<input type="text" name="email" onChange={this.handleChange} />
									</div>
									<div>
										<a>Password</a>
										<input type="password" name="password" onChange={this.handleChange} />
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
		USER: state
	}
}

const mapDispatch = dispatch => {
	return {
		logIn(email, password) {
			dispatch(login(email, password))
		},
		loadInitialData() {
			dispatch(me())
		}
	}
}

export default connect(mapState, mapDispatch)(Landing)

