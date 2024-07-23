const MY_TRANSACTIONS = 'transactions/mine'
const NEW_TRANSACTION = 'transaction/new'
const DELETE_TRANSACTION = 'transaction/remove'


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

export const thunkTransactionsGet = (payload) => async (dispatch) =>{
    await fetch('/api/transactions/update_status',{
        method:'PATCH'
    })

    const response = await fetch('/api/transactions/')

    if(response.ok){
        const {transactions} = await response.json()

        await dispatch(loadTransactions(transactions))
        return transactions
    }else{
        const data = await response.json()
        console.log(data)
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
        console.log(data)
    }
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
        default:
            return state
    }
}


export default transactionReducer;
