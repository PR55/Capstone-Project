const MY_TRANSACTIONS = 'transactions/mine'
const NEW_TRANSACTION = 'transaction/new'
const DELETE_TRANSACTION = 'transaction/remove'
const CLEAR_TRANSACTION = 'transaction/clear'


const loadTransactions = (transactions) => ({
    type:MY_TRANSACTIONS,
    payload:transactions
})

const loadTransaction = (transaction) => ({
    type:NEW_TRANSACTION,
    payload:transaction
})

const removeTransaction = (id) => ({
    type:DELETE_TRANSACTION,
    payload:id
})

const clearThunk = () => ({
    type:CLEAR_TRANSACTION
})

export const thunkTransactionsGet = () => async (dispatch) =>{
    await fetch('/api/transactions/update_status',{
        method:'PATCH'
    })

    const response = await fetch('/api/transactions/')

    if(response.ok){
        const {transactions} = await response.json()

        await dispatch(loadTransactions(transactions))
        return transactions
    }
}

export const thunkTransactionOne = (id) => async (dispatch) =>{
    await fetch('/api/transactions/update_status',{
        method:'PATCH'
    })

    const response = await fetch(`/api/transactions/${id}`)

    if(response.ok){
        const {transaction} = await response.json()
        await dispatch(loadTransaction(transaction))
        return transaction
    }
}

export const thunkTransactionCreate = (payload) => async (dispatch) =>{
    const response = await fetch('/api/transactions/', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    })

    if(response.ok){
        const {transaction} = await response.json()
        await dispatch(loadTransaction(transaction))
        await fetch('/api/transactions/update_status',{
            method:'PATCH'
        })
        return transaction
    }else{
        const data = await response.json()
        return data
    }
}

export const thunkTransactionUpdate = (payload, id) => async (dispatch) =>{
    const response = await fetch(`/api/transactions/${id}`, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    })

    if(response.ok){
        const {transaction} = await response.json()
        await dispatch(loadTransaction(transaction))
        return transaction
    }else{
        const data = await response.json()
        return data
    }
}

export const thunkTransactionDelete = (id) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${id}`, {
        method:"DELETE"
    })

    if(response.ok){
        const {id} = await response.json()
        await dispatch(removeTransaction(id))
        return id
    }else{
        const data = await response.json()
        return data
    }
}

export const clearThunkTransactions = () => async (dispatch) => {
    await dispatch(clearThunk())
}

const initialState = {}

function transactionReducer(state = initialState, action){
    switch(action.type){
        case MY_TRANSACTIONS:{
            const newState = {}
            for(let item of action.payload){
                newState[item.id] = item
            }
            return newState;
        }
        case NEW_TRANSACTION:{
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_TRANSACTION:{
            let oldState = Object.values(state)
            let newState = {}
            for(let transac of oldState){
                if(transac.id !== action.payload){
                    newState[transac.id] = transac
                }
            }
            return newState;
        }
        case CLEAR_TRANSACTION:{
            return {}
        }
        default:
            return state
    }
}


export default transactionReducer;
