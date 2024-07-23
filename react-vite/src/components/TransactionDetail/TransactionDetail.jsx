import { useSelector, useDispatch } from "react-redux";
import { thunkTransactionsGet } from "../../redux/transaction";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TransactionDetail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { transactionId } = useParams()
    const transactions = useSelector(store => store.transactions)

    const [transaction, setTransaction] = useState({})

    const [total, setTotal] = useState(0)

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
        }
    }, [transaction])

    return (
        <div className="holderCart">
            {
                !Object.values(transaction).length
                    ?
                    <div className="emptyCart">
                        <h1>Nothing to show. Go find some product(s) to purchase!</h1>

                        <div className="navButtonsCart">
                            <button onClick={() => navigate('/traditional/products')}>Traditional Products</button>
                            <button onClick={() => navigate('/electronic/products')}>Electronic Products</button>
                        </div>
                    </div>
                    :
                    <div className="cartHolder">
                        <h1>Your Order:</h1>
                        <div className="cartDisplay">
                            {
                                transaction.products.map(product => {
                                    return (
                                        <div className="cartBlock" key={product.id}>
                                            <div className='imageHolderCart'>
                                                <img src={product.image.imageUrl} alt={'gameImg'} />
                                            </div>
                                            <div className='descriptionCart'>
                                                <p className='title' onClick={() => navigate(`/products/${product.id}`)}>{product.name.length > 30 ?product.name.slice(0,30) + '...' :product.name}</p>
                                                <p className='creator'>Seller: {product.owner?.username}</p>
                                                <p>${product.price}</p>
                                            </div>
                                            <div className="interactCart">
                                                <button onClick={(e) => {
                                                    e.preventDefault()
                                                    removeFromCart(product.id);
                                                    setReload(!reloadCart)
                                                }}>Remove</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="cartInfo">
                            <div className="manageCartButtons">
                                {/* <button onClick={submitCart} className="confirmCart">Complete Purchase</button> */}
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    clearCart();
                                    setReload(!reloadCart)
                                }} className="danger" disabled={transaction.status !== "Pending"}>Dicard transaction</button>
                            </div>
                            <p>Total: ${total}</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default TransactionDetail;
