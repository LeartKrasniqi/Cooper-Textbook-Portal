import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'

const GET_USERNAME = 'GET_USERNAME'
const GET_USERFAILED = 'GET_USERFAILED'
const GET_TARGETUSER = 'GET_TARGETUSER'

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

export const fetchSingleUser = userId => async dispatch => {
  const res = await axios.get(`/api/users/${userId}`);
  const user = res.data[0];
  dispatch(getUser(user));
} 

export const updateUser = (updateInfo, id) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${id}`, updateInfo)
    const user = res.data;
    dispatch(editUser(user[0]));
  } catch (error) {
    console.log(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    if(res.data.accountSetUp === false) {
      //history.push('/updateuser')
    } else {
      //history.push('/home')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    //history.push('/login')
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