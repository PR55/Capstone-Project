const GET_ONE_USER = 'user/load_one'

const loadUser = (user) => ({
    type:GET_ONE_USER,
    payload:user
})

export const getOneUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`)
    if(response.ok){
        const user = await response.json()
        await dispatch(loadUser(user))
        return user
    }
}

const initialState = {}

function UserReducer(state=initialState, action){
    switch(action.type){
        case GET_ONE_USER:{
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        default:
            return state
    }
}

export default UserReducer;
