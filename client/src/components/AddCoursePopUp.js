import React, {Component} from 'react'
import './popup.css'


class AddCoursePopUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course_id: "",
            username: props.username
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        }, console.log(this.state))
    }

    render() {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        return (  
            <div className='popup'>  
                <div className='popup\_inner'>  
                    <div>
                        <form>
                            <div>
                                <a>Course ID: [EX. "ECE464"]</a>
                                <input type="text" onChange={this.handleChange}/>
                            </div>
                            <button onClick={async () => {
                                this.props.add(this.state.course_id, this.state.username)
                                await sleep(1000)
                                this.props.closePopup()
                                }}>
                                    Add Course to Home
                            </button>
                        </form>
                    </div>
                    {/* <button onClick={this.props.closePopup}>close</button>   */}
                </div>  
            </div>  
        );              
    }
}

export default AddCoursePopUp