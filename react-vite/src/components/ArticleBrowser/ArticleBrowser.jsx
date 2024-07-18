import { useEffect, useState } from 'react'
import './ArticleBrowser.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { thunkLoadArticles } from '../../redux/article'
import { IoIosSearch } from "react-icons/io";
import { LiaSpinnerSolid } from "react-icons/lia";
import DisplayArticlesHelper from './Helpers/DisplayArticlesHelper'

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

    async function sortArr(){
        let disArr = []
        for (let product of Object.values(products)) {
            // console.log(product)
            if (searchName && product.title.toLowerCase().includes(searchName.toLowerCase())) {
                await disArr.push(product)
            } else if (!searchName) {
                await disArr.push(product)
            }
        }

        await setProducts(disArr)
    }

    async function processUpdate(){
        setLoading(true)
        const longLoad = setTimeout(async() => {
            sortArr()
            setLoading(false)
            return 'Complete!'
        }, 400)
        // await longLoad
    }

    useEffect(() => {
        if (products) {
            processUpdate()
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
                    <div className='blockHolder'>
                        {
                                loading
                                    ?
                                    <LiaSpinnerSolid className='spinner'/>
                                    :
                                    <DisplayArticlesHelper articles={productsArr} navigate={navigate}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleBrowser
