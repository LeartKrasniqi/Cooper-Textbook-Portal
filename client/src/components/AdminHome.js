import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'
import { me } from '../store'
import { connect } from 'react-redux'
import {getPendingProfs, removePendingProf} from '../store/admin'
import axios from 'axios'

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
        }, console.log(this.state))
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
        console.log(professorList)
        
        return (
            <div>
                <h3>ADMIN PAGE</h3>
                    <div>
                        <h4>Pending Professors</h4>
                    </div>
                    {professorList.length !== 0 ? 
                    <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Professor</th>
                                <th>Approve</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.keys(professorList).map(prof => (
                            <tr>
                                {console.log(prof)}
                                <td>{professorList[prof].username}</td>
                                <td><button onClick={async () => {
                                    this.props.approve(professorList[prof].username)
                                }}>Approve</button></td>
                            </tr>    
                        ))}
                        </tbody>
                    </Table>

                </div>:
                <div>
                    <a>No Professors Pending Approval</a>
                </div>}    
                <div>
                    {!this.state.toggle ?
                    <button onClick={this.toggleAddCourse}>Add Course</button>:
                        <div>
                            <form>
                                <div>
                                    <a>Course ID [EX: ECE464]</a>
                                    <input type="text" name="course_id" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    <a>Course Title [EX: Databases]</a>
                                    <input type="text" name="course_title" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    <a>Course Professor [EX: Sokolov]</a>
                                    <input type="text" name="course_professor" onChange={this.handleChange}/>
                                </div>
                            </form>
                            <button onClick={this.addCourse}>Add Course</button>
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