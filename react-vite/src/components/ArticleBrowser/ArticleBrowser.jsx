import { useEffect, useState } from 'react'
import './ArticleBrowser.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { thunkLoadArticles } from '../../redux/article'
import { IoIosSearch } from "react-icons/io";
import { LiaSpinnerSolid } from "react-icons/lia";

function ArticleBrowser() {
    const dispatch = useDispatch()
    const products = useSelector(store => store.articles)
    const [productsArr, setProducts] = useState([])

    const [searchName, setSearch] = useState('')

    const [loading, setLoading] = useState(true)

    async function loadArticles() {
        setLoading(true)
        await dispatch(thunkLoadArticles())
    }

    useEffect(() => {
        loadArticles()
    }, [])

    useEffect(() => {
        // console.log('adding to cart!')
    }, [loading])

    useEffect(() => {
        if (products) {
            setLoading(true)
            let disArr = []

            console.log()
            for (let product of Object.values(products)) {
                console.log(product)
                if (searchName && product.title.toLowerCase().includes(searchName.toLowerCase())) {
                    disArr.push(product)
                } else if (!searchName) {
                    disArr.push(product)
                }
            }

            setProducts(disArr)
            setLoading(false)
        }
    }, [products, searchName])

    useEffect

    const navigate = useNavigate()

    return (
        <div className='displayHolder'>
            <div className='productsDisplay'>
                <div className='searchBarVisualArticle'>
                    <IoIosSearch />
                    <input className='searchBarArticle' type="search" value={searchName} onChange={e => setSearch(e.target.value)} />
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
                                                    <div key={product.id} className='productBlockArticle' onClick={() => navigate(`/articles/${product.id}`)}>
                                                        <div className='imageHolder'>
                                                            <img src={product.imageUrl} alt={'gameImg'} />
                                                        </div>
                                                        <div className='description'>
                                                            <p className='title'>{product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}</p>
                                                            <p className='creator'>{product.owner?.username}</p>
                                                            <p>{product.timeUpdated}</p>
                                                            <p className='body'>{product.body.length > 250 ? product.body.slice(0, 250) + "..." : product.body}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    : loading
                                    ?
                                    <LiaSpinnerSolid className='spinner'/>
                                    :
                                    <h1>No Products matching that name</h1>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleBrowser
