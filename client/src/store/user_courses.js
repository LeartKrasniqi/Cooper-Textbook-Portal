import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER_COURSES = 'GET_USER_COURSES'
const ADD_USER_COURSES = 'ADD_USER_COURSES'
/**
 * INITIAL STATE
 */

const user_courses_state = {}

/**
 * ACTION CREATORS
 */

const getUserCourses = courses => ({type: GET_USER_COURSES, courses})
const addUserCourses = courses => ({type: ADD_USER_COURSES, courses})

/**
 * THUNK CREATORS
 */
export const userCourses = username => async dispatch => {
    let res
    try {
        res = await axios.get(`http://localhost:3000/api/user_courses/${username}`)
        dispatch(getUserCourses(res.data))
    } catch (err) {
        console.error(err)
    }
}

export const addCourse = (username, course) => async dispatch => {
    let res, ret
    try {
        res = await axios.post(`http://localhost:3000/api/user_courses/add_course`, {username, course_id: course})
        ret = await axios.get(`http://localhost:3000/api/user_courses/${username}`)
        dispatch(addUserCourses(ret.data))
    } catch (error) {
        console.error(error)
    }
}

/**
 * REDUCER
 */

export default function user_courses(state = user_courses_state, action) {
    switch(action.type) {
        case GET_USER_COURSES:
            return action.courses
        default:
            return state
    }
 }
  


