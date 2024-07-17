const LOAD_MY_CONTENT = 'myContent/loadContent'
const EMPTY_MY_CONTENT = 'myContent/clearContent'

const loadContent = (content) =>({
    type:LOAD_MY_CONTENT,
    payload:content
})

const clearContent = () =>({
    type:EMPTY_MY_CONTENT,
    payload:{}
})

export const thunkCurrentUserProducts = () => async (dispatch) => {
    const response = await fetch('/api/users/products')

    if(response.ok){
        const {products} = await response.json()
        await dispatch(loadContent(products))
    }
}

export const thunkCurrentUserArticles =() => async (dispatch) =>{
    const response = await fetch('/api/users/articles')

    if(response.ok){
        const {articles} = await response.json()
        await dispatch(loadContent(articles))
        return articles
    }
}

export const clearThunk = () => async (dispatch)=> {
    await dispatch(clearContent())
}


const initialState = {}

function userContentReducer(state = initialState, action){
    switch(action.type){
        case LOAD_MY_CONTENT:{
            const newState = {}
            for(let item of action.payload){
                newState[item.id] = item
            }
            return newState
        }
        case EMPTY_MY_CONTENT:{
            return initialState
        }
        default:
            return state
    }
}

export default userContentReducer;
