import React, {Component} from 'react'
import {me} from '../store'
import {connect} from 'react-redux'
import {userCourses} from '../store'
import AddCoursePopUp from './AddCoursePopUp'
class StudentHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addPopUp: false
        }
    }
    togglePopUp() {
        this.setState({
            addPopUp: !this.state.addPopUp
        })
    }

    componentDidMount() {
        // Check that user is indeed a student
        if(this.props.user.type != 0) {
            // go back to login 
            // TODO reroute to prof, admin pages
            this.props.history.push('/')
        }
        // this.props.getCourses(this.props.user.username)
        this.props.getCourses(this.props.user.username)
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Cooper Union Textbook Portal</h2>
                    <h4>Welcome {this.props.user.username}</h4>
                </div>
                <div>
                    <h3>My Courses</h3>

                </div>
                <div>
                    <button onClick={this.togglePopUp.bind(this)}>Add Course</button>
                </div>
                <div>
                    {this.state.addPopUp ?
                        <AddCoursePopUp 
                            text='CLick close to hid popup'
                            closePopup={this.togglePopUp.bind(this)}
                        />
                    :
                        null
                    }
                </div>
            </div>
        )
    }
}

const mapState = state => { 
    return {
        courses: state
    }
}
const mapDispatch = dispatch => {
    return {
        getCourses(username) {
            dispatch(userCourses(username))
        }
    }
}

export default connect(mapState, mapDispatch)(StudentHome)