import { useSelector, useDispatch } from "react-redux";
import { thunkTransactionDelete, thunkTransactionsGet, thunkTransactionUpdate } from "../../redux/transaction";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './TransactionDetail.css'

function TransactionDetail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { transactionId } = useParams()
    const transactions = useSelector(store => store.transactions)

    const [transaction, setTransaction] = useState({})

    const [total, setTotal] = useState(0)

    const [productArr, setProductArr] = useState([])

    const [sendArr, setSendArr] = useState([])

    const [productChangeBool, setProductChangeBool] = useState(false)

    useEffect(() => {
        dispatch(thunkTransactionsGet())
    }, [])

    useEffect(() => {
        if (transactionId && Object.values(transactions).length) {
            setTransaction(transactions[transactionId])
        }
    }, [transactions, transactionId])

    useEffect(()=>{
        if(transaction?.products){
            let t = 0

            for(let product of transaction.products){
                t += product.price
            }

            setTotal(t)

            setProductArr(transaction.products.map(()=> true))
            setSendArr(transaction.products.map((product) => product.id))
        }
    }, [transaction])

    useEffect(()=>{
        if(transaction?.products){
            setProductArr(transaction.products.map((product)=> sendArr.includes(product.id)))
        }
    }, [productChangeBool])

    function manageProducts(e){
        let arr = sendArr

        let value = parseInt(e.target.value)

        if(e.target.checked){
            arr.push(value)
        }else if(arr.includes(value)){
            let ind = arr.indexOf(value)
            if (ind == 0) {
                arr = arr.slice(1)
            } else if (ind == arr.length - 1) {
                arr.pop()
            } else if (ind > 0) {
                arr = arr.slice(0, ind).concat(arr.slice(ind + 1))
            }
        }

        setSendArr(arr)
        setProductChangeBool(!productChangeBool)
    }

    async function deleteTransaction(e){
        e.preventDefault()
        let d = await dispatch(thunkTransactionDelete(transaction.id))
        if(d?.errors){
            console.log(d.errors)
        }else{
            navigate('/my-transactions')
        }
    }

    async function updateTransaction(e){
        e.preventDefault()
        if(!sendArr.length){
            await deleteTransaction(e)
        }else{
            const payload = {
                'products':[...sendArr]
            }

            let d = await dispatch(thunkTransactionUpdate(payload, transaction.id))

            if(d?.errors){
                console.log(d.errors)
            }
        }
    }

    return (
        <div className="holderDetail">
            {
                !Object.values(transaction).length
                    ?
                    <div className="emptyDetail">
                        <h1>Nothing to show. Go find some product(s) to purchase!</h1>

                        <div className="navButtonsDetail">
                            <button onClick={() => navigate('/traditional/products')}>Traditional Products</button>
                            <button onClick={() => navigate('/electronic/products')}>Electronic Products</button>
                        </div>
                    </div>
                    :
                    <div className="detailHolder">
                        <h1>Your Order:</h1>
                        <div className="detailDisplay">
                            {
                                transaction.products.map((product, index) => {
                                    return (
                                        <div className="detailBlock" key={product.id}>
                                            <div className='imageHolderDetail'>
                                                <img src={product.image.imageUrl} alt={'gameImg'} />
                                            </div>
                                            <div className='descriptionDetail'>
                                                <p className='title' onClick={() => navigate(`/products/${product.id}`)}>{product.name.length > 40 ?product.name.slice(0,40) + '...' :product.name}</p>
                                                <p className='creator'>Seller: {product.owner?.username}</p>
                                                <p>${product.price}</p>
                                            </div>
                                            <div className={transaction.status != 'Pending'? 'hide-transac': "interactDetail"}>
                                                <input
                                                type="checkbox"
                                                value={product.id}
                                                checked={productArr[index]}
                                                onClick={manageProducts}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="detailInfo">
                            <div className="manageDetailButtons">
                                <button onClick={updateTransaction} className="transac-update" disabled={transaction.status !== "Pending" || sendArr.length == transaction?.products.length}>Update transaction</button>
                                <button onClick={deleteTransaction} className="transac-danger" disabled={transaction.status !== "Pending"}>Dicard transaction</button>
                            </div>
                            <p>Total: ${total.toFixed(2)}</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default TransactionDetail;