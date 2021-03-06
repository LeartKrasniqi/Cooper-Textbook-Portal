import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'
import { me } from '../store'
import { connect } from 'react-redux'
import {getPendingProfs, removePendingProf} from '../store/admin'
import {logout} from '../store/user'
import axios from 'axios'
import history from '../history'
import './table.css'

import {Table as Tabel, Button, Form} from 'antd'
import 'antd/dist/antd.css'

class AdminHome extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            toggle: false,
            course_id: '',
            course_title: '',
            course_professor: ''
        }  
        this.addCourse = this.addCourse.bind(this)
        this.toggleAddCourse = this.toggleAddCourse.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    // componentWillMount(){
    //     // this.props.getMe()
    // }
    async componentDidMount() {
        await this.props.allPendingProfs()
    }

    toggleAddCourse() {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    handleChange(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        },)
    }

    async addCourse() {
        const res = await axios.post('http://localhost:3000/api/admin/add_course', {
            course_id: this.state.course_id,
            course_title: this.state.course_title,
            course_professor: this.state.course_professor
        })
        if(res.status == 200) {
            alert('Successfully added course.')
        }
        else {
            alert('ERROR: Please try again')
        }
        this.toggleAddCourse()
    }

    render() {

        const professorList = this.props.me.admin
        const columns = [
            {
              title: 'Action',
              dataIndex: 'name',
              key: 'name',
              render: (text, record) => <Button icon={"check-circle"} onClick={async () => {
                this.props.approve(record.username)
                                     }}></Button>
            },
            {
              title: 'Professor',
              dataIndex: 'username',
              key: 'username',
            },
          ];
        
        return (
            <div>
                 <Button onClick={() => {
                    logout()
                    alert('Logged out successfuly')
                    history.push('/')
                }}>Log Out</Button>
                <h3>ADMIN PAGE</h3>
                    <div>
                        <h4>Pending Professors</h4>
                    </div>
                    <div>
                        {professorList.length > 0 ? (
                        
                            <Tabel dataSource={professorList} columns={columns}></Tabel>
                        )
                        :
                        <div>
                                <a>No Professors Pending Approval</a>
                        </div> 
                        }
                    </div>
                <div>
                    {!this.state.toggle ? <Button onClick={this.toggleAddCourse}>Add Course</Button> : <Button onClick={this.toggleAddCourse}>Close</Button>}
                </div>
                <div>
                    {!this.state.toggle ?
                    <></>:
                        <div>
                            <Form>
                                <div>
                                    {/* <a>Course ID [EX: ECE464]</a> */}
                                    <input type="text" name="course_id" placeholder="Course ID [EX: ECE464]" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    {/* <a>Course Title [EX: Databases]</a> */}
                                    <input type="text" name="course_title" placeholder="Course Title" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    {/* <a>Course Professor [EX: Sokolov]</a> */}
                                    <input type="text" name="course_professor" placeholder="Course Professor" onChange={this.handleChange}/>
                                </div>
                            </Form>
                            <Button onClick={this.addCourse}>Add Course</Button>
                        </div>
                    }   
                </div>
            </div>
        )
    }

}

const mapState = state => {
    return {
        me: state
    }
}

const mapDispatch = dispatch => {
    return {
        getMe() {
            dispatch(me())
        },
        allPendingProfs() {
            dispatch(getPendingProfs())
        },
        approve(username) {
            dispatch(removePendingProf(username))
        }
    }
}

export default connect(mapState, mapDispatch)(AdminHome)