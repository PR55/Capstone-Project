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
    const user = useSelector(store => store.session.user)
    const [productsArr, setProducts] = useState([])

    const [searchName, setSearch] = useState('')

    const [loading, setLoading] = useState(true)

    const [pageNumbers, setPageNumbers] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    const numProductsForPage = 4

    const parseNum = 3

    async function loadArticles() {
        setLoading(true)
        await dispatch(thunkLoadArticles())
    }

    useEffect(() => {
        loadArticles()
    }, [])

    useEffect(() => {
    }, [loading])

    async function sortArr(){
        let disArr = []
        for (let product of Object.values(products)) {
            if(product.owner.id !== user?.id){
                if (searchName && product.title.toLowerCase().includes(searchName.toLowerCase())) {
                    await disArr.push(product)
                } else if (!searchName) {
                    await disArr.push(product)
                }
            }
        }

        setPages(disArr, currentPage)
    }
    function setPages(arr, page = 1) {

        if (arr.length < 2) {
            setProducts(arr)
            setPageNumbers([1])
            return
        }

        let val = arr.length / numProductsForPage;

        let arr2 = arr.slice((numProductsForPage * (page - 1)), numProductsForPage * page)
        setProducts(arr2)

        let pageArr = []

        for (let i = 0; i < val; i++) {
            pageArr.push(i + 1)
        }

        setPageNumbers(pageArr)

    }

    async function processUpdate(){
        setLoading(true)
        setPageNumbers([])
        window.scrollTo({top:0, left:0, behavior:'instant'})
        const longLoad = setTimeout(async() => {
            sortArr()
            setLoading(false)
            return 'Complete!'
        }, 1000)
        // await longLoad
    }

    useEffect(() => {
        if (products) {
            processUpdate()
        }
    }, [products, searchName, currentPage])

    useEffect

    const navigate = useNavigate()

    return (
        <div className='displayHolder'>
            <div className='productsDisplay'>
                <div className='searchHolder'>
                <div className='searchBarVisualArticle'>
                    <IoIosSearch />
                    <input className='searchBarArticle' type="search" value={searchName} onChange={e => setSearch(e.target.value)} />
                </div>
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
            <div className='paginationNav'>
            {
                    pageNumbers.length && currentPage !== 1
                    ?
                    <p
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        setCurrentPage(1)
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
                        setCurrentPage(currentPage-1)
                    }}
                    className='decoratorPageNums'
                    >{'<'}</p>
                    :
                    null
                }
                {
                    pageNumbers.map((number, index) => {
                        if (number >= currentPage -(parseNum-1) && number < currentPage + parseNum) {
                            return (
                                <p key={index}
                                    onClick={e => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setCurrentPage(number)
                                    }}
                                    className={number === currentPage ? 'Active':'inActive'}
                                >{number}</p>
                            )
                        }
                    })
                }
                {
                    pageNumbers.length && currentPage < pageNumbers[pageNumbers.length-1]
                    ?
                    <p
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        setCurrentPage(currentPage+1)
                    }}
                    className='decoratorPageNums'
                    >{'>'}</p>
                    :
                    null
                }
                {
                    pageNumbers.length && currentPage !== pageNumbers[pageNumbers.length-1]
                    ?
                    <p
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        setCurrentPage(pageNumbers[pageNumbers.length-1])
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

export default ArticleBrowser
