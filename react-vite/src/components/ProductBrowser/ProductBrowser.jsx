import { useEffect, useState } from 'react'
import './ProductBrowser.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkProductsLoad } from '../../redux/product'
import { useNavigate } from 'react-router-dom'

function ProductBrowser() {
    const dispatch = useDispatch()
    const products = useSelector(store => store.products)
    const [productsArr, setProducts] = useState([])

    const [searchName, setSearch] = useState('')

    useEffect(() => {
        dispatch(thunkProductsLoad())
    }, [window.location.pathname])

    useEffect(() => {
        if (products) {
            let disArr = []

            console.log()

            for (let product of Object.values(products)) {
                if ((!product.isTraditonal && window.location.pathname === '/electronic/products') ||
                (product.isTraditonal && window.location.pathname === '/traditional/products')
                ) {
                    console.log(product)
                    if (searchName && product.name.toLowerCase().includes(searchName.toLowerCase())) {
                        disArr.push(product)
                    } else if (!searchName) {
                        disArr.push(product)
                    }
                }
            }

            setProducts(disArr)
        }
    }, [products, searchName])

    useEffect

    const navigate = useNavigate()

    return (
        <div className='displayHolder'>
            <div className='productsDisplay'>
                <div>
                    <input type="search" value={searchName} onChange={e => setSearch(e.target.value)} />
                </div>
                {
                    productsArr.length
                        ?
                        <div className='blockHolder'>

                            {
                                productsArr.map(product => {
                                    return (
                                        <div key={product.id} className='productBlock'>
                                            <div className='imageHolder'>
                                                <img src={product.imageUrl} alt={'gameImg'} />
                                            </div>
                                            <div className='description'>
                                                <p className='title' onClick={() => navigate(`/products/${product.id}`)}>{product.name}</p>
                                                <p className='creator'>{product.owner?.username}</p>
                                                <p className='body'>{product.description.length > 250 ? product.description.slice(0, 250) + "..." : product.description}</p>
                                            </div>
                                            <div className='Purchase'>
                                                <p>${product.price.toFixed(2)}</p>
                                                <button>Buy Now</button>
                                                <button>Add to Cart</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        :
                        <h1>No Products matching that name</h1>

                }
            </div>
        </div>
    )
}

export default ProductBrowser
