import React, { Component } from 'react'
import { me, logout } from '../store'
import { connect } from 'react-redux'
import history from '../history'
import { getUserCourses, addUserCourses } from '../store'
import { deleteUserCourses } from '../store/students'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import './table.css'

class StudentHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addPopUp: false,
            deletePopUp: false,
            linkPopUp: false,
            course_id: "",
            pdf_url: "",
        }
        this.toggleLinkPopUp = this.toggleLinkPopUp.bind(this)
        this.toggleAddPopUp = this.toggleAddPopUp.bind(this)
        this.toggleDeletePopUp = this.toggleDeletePopUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSuggest = this.handleSuggest.bind(this)
    }

    handleChange(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleAddPopUp() {
        this.setState({
            addPopUp: !this.state.addPopUp
        })
    }

    toggleDeletePopUp() {
        this.setState({
            deletePopUp: !this.state.deletePopUp
        })
    }

    toggleLinkPopUp() {
        this.setState({
            linkPopUp: !this.state.linkPopUp
        })
    }

    async handleSuggest() {
        const res = await axios.post('http://localhost:3000/api/students/add_link', {
            course_id: this.state.course_id,
            username: this.props.courses.username,
            pdf_url: this.state.pdf_url
        })
        if(res.status != 200) {
            alert('Error: Please try again')
        }
        else if (res.status == 200) {
            alert('Successfully suggested link')
        }
        this.toggleLinkPopUp()
    }

    async handleSubmit() {
        this.props.addCourses(this.props.courses.username, this.state.course_id)
        this.toggleAddPopUp()
    }

    async handleDelete() {
        this.props.deleteCourses(this.props.courses.username, this.state.course_id)
        // this.toggleDeletePopUp()
    }

    componentWillMount() {
        this.props.loadUser()
    }

    async componentDidMount() {
        await this.props.getCourses(this.props.user.username)

    }

    render() {
        const courseList = this.props.courses.data
        return (
            
            <div>
                 <button onClick={() => {
                    logout()
                    alert('Logged out successfuly')
                    history.push('/')
                }}>Log Out</button>
                <div>
                    <h2>Cooper Union Textbook Portal</h2>
                </div>
                <div>
                    <h3>My Courses</h3>
                    <div>
                        {courseList ?
                            (
                                <Table id="table">
                                    <thead>
                                        <tr>
                                            <th>Action</th>
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
                                        {
                                            Object.keys(courseList).map(course => (
                                                <tr>
                                                    <td><button onClick={() => {
                                                        this.props.deleteCourses(this.props.courses.username, courseList[course].course_id)
                                                        alert(`${courseList[course].course_title} successfully deleted.`)
                                                    }}>Delete</button></td>
                                                    <td>{courseList[course].course_id}</td>
                                                    <td>{courseList[course].course_title}</td>
                                                    <td>{courseList[course].course_professor}</td>
                                                    <td>{courseList[course].textbook_id}</td>
                                                    <td>{courseList[course].title}</td>
                                                    <td>{courseList[course].edition}</td>
                                                    <td>{courseList[course].authors}</td>
                                                    <td href={courseList[course].amazon_url}>{courseList[course].amazon_url}</td>
                                                    <td href={courseList[course].pdf_url}>{courseList[course].pdf_url}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            )
                            :
                            <div>
                                <h5>No courses to list. Please add a Course</h5>
                            </div>
                        }

                    </div>
                </div>
                <div>
                    {!this.state.addPopUp ? <button onClick={this.toggleAddPopUp}>Add Course</button> : <button onClick={this.toggleAddPopUp}>Close</button>}
                </div>
                <div>
                    {this.state.addPopUp ?
                        <div>
                            <form>
                                <div>
                                    <a>Course ID to add: [EX. "ECE464"]</a>
                                    <input type="text" name="course_id" onChange={this.handleChange} />
                                </div>
                            </form>
                            <button onClick={() => {
                                this.handleSubmit()
                                alert('Course Added')
                                }}>
                                Add Course to Home
                            </button>

                        </div>
                        :
                        null
                    }
                </div>
                <div>
                    {/* {!this.state.deletePopUp ? <button onClick={this.toggleDeletePopUp}>Delete Course</button> : <button onClick={this.toggleDeletePopUp}>Close</button>}
                </div>
                <div>
                    {this.state.deletePopUp ?
                        <div>
                            <form>
                                <div>
                                    <a>Course ID to Delete: [EX. "ECE464"]</a>
                                    <input type="text" name="course_id" onChange={this.handleChange} />
                                </div>
                            </form>
                            <button onClick={this.handleDelete}>
                                Delete Course
                            </button>
                        </div>
                        :
                        null
                    } */}
                </div>
                <div>
                    {courseList ?
                    <div>
                        <div>
                            {!this.state.linkPopUp ? <button onClick={this.toggleLinkPopUp}>Suggest Textbook Link</button> : 
                            <div>
                            <div>
                                <form>
                                    <div>
                                        <a>Course ID</a>
                                        <input type="text" name="course_id" onChange={this.handleChange}/>
                                        <a>PDF Link</a>
                                        <input type="text" name="pdf_url" onChange={this.handleChange}/>
                                    </div>
                                </form>
                                <button onClick={this.handleSuggest}>Suggest Link</button>
                            </div>
                        </div>}
                        </div>
                    </div>
                : null}
                </div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        courses: state.students,
        user: state.user,
        State: state
    }
}

const mapDispatch = dispatch => {
    return {
        loadUser() {
            dispatch(me())
        },
        getCourses(username) {
            dispatch(getUserCourses(username))
        },
        addCourses(username, course_id) {
            dispatch(addUserCourses(username, course_id))
        },
        deleteCourses(username, course_id) {
            dispatch(deleteUserCourses(username, course_id))
        }
    }
}

export default connect(mapState, mapDispatch)(StudentHome)