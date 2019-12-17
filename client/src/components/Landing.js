import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login, me } from '../store'
import { connect } from 'react-redux'
import history from '../history'
import './login.css'
import {Button, Input, Form, Row, Col} from 'antd'
import 'antd/dist/antd.css'
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
		if(user.error) {
			alert('Incorrect log-in credentials. Please try again')
		}

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
		// console.log(user)
		return (
			<div style={{width: "100%", heigh:"100%", alignItems: "center"}}>
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
								<Form>
									<div>
										<Input type="text" name="email" placeholder="Enter Username" onChange={this.handleChange} />
									</div>
									<div>
										<Input type="password" name="password" placeholder="Enter Password" onChange={this.handleChange} />
									</div>
									<Button type="primary" style={{marginBottom: "10px"}} onClick={this.handleSubmit}>Log In</Button>
								</Form>
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

