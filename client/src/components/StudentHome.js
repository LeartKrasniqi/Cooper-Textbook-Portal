import React, {Component} from 'react'
import {me} from '../store'
import {connect} from 'react-redux'
import {getUserCourses} from '../store'
import {addUserCourses} from '../store/students'
import AddCoursePopUp from './AddCoursePopUp'
class StudentHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addPopUp: false,
            course_id: "",
        }
        this.togglePopUp = this.togglePopUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        }, console.log(this.state))
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
                    <div>
                      
                    </div>
                </div>
                <div>
                   {!this.state.addPopUp ? <button onClick={this.togglePopUp}>Add Course</button>:  null}
                </div>
                <div>
                    {this.state.addPopUp ?
                        // <AddCoursePopUp closePopup={this.togglePopUp.bind(this)} username={this.props.user.username} add={this.props.addCourses}/>
                        <div>
                            <form>
                                <div>
                                    <a>Course ID: [EX. "ECE464"]</a>
                                    <input type="text" onChange={this.handleChange}/>
                                </div>
                                <button onClick={async () => {
                                    this.props.add(this.state.course_id, this.props.user.username)
                                    this.props.togglePopUp()
                                    }}>
                                        Add Course to Home
                                </button>
                            </form>

                        </div>
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
            dispatch(getUserCourses(username))
        },
        addCourses(course_id, username) {
            dispatch(addUserCourses(course_id, username))
        }
    }
}

export default connect(mapState, mapDispatch)(StudentHome)