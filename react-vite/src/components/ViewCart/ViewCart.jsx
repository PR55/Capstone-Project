import { useDispatch, useSelector } from "react-redux"
import { allInCart, calculateFunds, clearCart, removeFromCart } from "../cart"
import { useEffect, useState } from "react"
import { thunkProductsLoad } from "../../redux/product"

import './ViewCart.css'
import { useNavigate } from "react-router-dom"
import { thunkTransactionCreate } from "../../redux/transaction"

function ViewCart() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const products = useSelector(store => store.products)

    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [reloadCart, setReload] = useState(false)

    const [runDisplay, setRun] = useState(false)

    const [canDisplay, setDisplay] = useState([])

    const [completeTransac , setComplete] = useState(false)

    useEffect(() => {
        dispatch(thunkProductsLoad())
    }, [])

    const submitCart = async (e) => {
        e.preventDefault()


        let idArr = await allInCart()

        let sendArr = []

        for(let id of idArr){
            sendArr.push({'id':id})
        }

        const payload = {
            'products':[...idArr]
        }


        let d = await dispatch(thunkTransactionCreate(payload))


        if(d?.errors){
            return;
        }else{
            clearCart();
            setComplete(true);
            setReload(!reloadCart);
            navigate('/my-transactions')
            window.scrollTo({top:0, left:0, behavior:"instant"})
        }
    }

    useEffect(() => {
        if (Object.values(products).length) {
            setCart(allInCart());
            setTotal(calculateFunds(products));
            setRun(!runDisplay)
        }
    }, [products, reloadCart])

    useEffect(() => {
        if (Object.values(products).length) {
            let arr = []

            for (let product of Object.values(products)) {
                if (cart.length && cart.includes(product.id)) {
                    arr.push(product)
                }
            }
            setDisplay(arr)
        }

    }, [runDisplay])

    return (
        <div className="holderCart">
            {
                !canDisplay.length
                    ?
                    <div className="emptyCart">
                        {
                            completeTransac?
                        <h1>Thanks for your purchase! Go find some more product(s) to purchase!</h1>
                        :
                        <h1>Nothing to show. Go find some product(s) to purchase!</h1>
                        }
                        <div className="navButtonsCart">
                            <button onClick={() => {
                                navigate('/traditional/products')
                                window.scrollTo({top:0, left:0, behavior:"instant"})
                                }}>Traditional Products</button>
                            <button onClick={() => {
                                navigate('/electronic/products')
                                window.scrollTo({top:0, left:0, behavior:"instant"})
                                }}>Electronic Products</button>
                        </div>
                    </div>
                    :
                    <div className="cartHolder">
                        <h1>Your Cart:</h1>
                        <div className="cartDisplay">
                            {
                                canDisplay.map(product => {
                                    if (cart.length && cart.includes(product.id)) {
                                        return (
                                            <div className="cartBlock" key={product.id}  onClick={(e) => {
                                                e.stopPropagation()
                                                navigate(`/products/${product.id}`)
                                                window.scrollTo({top:0, left:0, behavior:"instant"})
                                            }}>
                                                <div className='imageHolderCart'>
                                                    <img src={product.images[0].imageUrl} alt={'gameImg'} />
                                                </div>
                                                <div className='descriptionCart'>
                                                    <p className='title'>{product.name}</p>
                                                    <p className='creator'>Seller: {product.owner?.username}</p>
                                                    <p>${product.price}</p>
                                                </div>
                                                <div className="interactCart">
                                                    <button onClick={(e) => {
                                                        e.stopPropagation()
                                                        e.preventDefault()
                                                        removeFromCart(product.id);
                                                        setReload(!reloadCart)
                                                    }}>Remove</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                })
                            }
                        </div>
                        <div className="cartInfo">
                            <div className="manageCartButtons">
                                <button onClick={submitCart} className="confirmCart">Complete Purchase</button>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    clearCart();
                                    setReload(!reloadCart)
                                }} className="danger">Dicard Cart</button>
                            </div>
                            <p>Total: ${total}</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ViewCart
