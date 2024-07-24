import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkTransactionsGet } from "../../redux/transaction";
import './TransactionHistory.css'
import { useNavigate } from "react-router-dom";
import { FaThumbtack } from "react-icons/fa";

function TransactionHistory() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const transactions = useSelector(store => store.transactions)

    const [sorted, setSorted] = useState([])

    const randomColors = [
        '#f44244',
        '#161ef0',
        '#289b12',
        '#f0c637',
        'gray'
    ]

    useEffect(() => {
        dispatch(thunkTransactionsGet())
    }, [])

    useEffect(() => {
        if (Object.values(transactions).length) {
            let arr = Object.values(transactions)

            arr.sort((a, b) => {
                let date1 = new Date(a.timeCreated)
                let date2 = new Date(b.timeCreated)
                if (date1 > date2) {
                    return 1
                } else if (date1 < date2) {
                    return -1
                } else {

                }
            })

            setSorted(arr)
        }
    }, [transactions])

    return (
        <div className='orders-Page'>
            <h1>Your Orders:</h1>
            <div className="Orders-Display">
            {
                sorted.length
                    ? sorted.map((transaction, index) => {
                        return (
                            <div className="order-Block">
                                <div className="transac-header">
                                    <FaThumbtack className="transaceDecorator" color={randomColors[Math.floor(((randomColors.length) - 0) * Math.random())]}/>
                                    <p>Transaction #{index + 1}</p>
                                    <p>{transaction.status}</p>
                                </div>
                                <div className="transac-img-display">
                                        {
                                            transaction.products.map((product, index) => {
                                                if (index < 3) {
                                                    return (
                                                        <div className="transac-img">
                                                            <img src={product.image.imageUrl} />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        {
                                            transaction.products.length < 3
                                            ?
                                            null
                                            :
                                            <div className="transac-img">
                                                <p>+{transaction.products.length - 3}</p>
                                            </div>
                                        }

                                    </div>
                                <div className="transac-options">
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        navigate(`/transaction/${transaction.id}`)
                                    }}>View Order</button>
                                </div>
                            </div>
                        )
                    })
                    : <h1>Go purchase some products, none have been made for this user!</h1>
            }
            </div>
        </div>
    )
}

export default TransactionHistory;
