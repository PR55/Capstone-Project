const GET_PRODUCTS = 'products/all'
const GET_PRODUCT = 'products/one'

const loadProducts = (products) => ({
    type:GET_PRODUCTS,
    payload:products
})

const loadProduct = (product) => ({
    type:GET_PRODUCT,
    payload:product
})


export const thunkProductsLoad = () => async (dispatch) => {
    const response = await fetch("/api/products/")
    if(response.ok){
        const data = await response.json()
        await dispatch(loadProducts(data.products));
        return data.products
    }
}

export const thunkProductLoadOne = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    if(response.ok){
        const data = await response.json()
        await dispatch(loadProduct(data.product));
        return data.product
    }
}

export const thunkNewProduct = (payload) => async (dispatch) => {
    const response = await fetch("/api/products/",{
        method:'POST',
        body: payload
    })
    if (response.ok) {
        const { product } = await response.json();
        await dispatch(loadProduct(product));
        return product
    } else {
        console.log("There was an error making your post!")
        const data = await response.json()
        console.log(data)
        return data
    }
}

export const thunkUpdateProduct = (payload, id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`,{
        method:'PUT',
        body: payload
    })
    if (response.ok) {
        const { product } = await response.json();
        await dispatch(loadProduct(product));
        return product
    } else {
        console.log("There was an error making your post!")
        console.log(response)
        const data = await response.json()
        console.log(data)
        return data
    }
}

const initialState = {};

function productReducer(state = initialState, action) {
    switch (action.type) {
    case GET_PRODUCTS:{
        let newState = {}
        for (let product of action.payload){
            newState[product.id] = product
        }
        return newState
    }
    case GET_PRODUCT:{
        let newState = {...state}
        newState[action.payload.id] = action.payload
        return newState
    }
    default:
        return state;
  }
}

export default productReducer;
