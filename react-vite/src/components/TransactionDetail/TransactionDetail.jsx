import { useSelector, useDispatch } from "react-redux";
import { thunkTransactionDelete, thunkTransactionUpdate, thunkTransactionOne } from "../../redux/transaction";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiaSpinnerSolid } from "react-icons/lia";
import './TransactionDetail.css'

function TransactionDetail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { transactionId } = useParams()

    const user = useSelector(store => store.session.user)
    const transactions = useSelector(store => store.transactions)

    const [transaction, setTransaction] = useState({})

    const [total, setTotal] = useState(0)

    const [productArr, setProductArr] = useState([])

    const [sendArr, setSendArr] = useState([])

    const [productChangeBool, setProductChangeBool] = useState(false)

    if(!user){
        navigate('/')
        window.scrollTo({top:0, left:0, behavior:"instant"})
    }

    const [isLoading, setLoading] = useState(false)

    async function delayThunkCall() {

        var longUserLoad = null

        if(longUserLoad!= null && !isLoading){
            window.clearTimeout(longUserLoad)
            longUserLoad = null
        }else{
            setLoading(true)
            longUserLoad = setTimeout(async () => {
                await dispatch(thunkTransactionOne(transactionId))
                setLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    useEffect(() => {
        if(transactionId)
            delayThunkCall()
    }, [transactionId])

    useEffect(() => {
        if (transactionId && Object.values(transactions).length) {
            setTransaction(transactions[transactionId])
        }
    }, [transactions])

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
        e.stopPropagation()
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
            return
        }else{
            navigate('/my-transactions')
            window.scrollTo({top:0, left:0, behavior:"instant"})
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
                return
            }
        }
    }

    return (
        <div className="holderDetail">
            {
                isLoading
                ?
                <>
                <h1>Loading order...</h1>
                <LiaSpinnerSolid className='spinner'/>
                </>
                :
                Object.values(transaction).length ?
                <div className="detailHolder">
                        <h1>Your Order:</h1>
                        <h2>Status: {transaction?.status}</h2>
                        <div className="detailDisplay">
                            {
                                transaction.products.map((product, index) => {
                                    return (
                                        <div className="detailBlock" key={product.id}  onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(`/products/${product.id}`)
                                            window.scrollTo({top:0, left:0, behavior:"instant"})
                                        }}>
                                            <div className='imageHolderDetail'>
                                                <img src={product.image.imageUrl} alt={'gameImg'} />
                                            </div>
                                            <div className='descriptionDetail'>
                                                <p className='title'>{product.name.length > 40 ?product.name.slice(0,40) + '...' :product.name}</p>
                                                <p className='creator'>Seller: {product.owner?.username}</p>
                                                <p>${product.price}</p>
                                            </div>
                                            <div className={transaction.status != 'Pending'? 'hide-transac': "interactDetailTransac"}>
                                                <input
                                                type="checkbox"
                                                value={product.id}
                                                checked={productArr[index]}
                                                onClick={manageProducts}
                                                />
                                            </div>
                                            <div className={transaction.status != 'Delivered' || (product?.review && product.review != null)? 'hide-transac': "interactDetailTransac"}>
                                                <button onClick={e => {
                                                    e.stopPropagation()
                                                    navigate(`/reviews/${product.id}/new`)
                                                    window.scrollTo({top:0, left:0, behavior:"instant"})
                                                }}>Leave review</button>
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
                    :<h1>Transaction does not exist</h1>
            }
        </div>
    )
}

export default TransactionDetail;
