const LOAD_MY_REVIEWS = 'comments/all'
const LOAD_ONE_REVIEW = 'comment/one'
const LOAD_DELETE_REVIEW = 'comments/delete'
const LOAD_CLEAR_THUNK = 'comments/clear'

const loadReviews = (reviews) => ({
    type:LOAD_MY_REVIEWS,
    payload:reviews
})

const loadReview = (review) => ({
    type:LOAD_ONE_REVIEW,
    payload:review
})

const deleteReview = (id) => ({
    type:LOAD_DELETE_REVIEW,
    payload:id
})

const clearReviews = () => ({
    type:LOAD_CLEAR_THUNK
})

export const thunkMyCommentsLoad = () => async (dispatch) => {
    const response = await fetch('/api/comments/')
    if(response.ok){
        const {comments} = await response.json()
        dispatch(loadReviews(comments));
        return comments
    }
}

export const thunkOneComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`)
    if(response.ok){
        const {comment} = await response.json()
        await dispatch(loadReview(comment))
    }
}

export const thunkUpdateComment = (payload, id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method:'PUT',
        body:payload
    })
    if(response.ok){
        const {comment} = await response.json()
        await dispatch(loadReview(comment))
        return comment;
    }else{
        const data = await response.json()
        if(data?.errors) return data;
    }
}

export const thunkDeleteComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method:'DELETE'
    })
    if ( response.ok){
        const {id} = await response.json()
        await dispatch(deleteReview(id))
    }
}

export const thunkClearComments = () => async (dispatch) => {
    await dispatch(clearReviews())
}

const initialState = {}

function commentReducer(state = initialState, action){
    switch(action.type){
        case LOAD_MY_REVIEWS:{
            const newState = {};
            for(let review of action.payload){
                newState[review.id] = review;
            }
            return newState;
        }
        case LOAD_ONE_REVIEW:{
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case LOAD_DELETE_REVIEW:{
            const newState = {}

            for(let review of Object.values(state)){
                if(review.id != action.payload){
                    newState[review.id] = review
                }
            }

            return newState
        }
        case LOAD_CLEAR_THUNK:{
            return {}
        }
        default:
            return state
    }
}

export default commentReducer;
