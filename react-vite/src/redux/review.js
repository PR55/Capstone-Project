const LOAD_MY_REVIEWS = 'review/all'
const LOAD_ONE_REVIEW = 'review/one'
const LOAD_DELETE_REVIEW = 'review/delete'
const LOAD_CLEAR_THUNK = 'reviews/clear'

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

export const thunkMyReviewsLoad = () => async (dispatch) => {
    const response = await fetch('/api/reviews/')
    if(response.ok){
        const {reviews} = await response.json()
        dispatch(loadReviews(reviews));
        return reviews
    }
}

export const thunkOneReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`)
    if(response.ok){
        const {review} = await response.json()
        await dispatch(loadReview(review))
    }
}

export const thunkNewReview = (payload, id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/products/${id}`, {
        method:'POST',
        body:payload
    })
    if(response.ok){
        const {review} = await response.json()
        await dispatch(loadReview(review))
        return review;
    }else{
        const data = await response.json()
        if(data?.errors) return data;
    }
}

export const thunkUpdateReview = (payload, id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method:'PUT',
        body:payload
    })
    if(response.ok){
        const {review} = await response.json()
        await dispatch(loadReview(review))
        return review;
    }else{
        const data = await response.json()
        if(data?.errors) return data;
    }
}

export const thunkDeleteReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method:'DELETE'
    })
    if ( response.ok){
        const {id} = await response.json()
        await dispatch(deleteReview(id))
    }
}

const initialState = {}

function reviewReducer(state = initialState, action){
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
        default:
            return state
    }
}

export default reviewReducer;
