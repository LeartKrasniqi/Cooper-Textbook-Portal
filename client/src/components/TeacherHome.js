import React, { Component } from 'react'
import { me } from '../store'
import { connect } from 'react-redux'
//import { getUserCourses } from '../store'
import { getTeacherCoursesAndLinks, getTeacherCourses, addTeacherTextbook, deleteTeacherTextbook, editTeacherTextbook, getTeacherPendingLinks, removeTeacherPendingLinks } from '../store/teachers'
import Table from 'react-bootstrap/Table'
//import { Table } from 'antd'
import history from '../history'
class TeacherHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addPopUp: false,
            deletePopUp: false,
            linkPopUp: false,
            course_id: "",
            pdf_url: "",
            textbook_id: "",
            authors: "",
            title: "",
            edition: "",
            amazon_url: ""
        }
        this.toggleLinkPopUp = this.toggleLinkPopUp.bind(this)
        this.toggleAddPopUp = this.toggleAddPopUp.bind(this)
        this.toggleDeletePopUp = this.toggleDeletePopUp.bind(this)
        //this.handleChange = this.handleChange.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleDelete = this.handleDelete.bind(this)
        //this.handleSuggest = this.handleSuggest.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
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

    // async handleSuggest() {
    //     await axios.post('http://localhost:3000/api/students/add_link', {
    //         course_id: this.state.course_id,
    //         username: this.props.courses.username,
    //         pdf_url: this.state.pdf_url
    //     })

    //     this.toggleLinkPopUp()
    // }

    // async handleSubmit() {
    //     this.props.addCourses(this.props.courses.username, this.state.course_id)
    //     this.toggleAddPopUp()
    // }

    // async handleDelete() {
    //     this.props.deleteCourses(this.props.courses.username, this.state.course_id)
    //     this.toggleDeletePopUp()
    // }
    async handleAdd() {
        this.props.addTextbook(this.props.courses.username, this.props.courses.course_id, this.props.courses.textbook_id, this.props.courses.authors, this.props.courses.title, this.props.courses.edition, this.props.courses.amazon_url, this.props.courses.pdf_url);
    }

    componentWillMount() {
        this.props.loadUser()
    }

    async componentDidMount() {
        await this.props.coursesAndLinks(this.props.user.username)


    }

    render() {
        console.log(this.props)
        const courseList = this.props.courses.courses
        const linkList = this.props.courses.links
        //const linkList = this.props.suggested_links.data
        //const linkList = this.props.courses.data
        // const linkList = this.props.
        return (
            <div>
                <div>
                    <h2>Cooper Union Textbook Portal</h2>
                    {/* <h4>Welcome {this.props.user.username}</h4> */}
                </div>
                <div>
                    <h3>My Courses</h3>
                    <div>
                        {courseList?
                            (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Course ID</th>
                                            <th>Textbook ID</th>
                                            <th>Title</th>
                                            <th>Edition</th>
                                            <th>Authors</th>
                                            <th>URL</th>
                                            <th>PDF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.keys(courseList).map(course => (
                                                <tr>
                                                    <td>{courseList[course].course_id}</td>
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
                    <h3>Pending Links</h3>
                    <div>
                        {linkList?
                            (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Course ID</th>
                                            <th>Student ID</th>
                                            <th>PDF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.keys(linkList).map(suggested_links => (
                                                <tr>
                                                    <td>{linkList[suggested_links].course_id}</td>
                                                    <td>{linkList[suggested_links].username}</td>
                                                    <td href={linkList[suggested_links].pdf_url}>{linkList[suggested_links].pdf_url}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            )
                            :
                            <div>
                                <h5>No pending links</h5>
                            </div>
                        }

                    </div>
                </div>
                <div>
                    {!this.state.addPopUp ? <button onClick={this.toggleAddPopUp}>Add Textbook</button> : <button onClick={this.toggleAddPopUp}>Close</button>}
                </div>
                <div>
                    {this.state.addPopUp ?
                        <div>
                            <form>
                                <div>
                                    <a>Course ID: </a>
                                    <input type="text" name="course_id" onChange={this.handleChange} />
                                    <a>Textbook ID: </a>
                                    <input type="text" name="textbook_id" onChange={this.handleChange} />
                                    <a>Authors: </a>
                                    <input type="text" name="authors" onChange={this.handleChange} />
                                    <a>Title: </a>
                                    <input type="text" name="title" onChange={this.handleChange} />
                                    <a>Edition: </a>
                                    <input type="text" name="edition" onChange={this.handleChange} />
                                    <a>URL: </a>
                                    <input type="text" name="amazon_url" onChange={this.handleChange} />
                                    <a>PDF: </a>
                                    <input type="text" name="pdf_url" onChange={this.handleChange} />
                                </div>
                            </form>
                            <button onClick={this.handleAdd}>
                                Add Textbook 
                            </button>

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
        courses: state.teachers,
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
            dispatch(getTeacherCourses(username))
        },
        addTextbook(username, course_id, textbook_id, authors, title, edition, amazon_url, pdf_url) {
            dispatch(addTeacherTextbook(username, course_id, textbook_id, authors, title, edition, amazon_url, pdf_url))
        },
        deleteTextbook(username, course_id, textbook_id) {
            dispatch(deleteTeacherTextbook(username, course_id, textbook_id))
        },
        editTextbook(username, textbook_id, authors, title, edition, amazon_url, pdf_url) {
            dispatch(editTeacherTextbook(username, textbook_id, authors, title, edition, amazon_url, pdf_url))
        },
        getPendingLinks(username) {
            dispatch(getTeacherPendingLinks(username))
        },
        removePendingLinks(username, course_id) {
            dispatch(removeTeacherPendingLinks(username, course_id))
        },
        coursesAndLinks(username) {
            dispatch(getTeacherCoursesAndLinks(username))
        }
    }
}

export default connect(mapState, mapDispatch)(TeacherHome)