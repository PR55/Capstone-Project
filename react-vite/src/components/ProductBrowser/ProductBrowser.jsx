import { useEffect, useState } from 'react'
import './ProductBrowser.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkProductsLoad } from '../../redux/product'

function ProductBrowser(){
    const dispatch = useDispatch()
    const products = useSelector(store => store.products)
    const [productsArr, setProducts] = useState([])

    useEffect(()=>{
        dispatch(thunkProductsLoad())
    }, [])

    useEffect(()=>{
        if(products){
            setProducts(Object.values(products))
        }
    }, [products])

    return(
        <div>
            <div className='Products Display'>
                {
                    productsArr.length
                    ?
                    <div>
                    <h1>Products Available to display!</h1>
                    {
                        productsArr.map(product => {
                            return(
                                <div key = {product.id}>
                                    <div>
                                    <p>{product.name}</p>
                                    <p>{product.description}</p>
                                    </div>
                                    <div>
                                    <p>${product.price}</p>
                                    <button>Buy Now</button>
                                    <button>Add to Cart</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>

                    :
                    <h1>No Products to display</h1>
                }
            </div>
        </div>
    )
}

export default ProductBrowser
