import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkTransactionsGet } from "../../redux/transaction";
import './TransactionHistory.css'
import { useNavigate } from "react-router-dom";
import { FaThumbtack } from "react-icons/fa";
import { LiaSpinnerSolid } from "react-icons/lia";

function TransactionHistory() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const transactions = useSelector(store => store.transactions)

    const [sorted, setSorted] = useState([])

    const [isLoading, setLoading] = useState(false)

    const [pageNumbers, setPageNumbers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const numProductsForPage = 6

    const parseNum = 3

    function setPages(arr, page = 1) {

        if (!arr?.length) {
            return
        }

        if (arr.length < numProductsForPage) {
            setSorted(arr)
            setPageNumbers([1])
            return
        }

        let val = arr.length / numProductsForPage;

        let arr2 = arr.slice((numProductsForPage * (page - 1)), numProductsForPage * page)
        setSorted(arr2)

        let pageArr = []

        for (let i = 0; i < val; i++) {
            pageArr.push(i + 1)
        }

        setPageNumbers(pageArr)

        if (page > pageArr[pageArr.length - 1]) {
            setCurrentPage(pageArr[pageArr.length - 1])
        }
    }

    async function delayThunkCall() {

        var longTransacLoad = null

        if(longTransacLoad!= null && !isLoading){
            window.clearTimeout(longTransacLoad)
            longTransacLoad = null
        }else{
            setLoading(true)
            longTransacLoad = setTimeout(async () => {
                await dispatch(thunkTransactionsGet())
                setLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    async function delayThunkCall2(arr) {

        var longTransacLoad = null

        if(longTransacLoad!= null && !isLoading){
            window.clearTimeout(longTransacLoad)
            longTransacLoad = null
        }else{
            setLoading(true)
            longTransacLoad = setTimeout(async () => {
                await setPages(arr, currentPage)
                setLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    const randomColors = [
        '#f44244',
        '#161ef0',
        '#289b12',
        '#f0c637',
        'gray'
    ]

    useEffect(() => {
        delayThunkCall()
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
                    return 0;
                }
            })

            delayThunkCall2(arr)

        }
    }, [transactions, currentPage])

    return (
        <div className='orders-Page'>
            <h1>Your Orders:</h1>
            <div className="Orders-Display">
            {
                isLoading ?
                <LiaSpinnerSolid className="spinner"/>
                :
                sorted.length
                    ? sorted.map((transaction, index) => {
                        return (
                            <div key={transaction.id} className="order-Block" onClick={(e) => {
                                e.preventDefault()
                                navigate(`/transaction/${transaction.id}`)
                            }}>
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
                                                        <div key={product.id} className="transac-img">
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
                            </div>
                        )
                    })
                    : <h1>Go purchase some products, none have been made for this user!</h1>
            }
            </div>
            <div className='paginationNav'>
                            {
                                pageNumbers.length && currentPage !== 1
                                    ?
                                    <p
                                        onClick={e => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setPageNumbers([])
                                            setCurrentPage(1)
                                            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                                        }}
                                        className='decoratorPageNums'
                                    >{'<<'}</p>
                                    :
                                    null
                            }
                            {
                                pageNumbers.length && currentPage > 1
                                    ?
                                    <p
                                        onClick={e => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setPageNumbers([])
                                            setCurrentPage(currentPage - 1)
                                            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                                        }}
                                        className='decoratorPageNums'
                                    >{'<'}</p>
                                    :
                                    null
                            }
                            {
                                pageNumbers.map((number, index) => {
                                    if (number >= currentPage - (parseNum - 1) && number < currentPage + parseNum) {
                                        return (
                                            <p key={index}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    setPageNumbers([])
                                                    setCurrentPage(number)
                                                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                                                }}
                                                className={number === currentPage ? 'Active' : 'inActive'}
                                            >{number}</p>
                                        )
                                    }
                                })
                            }
                            {
                                pageNumbers.length && currentPage < pageNumbers[pageNumbers.length - 1]
                                    ?
                                    <p
                                        onClick={e => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setPageNumbers([])
                                            setCurrentPage(currentPage + 1)
                                            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                                        }}
                                        className='decoratorPageNums'
                                    >{'>'}</p>
                                    :
                                    null
                            }
                            {
                                pageNumbers.length && currentPage !== pageNumbers[pageNumbers.length - 1]
                                    ?
                                    <p
                                        onClick={e => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setPageNumbers([])
                                            setCurrentPage(pageNumbers[pageNumbers.length - 1])
                                            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                                        }}
                                        className='decoratorPageNums'
                                    >{'>>'}</p>
                                    :
                                    null
                            }

                        </div>
        </div>
    )
}

export default TransactionHistory;
