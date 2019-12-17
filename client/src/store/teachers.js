import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TEACHER_COURSES = 'GET_TEACHER_COURSES'
const ADD_TEXTBOOK = 'ADD_TEXTBOOK'
const DELETE_TEXTBOOK = 'DELETE_TEXTBOOK'
const EDIT_TEXTBOOK = 'EDIT_TEXTBOOK'
const GET_PENDING_LINKS = 'GET_PENDING_LINKS'
const REMOVE_PENDING_LINKS = 'REMOVE_PENDING_LINKS'
const GET_COURSES_LINKS = 'GET_COURSES_LINKS'
/**
 * INITIAL STATE
 */

const teachersState = {}

/**
 * ACTION CREATORS
 */

const getCourses = courses => ({type: GET_TEACHER_COURSES, courses})
const addTextbook = courses => ({type: ADD_TEXTBOOK, courses})
const deleteTextbook = courses => ({type: DELETE_TEXTBOOK, courses})
const editTextbook = courses => ({type: EDIT_TEXTBOOK, courses})
const getPendingLinks = suggested_links => ({type: GET_PENDING_LINKS, suggested_links})
const removePendingLinks = suggested_links => ({type: REMOVE_PENDING_LINKS, suggested_links})
const coursesAndLinks = data => ({type:GET_COURSES_LINKS, data})
/**
 * THUNK CREATORS
 */
export const getTeacherCoursesAndLinks = (username) => async dispatch => {
    let courses, links
    try {
        courses = await axios.get(`http://localhost:3000/api/teachers/${username}`)
        links = await axios.get(`http://localhost:3000/api/teachers/suggested_links/${username}`)
        dispatch(coursesAndLinks({courses:courses.data, links:links.data, username: username}))
    } catch (error) {
        console.error(error)
    }
}

export const getTeacherCourses = (username) => async dispatch => {
    let res
    try {
        res = await axios.get(`http://localhost:3000/api/teachers/${username}`)
        dispatch(getCourses({data: res.data, username: username }))
    } catch (error) {
        console.error(error)
    }
}

export const addTeacherTextbook = (username, course_id, textbook_id, authors, title, edition, amazon_url, pdf_url) => async dispatch => {
    let courses, links
    try {
        await axios.post('http://localhost:3000/api/teachers/add_textbook', {
            course_id,
            textbook_id,
            authors,
            title,
            edition,
            amazon_url,
            pdf_url
        })

        await axios.post('http://localhost:3000/api/teachers/add_course_textbook', {
            course_id,
            textbook_id,
        })

        // res = await axios.get(`http://localhost:3000/api/teachers/${username}`)
        
        courses = await axios.get(`http://localhost:3000/api/teachers/${username}`)
        links = await axios.get(`http://localhost:3000/api/teachers/suggested_links/${username}`)
        dispatch(addTextbook({courses:courses.data, links:links.data, username: username}))

        // dispatch(addTextbook({data: res.data, username: username }))
    } catch (error) {
        console.error(error)
    }
}

export const deleteTeacherTextbook = (username, course_id, textbook_id) => async dispatch => {
    let courses, links
    try {
        await axios.delete(`http://localhost:3000/api/teachers/delete_course_textbook`,{data: {
            course_id,
            textbook_id
        }})

        courses = await axios.get(`http://localhost:3000/api/teachers/${username}`)
        links = await axios.get(`http://localhost:3000/api/teachers/suggested_links/${username}`)
        dispatch(deleteTextbook({courses:courses.data, links:links.data, username: username}))
    } catch (error) {
        console.error(error)
    }
}

export const editTeacherTextbook = (username, textbook_id, edition, amazon_url, pdf_url) => async dispatch => {
    let courses 
    try {
        await axios.put(`http://localhost:3000/api/teachers/edit_textbook/${textbook_id}`, {
            edition,
            amazon_url,
            pdf_url
        })
        
        courses = await axios.get(`http://localhost:3000/api/teachers/${username}`)
        dispatch(editTextbook({courses:courses.data, username: username }))
    } catch (error) {
        console.error(error)
    }
}

export const getTeacherPendingLinks = (username) => async dispatch => {
    let res
    try {
        res = await axios.get(`http://localhost:3000/api/teachers/suggested_links/${username}`)
        dispatch(getPendingLinks({data: res.data, username: username }))
    } catch (error) {
        console.error(error)
    }
}

export const removeTeacherPendingLinks = (username, course_id) => async dispatch => {
    let res
    try {
        await axios.delete(`http://localhost:3000/api/teachers/suggested_links/remove`,{ data: {
            course_id,
            username
        }})

        res = await axios.get(`http://localhost:3000/api/teachers/suggested_links/${username}`)
        dispatch(removePendingLinks({data: res.data, username: username }))
    } catch (error) {
        console.error(error)
    }
}


/**
 * REDUCER
 */

export default function teachers(state = teachersState, action) {
    switch(action.type) {
        case GET_TEACHER_COURSES:
            return action.courses
        case ADD_TEXTBOOK:
            return action.courses
        case DELETE_TEXTBOOK:
            return action.courses
        case EDIT_TEXTBOOK:
            return action.courses
        case GET_PENDING_LINKS:
            return action.suggested_links
        case REMOVE_PENDING_LINKS:
            return action.suggested_links
        case GET_COURSES_LINKS:
            return action.data
        default:
            return state
    }
}