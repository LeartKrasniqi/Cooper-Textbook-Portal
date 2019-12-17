import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'


const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const editUser = user => ({type: EDIT_USER, user})

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:3000/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post('http://localhost:3000/auth/login', {username: email, password})
    dispatch(getUser(res.data))
  } catch (error) {
    return dispatch(getUser({error}))
  }
}

export const signup = (email, password, type, is_approved) => async dispatch => {
  let res
  try {
    res = await axios.post('http://localhost:3000/auth/signup', {username: email, password, type, is_approved})
    dispatch(getUser(res.data))
  } catch (error) {
    return dispatch(getUser({error}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function user (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}