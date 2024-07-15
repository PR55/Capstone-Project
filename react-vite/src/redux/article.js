const GET_ARTICLES = 'articles/all'
const GET_ARTICLE = 'articles/one'

const loadArticles = (articles) => ({
    type:GET_ARTICLES,
    payload:articles
})

const loadArticle = (article) => ({
    type:GET_ARTICLE,
    payload:article
})

export const thunkLoadArticles =() => async (dispatch) =>{
    const response = await fetch('/api/articles/')

    if(response.ok){
        const {articles} = await response.json()
        await dispatch(loadArticles(articles))
        return articles
    }
}

export const thunkCurrentUserArticles =() => async (dispatch) =>{
    const response = await fetch('/api/users/articles')

    if(response.ok){
        const {articles} = await response.json()
        await dispatch(loadArticles(articles))
        return articles
    }
}

export const thunkLoadOneArticle = (id) => async (dispatch)=> {
    const response = await fetch(`/api/articles/${id}`)

    if(response.ok){
        const {article} = await response.json()
        await dispatch(loadArticle(article))
        return article
    }
}

export const makeOneArticle = (payload) => async (dispatch) => {
    const response = await fetch(`/api/articles/`, {
        method:'POST',
        body:payload
    })

    if(response.ok){
        const {article} = await response.json()
        await dispatch(loadArticle(article))
        return article
    }else{
        const data = await response.json()
        return data
    }
}

const initialState = {}

function articleReducer(state = initialState, action){
    switch(action.type){
        case GET_ARTICLES:{
            const newState = {}
            for(let article of action.payload){
                newState[article.id] = article
            }
            return newState
        }
        case GET_ARTICLE:{
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        default:
            return state
    }
}

export default articleReducer;
