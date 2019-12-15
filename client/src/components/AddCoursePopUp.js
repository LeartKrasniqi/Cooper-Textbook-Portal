import React, {Component} from 'react'
import './popup.css'

class AddCoursePopUp extends Component {
    render() {
        return (  
            <div className='popup'>  
                <div className='popup\_inner'>  
                    <h1>{this.props.text}</h1>  
                    <button onClick={this.props.closePopup}>close</button>  
                </div>  
            </div>  
        );              
    }
}

export default AddCoursePopUp