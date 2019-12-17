import React, { Component } from 'react'
import { me } from '../store'
import { connect } from 'react-redux'
// import { getUserCourses } from '../store'
import {logout} from '../store/user'
import { getTeacherCoursesAndLinks, getTeacherCourses, addTeacherTextbook, deleteTeacherTextbook, editTeacherTextbook, getTeacherPendingLinks, removeTeacherPendingLinks } from '../store/teachers'
import Table from 'react-bootstrap/Table'
import './table.css'
import history from '../history'
import {Table as Tabel, Button, Layout, Menu} from 'antd'
import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout;


class TeacherHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggleAdd: false,
            toggleEdit: false,
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
        this.handleChange = this.handleChange.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleDelete = this.handleDelete.bind(this)
        //this.handleSuggest = this.handleSuggest.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.toggleAddTextbook = this.toggleAddTextbook.bind(this)
        this.toggleEditTextbook = this.toggleEditTextbook.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
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

    async 

    async handleAdd() {
        this.props.addTextbook(
            this.props.courses.username,
            this.state.course_id,
            this.state.textbook_id,
            this.state.authors,
            this.state.title,
            this.state.edition,
            this.state.amazon_url,
            this.state.pdf_url);
    }

    async handleEdit() {
        this.props.editTextbook(
            this.props.courses.username,
            this.state.textbook_id,
            this.state.edition,
            this.state.amazon_url,
            this.state.pdf_url
        )
    }

    toggleAddTextbook() {
        this.setState({
            toggleAdd: !this.state.toggleAdd
        })
    }

    toggleEditTextbook() {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }

    componentWillMount() {
        this.props.loadUser()
    }

    async componentDidMount() {
        await this.props.coursesAndLinks(this.props.user.username)
    }

    render() {
        const columns = [
            {
              title: 'Action',
              dataIndex: 'name',
              key: 'name',
              render: (text, record) => <Button icon={"delete"} onClick={async () => {
                                         this.props.deleteTextbook(this.props.courses.username, record.course_id, record.textbook_id)
                                     }}></Button>
            },
            {
              title: 'Course ID',
              dataIndex: 'course_id',
              key: 'course_id',
            },
            {
              title: 'Textbook ID',
              dataIndex: 'textbook_id',
              key: 'textbook_id',
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
              },
              {
                title: 'Edition',
                dataIndex: 'edition',
                key: 'edition',
              },
              {
                title: 'Authors',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'URL',
                dataIndex: 'amazon_url',
                key: 'amazon_url',
                render: text => <a href={text}>Amazon</a>,
              },
              {
                title: 'PDF',
                dataIndex: 'pdf_url',
                key: 'pdf_url',
                render: text => text ? (<a href={text}>PDF</a>) : null
              },
          ];

          const link_columns = [
            {
              title: 'Course ID',
              dataIndex: 'course_id',
              key: 'course_id',
            },
            {
              title: 'Student ID',
              dataIndex: 'username',
              key: 'username',
            },
            {
                title: 'PDF',
                dataIndex: 'pdf_url',
                key: 'pdf_url',
                render: text => <a href={text}>PDF</a>,
              },
          ];

        // console.log(this.props)
        const courseList = this.props.courses.courses
        const linkList = this.props.courses.links

        console.log(courseList)
        //const linkList = this.props.suggested_links.data
        //const linkList = this.props.courses.data
        // const linkList = this.props.
        return (
            <div>
                {/* <button onClick={() => {
                    logout()
                    alert('Logged out successfuly')
                    history.push('/')
                }}>Log Out</button> */}
                <Button onClick={() => {
                    logout()
                    alert('Logged out successfuly')
                    history.push('/')
                }}>Log Out</Button>
                <div>
                    <h2>Cooper Union Textbook Portal</h2>
                    {/* <h4>Welcome {this.props.user.username}</h4> */}
                </div>
                <div>
                    <h3>My Courses</h3>
                    <div>
                        {courseList ?
                            (
                                // <Table id="table">

                                //     <thead>
                                //         <tr>
                                //             <th>Action</th>
                                //             <th>Course ID</th>
                                //             <th>Textbook ID</th>
                                //             <th>Title</th>
                                //             <th>Edition</th>
                                //             <th>Authors</th>
                                //             <th>URL</th>
                                //             <th>PDF</th>
                                //         </tr>
                                //     </thead>
                                //     <tbody>
                                //         {
                                //             Object.keys(courseList).map(course => (
                                //                 <tr>
                                //                     <td><button onClick={async () => {
                                //                         this.props.deleteTextbook(this.props.courses.username, courseList[course].course_id, courseList[course].textbook_id)
                                //                     }}>Remove</button></td>
                                //                     <td>{courseList[course].course_id}</td>
                                //                     <td>{courseList[course].textbook_id}</td>
                                //                     <td>{courseList[course].title}</td>
                                //                     <td>{courseList[course].edition}</td>
                                //                     <td>{courseList[course].authors}</td>
                                //                     <td href={courseList[course].amazon_url}>{courseList[course].amazon_url}</td>
                                //                     <td href={courseList[course].pdf_url}>{courseList[course].pdf_url}</td>
                                //                 </tr>
                                //             ))}
                                //     </tbody>
                                // </Table>
                                <Tabel dataSource={courseList} columns={columns}></Tabel>
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
                        {linkList ?
                            (
                                // <Table id="table">
                                //     <thead>
                                //         <tr>
                                //             <th>Course ID</th>
                                //             <th>Student ID</th>
                                //             <th>PDF</th>
                                //         </tr>
                                //     </thead>
                                //     <tbody>
                                //         {
                                //             Object.keys(linkList).map(suggested_links => (
                                //                 <tr>
                                //                     <td>{linkList[suggested_links].course_id}</td>
                                //                     <td>{linkList[suggested_links].username}</td>
                                //                     <td href={linkList[suggested_links].pdf_url}>{linkList[suggested_links].pdf_url}</td>
                                //                 </tr>
                                //             ))}
                                //     </tbody>
                                // </Table>
                                <Tabel dataSource={linkList} columns={link_columns}></Tabel>
                            )
                            :
                            <div>
                                <h5>No pending links</h5>
                            </div>
                        }
                    </div>
                </div>

                <div>
                    {!this.state.toggleAdd ?
                        <button onClick={this.toggleAddTextbook}>Add Textbook</button> :
                        <div>
                            <button onClick={this.toggleAddTextbook}>Close</button>
                            <form>
                                <div>
                                    <a>Course ID [EX: ECE464]</a>
                                    <input type="text" name="course_id" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>Textbook ISBN10</a>
                                    <input type="text" name="textbook_id" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>Textbook Title </a>
                                    <input type="text" name="title" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>Authors</a>
                                    <input type="text" name="authors" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>Edition</a>
                                    <input type="text" name="edition" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>URL</a>
                                    <input type="text" name="amazon_url" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>PDF</a>
                                    <input type="text" name="pdf_url" onChange={this.handleChange} />
                                </div>
                            </form>
                            <button onClick={() => {
                                this.handleAdd()
                                this.toggleAddTextbook()
                            }}>Add Textbook</button>
                        </div>
                    }
                </div>

                <div>
                    {!this.state.toggleEdit ?
                        <button onClick={this.toggleEditTextbook}>Edit Textbook</button> :
                        <div>
                            <button onClick={this.toggleEditTextbook}>Close</button>
                            <form>
                                <div>
                                    <a>Textbook ISBN10</a>
                                    <input type="text" name="textbook_id" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>Edition</a>
                                    <input type="text" name="edition" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>URL</a>
                                    <input type="text" name="amazon_url" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <a>PDF</a>
                                    <input type="text" name="pdf_url" onChange={this.handleChange} />
                                </div>
                            </form>
                            <button onClick={() => {
                                this.handleEdit()
                                this.toggleEditTextbook()
                            }}>Edit Textbook</button>
                        </div>
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
        editTextbook(username, textbook_id, edition, amazon_url, pdf_url) {
            dispatch(editTeacherTextbook(username, textbook_id, edition, amazon_url, pdf_url))
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