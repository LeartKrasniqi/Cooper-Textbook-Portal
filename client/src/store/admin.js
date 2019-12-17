import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PENDING_PROFS = 'GET_PENDING_PROFS'
const APPROVE_PROF = "APPROVE_PROF"
/**
 * INITIAL STATE
 */

const adminState = {}

/**
 * ACTION CREATORS
 */
const allPendingProfs = profs => ({type: GET_PENDING_PROFS, profs})
const approveProf = (profs) => ({type: APPROVE_PROF, profs})
/**
 * THUNK CREATORS
 */

export const getPendingProfs = () => async dispatch => {
    let res
    try {
        res = await axios.get('http://localhost:3000/api/admin/pending_profs')
        dispatch(allPendingProfs(res.data))
    } catch (error) {
        console.error(error)
    }
}

export const removePendingProf = username => async dispatch => {
    let res
    try {
        await axios.put(`http://localhost:3000/api/admin/approve_prof/${username}`,{is_approved: true})
        res = await axios.get('http://localhost:3000/api/admin/pending_profs')
        dispatch(approveProf(res.data))
    } catch (error) {
        
    }
}


/**
 * REDUCER
 */
export default function admin(state=adminState, action) {
    switch(action.type) {
        case GET_PENDING_PROFS:
            return action.profs
        case APPROVE_PROF:
            return action.profs
        default:
            return state
    }
}