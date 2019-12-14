import React, { Component } from 'react'
import {signup} from '../store'
import {connect} from 'react-redux'
class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            type: 0,
            is_approved: true
        }
        this.handleRadio = this.handleRadio.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleRadio(event) {
        event.preventDefault()
        if (Number(event.target.value) == 1) {
            this.setState({
                is_approved: false
            })
        }
        this.setState({
            type: Number(event.target.value)
        }, console.log(this.state))
    }

    handleChange(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        }, console.log(this.state))
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.signUp(this.state.email, this.state.password, this.state.type, this.state.is_approved)
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h3>Sign Up for the Cooper Union Textbook Portal!</h3>
                <form>
                    <div>
                        <a>Email</a>
                        <input type="text" name="email" onChange={this.handleChange} />
                    </div>
                    <div>
                        <a>Password</a>
                        <input type="text" name="password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <h5>Are you a ...</h5>
                        <label> Student
                            <input type="radio" value="0" checked={this.state.type == 0} onChange={this.handleRadio}/>
                        </label>
                        <label> Professor
                            <input type="radio" value="1" checked={this.state.type == 1} onChange={this.handleRadio}/>
                        </label>
                        <label> Admin
                                <input type="radio" value="2" checked={this.state.type == 2} onChange={this.handleRadio}/>
                        </label>
                    </div>
                    <button onClick={this.handleSubmit}>Sign Up</button>
                </form>
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
        signUp(email, password, type, is_approved) {
            dispatch(signup(email,password, type, is_approved))
        }
    }
}

export default connect(mapState, mapDispatch)(Signup)