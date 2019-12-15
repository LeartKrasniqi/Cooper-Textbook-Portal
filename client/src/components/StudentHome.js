import React, {Component} from 'react'
import {me} from '../store'
import {connect} from 'react-redux'

class StudentHome extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if(this.props.user.type != 0) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Cooper Union Textbook Portal</h2>
                    <h4>Welcome {this.props.user.username}</h4>
                </div>
            </div>
        )
    }
}

const mapState = state => { 
    return {

    }
}

const mapDispatch = dispatch => { 
    return {
    }
}

export default connect(mapState, mapDispatch)(StudentHome)