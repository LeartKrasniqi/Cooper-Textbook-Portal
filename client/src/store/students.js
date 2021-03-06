import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STUDENT_COURSES = 'GET_STUDENT_COURSES'
const ADD_STUDENT_COURSES = 'ADD_STUDENT_COURSES'
const DELETE_STUDENT_COURSES = 'DELETE_STUDENT_COURSES'
/**
 * INITIAL STATE
 */

const studentsState = {}

/**
 * ACTION CREATORS
 */

const getCourses = courses => ({type: GET_STUDENT_COURSES, courses})
const addCourses = courses => ({type: ADD_STUDENT_COURSES, courses})
const deleteCourses = courses => ({type: DELETE_STUDENT_COURSES, courses})
const addLink = courses => ({type: null, courses})
/**
 * THUNK CREATORS
 */
export const getUserCourses = (username) => async dispatch => {
    let res
    try {
        res = await axios.get(`http://localhost:3000/api/students/${username}`)
        dispatch(getCourses({data: res.data, username: username }))
    } catch (error) {
        console.error(error)
    }
}

// export const addUserLink = (username, course_id, pdf_url) => async dispatch => {
//     let ret, res
//     try {
//         await axios.post('http://localhost:3000/api/students/add_link', {
//             course_id,
//             username,
//             pdf_url
//         })
//     } catch (error) {
//         console.error(error)
//     }
// }


export const addUserCourses = (username, course_id) => async dispatch => {
    let ret
    try {
        // console.log('add user redux hit')
        await axios.post('http://localhost:3000/api/students/add_course', {
            username,
            course_id
        })
        ret = await axios.get(`http://localhost:3000/api/students/${username}`)
        dispatch(addCourses({data: ret.data, username: username}))
    } catch (error) {
        console.error(error)
    }
}

export const deleteUserCourses = (username, course_id) => async dispatch => {
    // console.log('store hit')
    // console.log(username)
    // console.log(course_id)
    let ret
    try {
        await axios.delete(`http://localhost:3000/api/students/remove_course`, {data: {
            username,
            course_id
        }})
        ret = await axios.get(`http://localhost:3000/api/students/${username}`)
        dispatch(deleteCourses({data:ret.data, username: username}))
    } catch (error) {
        console.error(error)
    }
}

/**
 * REDUCER
 */

export default function students(state = studentsState, action) {
    switch(action.type) {
        case GET_STUDENT_COURSES:
            return action.courses
        case ADD_STUDENT_COURSES:
            return action.courses
        case DELETE_STUDENT_COURSES:
            return action.courses
        default:
            return state
    }
}