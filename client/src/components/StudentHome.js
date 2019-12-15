import React, { Component } from 'react'
import { me } from '../store'
import { connect } from 'react-redux'
import { getUserCourses } from '../store'
import { addUserCourses } from '../store/students'
import Table from 'react-bootstrap/Table'

class StudentHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addPopUp: false,
            deletePopUp: false,
            course_id: "",
        }
        this.toggleAddPopUp = this.toggleAddPopUp.bind(this)
        this.toggleDeletePopUp = this.toggleDeletePopUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit () {
        this.props.addCourses(this.props.user.username, this.state.course_id)
        // HMM SEEMS TO BE A PROBLEM WITH THE FUNCTION ABOVE
        // BACKEND WORKS FINE (IT ADDS COURSES)
        // BUT USER GETS LOGGED OUT IN THE FRONT END FOR SOME REASON :/
    }
    handleChange(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        }, console.log(this.state))
    }

    toggleAddPopUp() {
        this.setState({
            addPopUp: !this.state.addPopUp
        })
    }

    toggleDeletePopUp() {
        this.setState({
            deletePopUp: !this.state.deletePopUp
        }, console.log(this.state))
    }

    componentWillMount() {
        // Check that user is indeed a student
        if (this.props.user.type != 0) {
            // go back to login 
            // TODO reroute to prof, admin pages
            this.props.history.push('/')
        }

        this.props.getCourses(this.props.user.username)

    }


    render() {
        const courseList = this.props.courses.students
        return (
            <div>
                <div>
                    <h2>Cooper Union Textbook Portal</h2>
                    <h4>Welcome {this.props.user.username}</h4>
                </div>
                <div>
                    <h3>My Courses</h3>
                    <div>
                        {console.log(typeof(courseList))}
                        <Table>
                            <thead>
                                <tr>
                                <th>Course ID</th>
                                <th>Title</th>
                                <th>Professor</th>
                                <th>Texbook ID</th>
                                <th>Texbook Title</th>
                                <th>Texbook Edition</th>
                                <th>Texbook Author</th>
                                <th>Texbook URL</th>
                                <th>PDF URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseList? (
     
                                    Object.keys(courseList).map(course => (
                                    <tr>
                                        <td>{courseList[course].course_id}</td>
                                        <td>{courseList[course].course_title}</td>
                                        <td>{courseList[course].course_professor}</td>
                                        <td>{courseList[course].textbook_id}</td>
                                        <td>{courseList[course].title}</td>
                                        <td>{courseList[course].edition}</td>
                                        <td>{courseList[course].authors}</td>
                                        <td>{courseList[course].amazon_url}</td>
                                        <td>{courseList[course].pdf_url}</td>
                                    </tr>
                                ))):
                                null}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div>
                    {!this.state.addPopUp ? <button onClick={this.toggleAddPopUp}>Add Course</button> : <button onClick={this.toggleAddPopUp}>Close</button>}
                </div>
                <div>
                    {this.state.addPopUp ?
                        // <AddCoursePopUp closePopup={this.togglePopUp.bind(this)} username={this.props.user.username} add={this.props.addCourses}/>
                        <div>
                            <form>
                                <div>
                                    <a>Course ID: [EX. "ECE464"]</a>
                                    <input type="text" name="course_id" onChange={this.handleChange} />
                                </div>
                                <button onClick={async () => {
                                    this.props.addCourses(this.props.user.username, this.state.course_id)
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
                <div>
                    {!this.state.deletePopUp ? <button onClick={this.toggledeletePopUp}>Delete Course</button> : <button onClick={this.toggledeletePopUp}>Close</button>}
                </div>
                <div>
                    {this.state.deletePopUp ?
                        <div>
                            <form>
                                <div>
                                    <a>Course ID: [EX. "ECE464"]</a>
                                    <input type="text" onChange={this.handleChange} />
                                </div>
                                <button onClick={this.handleSubmit}>
                                    Delete Course
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
        addCourses(username, course_id) {
            dispatch(addUserCourses(username, course_id))
        }
    }
}

export default connect(mapState, mapDispatch)(StudentHome)