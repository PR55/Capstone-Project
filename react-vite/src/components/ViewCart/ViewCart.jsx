import { useDispatch, useSelector } from "react-redux"
import { allInCart, calculateFunds, clearCart, removeFromCart } from "../cart"
import { useEffect, useState } from "react"
import { thunkProductsLoad } from "../../redux/product"

import './ViewCart.css'
import { useNavigate } from "react-router-dom"

function ViewCart() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const products = useSelector(store => store.products)

    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [reloadCart, setReload] = useState(false)

    const [runDisplay, setRun] = useState(false)

    const [canDisplay, setDisplay] = useState([])

    useEffect(() => {
        dispatch(thunkProductsLoad())
    }, [])


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
                        <h1>Nothing to show. Go find some product(s) to purchase!</h1>
                        <div className="navButtonsCart">
                            <button onClick={() => navigate('/traditional/products')}>Traditional Products</button>
                            <button onClick={() => navigate('/electronic/products')}>Electronic Products</button>
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
                                            <div className="cartBlock" key={product.id}>
                                                <div className='imageHolderCart'>
                                                    <img src={product.images[0].imageUrl} alt={'gameImg'} />
                                                </div>
                                                <div className='descriptionCart'>
                                                    <p className='title' onClick={() => navigate(`/products/${product.id}`)}>{product.name}</p>
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
                                    }
                                    return null
                                })
                            }
                        </div>
                        <div className="cartInfo">
                            <div className="manageCartButtons">
                                <button onClick={()=>{
                                    clearCart();
                                    setReload(!reloadCart)
                                }} className="confirmCart">Complete Purchase</button>
                                <button onClick={()=>{
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
