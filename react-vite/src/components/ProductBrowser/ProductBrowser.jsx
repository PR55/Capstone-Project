import { useEffect, useState } from 'react'
import './ProductBrowser.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkProductsLoad } from '../../redux/product'
import { useNavigate } from 'react-router-dom'
import { electronic_tags, traditional_tags } from '../tags'
import { addToCart, isInCart } from '../cart'
import { IoIosSearch } from "react-icons/io";

function ProductBrowser() {

    const user = useSelector(store => store.session.user)

    const dispatch = useDispatch()
    const products = useSelector(store => store.products)
    const [productsArr, setProducts] = useState([])

    const [searchName, setSearch] = useState('')

    const [tagArr, setTagArr] = useState(!(window.location.pathname === '/electronic/products') ? electronic_tags.map(() => false) : traditional_tags.map(() => false))

    const [searchTags, setTagSearch] = useState([])

    const [tagChangeBool, setTagChangeBool] = useState(false)

    const [processCart, setProcess] = useState(false)

    useEffect(() => {
        console.log('adding to cart!')
    })

    useEffect(() => {
        dispatch(thunkProductsLoad())
    }, [window.location.pathname])

    useEffect(() => {
        if (products) {
            let disArr = []

            console.log()

            for (let product of Object.values(products)) {
                let allTags = product.tags.map(tag => tag.tag)
                if (searchTags.length) {
                    for (let tag of searchTags) {
                        if ((!product.isTraditional && window.location.pathname === '/electronic/products') ||
                            (product.isTraditional && window.location.pathname === '/traditional/products')
                        ) {
                            if ((searchName && product.name.toLowerCase().includes(searchName.toLowerCase())
                                || !searchName) && allTags.includes(tag) && !disArr.includes(product)) {
                                disArr.push(product)
                            }
                        }
                    }
                } else if (!searchTags.length) {
                    if ((!product.isTraditional && window.location.pathname === '/electronic/products') ||
                        (product.isTraditional && window.location.pathname === '/traditional/products')
                    ) {
                        if ((searchName && product.name.toLowerCase().includes(searchName.toLowerCase())
                            || !searchName)) {
                            disArr.push(product)
                        }
                    }
                }
            }

            setProducts(disArr)
        }
    }, [products, searchName, searchTags.length])

    useEffect(() => {
        setTagArr(!(window.location.pathname === '/electronic/products') ? traditional_tags.map(tag => searchTags.includes(tag)) : electronic_tags.map(tag => searchTags.includes(tag)))
    }, [tagChangeBool])

    useEffect(() => {
        setTagSearch([])
        setTagArr(!(window.location.pathname === '/electronic/products') ? traditional_tags.map(tag => searchTags.includes(tag)) : electronic_tags.map(tag => searchTags.includes(tag)))
    }, [window.location.pathname])

    const manageTags = (e) => {
        // console.log(`I have been clicked! my value is ${e.target.value}`)
        let arr = searchTags
        if (e.target.checked) {
            arr.push(e.target.value)
        } else {
            let ind = arr.indexOf(e.target.value)
            if (ind == 0) {
                arr = arr.slice(1)
            } else if (ind == arr.length - 1) {
                arr.pop()
            } else if (ind > 0) {
                arr = arr.slice(0, ind).concat(arr.slice(ind + 1))
            }
        }
        setTagSearch(arr)
        setTagChangeBool(!tagChangeBool)
    }

    const navigate = useNavigate()

    return (
        <div className='displayHolder'>
            <div className='productsDisplay'>
                <div className='searchBarVisual'>
                    <IoIosSearch />
                    <input className='searchBar' type="search" value={searchName} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className='tagFilter'>
                    <div>
                        <p>Please select tags to filter by*</p>
                        <div className='tagFilterSelect'>
                            {
                                window.location.pathname === '/electronic/products'
                                    ?
                                    electronic_tags.map((tag, index) => (
                                        <div key={index} className='tagVisualFilter'>
                                            <input type='checkbox' checked={tagArr[index]} value={tag} onChange={e => manageTags(e)} />
                                            <p>{tag}</p>
                                        </div>
                                    ))
                                    :
                                    traditional_tags.map((tag, index) => (
                                        <div key={index} className='tagVisualFilter'>
                                            <input type='checkbox' checked={tagArr[index]} value={tag} onChange={e => manageTags(e)} />
                                            <p>{tag}</p>
                                        </div>
                                    ))
                            }
                        </div>
                        <p>*Tag filter is inclusive, displays all posts that are related to at least one of the selected tags</p>
                    </div>
                </div>
                <div className='displayAndFilter'>
                    <div>
                        {
                            productsArr.length
                                ?
                                <div className='blockHolder'>

                                    {
                                        productsArr.map(product => {
                                            return (
                                                <div key={product.id} className='productBlock'>
                                                    <div className='imageHolder'>
                                                        <img src={product.images[0].imageUrl} alt={'gameImg'} />
                                                    </div>
                                                    <div className='description'>
                                                        <p className='title' onClick={() => navigate(`/products/${product.id}`)}>{product.name}</p>
                                                        <p className='creator'>{product.owner?.username}</p>
                                                        <p className='body'>{product.description.length > 250 ? product.description.slice(0, 250) + "..." : product.description}</p>
                                                        <div className='browseTags'>
                                                            {
                                                                product.tags.map(tag => (
                                                                    <p
                                                                        className={searchTags.includes(tag.tag) ? 'tagHighlight' : 'tag'}
                                                                    >{tag.tag}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='purchase'>
                                                        <p className='displayPrice'>${product.price.toFixed(2)}</p>
                                                        {/* <button>Buy Now</button> */}
                                                        {
                                                            (user && product.owner.id == user.id) ?
                                                                <button
                                                                    onClick={() => navigate(`/products/${product.id}/edit`)}
                                                                    className="addToCart">Update Product</button>
                                                                :
                                                                <button
                                                                    className='addToCart'
                                                                    disabled={isInCart(product.id)} onClick={() => {
                                                                        addToCart(product.id)
                                                                        setProcess(!processCart)
                                                                    }}>Add to Cart</button>
                                                        }
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

            </div>
        </div>
    )
}

export default ProductBrowser
