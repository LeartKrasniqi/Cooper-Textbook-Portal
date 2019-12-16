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
/**
 * INITIAL STATE
 */

const teachersState = {}

/**
 * ACTION CREATORS
 */

const getCourses = courses => ({type: GET_TEACHER_COURSES, courses})
const addTextbook = textbooks => ({type: ADD_TEXTBOOK, textbooks})
const deleteTextbook = textbooks => ({type: DELETE_TEXTBOOK, textbooks})
const editTextbook = textbooks => ({type: EDIT_TEXTBOOK, textbooks})
const getPendingLinks = courses => ({type: GET_PENDING_LINKS, courses})
const removePendingLinks = suggested_links => ({type: REMOVE_PENDING_LINKS, suggested_links})

/**
 * THUNK CREATORS
 */
export const getTeacherCourses = (username) => async dispatch => {
    let res
    try {
        res = await axios.get(`http://localhost:3000/api/teachers/${username}`)
        dispatch(getCourses(res.data))
    } catch (error) {
        console.error(error)
    }
}

export const addTeacherTextbook = (course_id, textbook_id, authors, title, edition, amazon_url, pdf_url) => async dispatch => {
    let ret
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

        ret = await axios.post('http://localhost:3000/api/teachers/add_course_textbook', {
            course_id,
            textbook_id,
        })
        
        dispatch(addTextbook(ret.data))
    } catch (error) {
        console.error(error)
    }
}

export const deleteTeacherTextbook = (course_id, textbook_id) => async dispatch => {
    let res
    try {
        res = await axios.delete(`http://localhost:3000/api/teachers/delete_course_textbook`,{
            course_id,
            textbook_id
        })
        dispatch(deleteTextbook(res.data))
    } catch (error) {
        console.error(error)
    }
}

export const editTeacherTextbook = (textbook_id, authors, title, edition, amazon_url, pdf_url) => async dispatch => {
    let ret
    try {
        ret = await axios.put(`http://localhost:3000/api/teachers/edit_textbook/${textbook_id}`, {
            authors,
            title,
            edition,
            amazon_url,
            pdf_url
        })
        
        dispatch(editTextbook(ret.data))
    } catch (error) {
        console.error(error)
    }
}

export const getTeacherPendingLinks = (course_id) => async dispatch => {
    let res
    try {
        res = await axios.get(`http://localhost:3000/api/teachers/suggested_links/${course_id}`)
        dispatch(getPendingLinks(res.data))
    } catch (error) {
        console.error(error)
    }
}

export const removeTeacherPendingLinks = (course_id, username) => async dispatch => {
    let res
    try {
        res = await axios.delete(`http://localhost:3000/api/teachers/suggested_link/remove`,{
            course_id,
            username
        })
        dispatch(removePendingLinks(res.data))
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
            return action.textbooks
        default:
            return state
    }
}