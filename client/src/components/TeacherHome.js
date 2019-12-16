import React, { Component } from 'react'
import { me } from '../store'
import { connect } from 'react-redux'
import { getUserCourses } from '../store'
import { getTeacherCourses, addTeacherTextbook, deleteTeacherTextbook, editTeacherTextbook, getTeacherPendingLinks, removeTeacherPendingLinks } from '../store/teachers'
//import Table from 'react-bootstrap/Table'
import { Table } from 'antd'
import history from '../history'
class TeacherHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addPopUp: false,
            deletePopUp: false,
            course_id: "",
        }
        //this.toggleAddPopUp = this.toggleAddPopUp.bind(this)
        //this.toggleDeletePopUp = this.toggleDeletePopUp.bind(this)
        //this.handleChange = this.handleChange.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleDelete = this.handleDelete.bind(this)
    }
    // handleSubmit () {
    //     this.props.addCourses(this.props.user.username, this.state.course_id)
    //     // history.push('/students')
    // }
    // handleDelete () {
    //     this.props.deleteCourses(this.props.user.username, this.state.course_id)
    //     // history.push('/students')
    //     // this.forceUpdate()
    // }
    // handleChange(event) {
    //     event.preventDefault()
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     }, console.log(this.state))
    // }

    // toggleAddPopUp() {
    //     this.setState({
    //         addPopUp: !this.state.addPopUp
    //     })
    // }

    // toggleDeletePopUp() {
    //     this.setState({
    //         deletePopUp: !this.state.deletePopUp
    //     })
    // }

    componentWillMount() {
        // Check that user is indeed a teacher
        console.log(this.props)
        if (!this.props.loginStatus || this.props.user.type != 1) {
            // go back to login 
            // TODO reroute to student, admin pages
            history.push('/')
        }

        this.props.getTeacherCourses(this.props.user.username)
    }



    render() {
        const courseList = this.props.courses.teachers;
        const columns = [
        {
            title: 'Course ID',
            dataIndex: 'course_id',
            //sorter: true,
            //render: name => `${name.first} ${name.last}`,
            width: '20%',
        },
        {
            title: 'Textbook ID',
            dataIndex: 'textbook_id',
            //filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
            width: '20%',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Edition',
            dataIndex: 'edition',
        },
        {
            title: 'Authors',
            dataIndex: 'authors',
        },
        {
            title: 'URL',
            dataIndex: 'amazon_url',
        },
        {
            title: 'PDF',
            dataIndex: 'pdf_url',
        }
    ];
        return (
            <div>
                <div>
                    <h2>Cooper Union Textbook Portal</h2>
                    <h4>Welcome {this.props.user.username}</h4>
                </div>
                <div>
                    <Table
                        columns={columns}
                        dataSource={courseList}
                      />
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
            dispatch(getTeacherCourses(username))
        },
        addTextbook(course_id, textbook_id, authors, title, edition, amazon_url, pdf_url) {
            dispatch(addTeacherTextbook(course_id, textbook_id, authors, title, edition, amazon_url, pdf_url))
        },
        deleteTextbook(course_id, textbook_id){
            dispatch(deleteTeacherTextbook(course_id, textbook_id))
        },
        editTextbook(textbook_id, authors, title, edition, amazon_url, pdf_url){
            dispatch(editTeacherTextbook(textbook_id, authors, title, edition, amazon_url, pdf_url))
        },
        getPendingLinks(course_id){
            dispatch(getTeacherPendingLinks(course_id))
        },
        removePendingLinks(course_id, username){
            dispatch(removeTeacherPendingLinks(course_id, username))
        }
    }
}

export default connect(mapState, mapDispatch)(TeacherHome)