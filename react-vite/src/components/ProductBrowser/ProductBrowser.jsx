import { useEffect, useState } from 'react'
import './ProductBrowser.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkProductsLoad } from '../../redux/product'
import { useNavigate } from 'react-router-dom'
import { electronic_tags, traditional_tags } from '../tags'
import { IoIosSearch } from "react-icons/io";
import { LiaSpinnerSolid } from "react-icons/lia";
import DisplayProductsHelper from './Helpers/DisplayProductsHelper'

function ProductBrowser() {

    const user = useSelector(store => store.session.user)

    const dispatch = useDispatch()
    const products = useSelector(store => store.products)
    const [productsArr, setProducts] = useState([])

    const [allProducts, setProductsAll] = useState([])

    const [searchName, setSearch] = useState('')

    const [tagArr, setTagArr] = useState(!(window.location.pathname === '/electronic/products') ? electronic_tags.map(() => false) : traditional_tags.map(() => false))

    const [searchTags, setTagSearch] = useState([])

    const [tagChangeBool, setTagChangeBool] = useState(true)

    const [pageNumbers, setPageNumbers] = useState([])

    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)

    const [drop, setDrop] = useState(false)

    const numProductsForPage = 4

    const parseNum = 3

    useEffect(() => {
        const dropDownListener = document.addEventListener('click', (e) => {
            if(!Object.values(e.target.classList).includes('tagsMobile') &&
               !Object.values(e.target.classList).includes('filterCheck')){
                setDrop(false)
            }
        })

        return () => {
            document.removeEventListener('click',dropDownListener)
        }
    }, [])


    async function LoadProduct() {
        //window url cuasing infinite load
        console.log('Calling')
        setLoading(true)
        await dispatch(thunkProductsLoad())
    }

    function sortArr() {
        let disArr = []
        for (let product of allProducts) {
            let allTags = product.tags.map(tag => tag.tag)
            if (searchTags.length) {
                for (let tag of searchTags) {
                    if ((!product.isTraditional && window.location.pathname === '/electronic/products') ||
                        (product.isTraditional && window.location.pathname === '/traditional/products')
                    ) {
                        if (product?.purchased) {
                            if ((searchName && product.name.toLowerCase().includes(searchName.toLowerCase())
                                || !searchName) && allTags.includes(tag) && !disArr.includes(product) && !product.purchased
                                && user?.id !== product.owner?.id) {
                                disArr.push(product)
                            }
                        } else {
                            if ((searchName && product.name.toLowerCase().includes(searchName.toLowerCase())
                                || !searchName) && allTags.includes(tag) && !disArr.includes(product)
                                && user?.id !== product.owner?.id) {
                                disArr.push(product)
                            }
                        }
                    }
                }
            } else if (!searchTags.length) {
                if ((!product.isTraditional && window.location.pathname === '/electronic/products') ||
                    (product.isTraditional && window.location.pathname === '/traditional/products')
                ) {
                    if (product?.purchased) {
                        if ((searchName && product.name.toLowerCase().includes(searchName.toLowerCase())
                            || !searchName) && !product.purchased && user?.id !== product.owner?.id) {
                            disArr.push(product)
                        }
                    } else {
                        if ((searchName && product.name.toLowerCase().includes(searchName.toLowerCase())
                            || !searchName) && user?.id !== product.owner?.id) {
                            disArr.push(product)
                        }
                    }
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

    function processArr() {
        var longLoad = null

        if (longLoad != null && !loading) {
            window.clearTimeout(longLoad)
            longLoad = null
        } else if(longLoad === null){
            setPageNumbers([])
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
            setLoading(true)
            longLoad = setTimeout(async () => {
                sortArr()
                setLoading(false)
                return 'Sort complete!'
            }, 1500)
        }
    }

    useEffect(() => {
        if (Object.values(products).length) {
            setProductsAll(Object.values(products))
            processArr()
        }
    }, [products, searchName, searchTags.length,currentPage, dispatch])

    useEffect(() => {
        setTagArr(!(window.location.pathname === '/electronic/products') ? traditional_tags.map(tag => searchTags.includes(tag)) : electronic_tags.map(tag => searchTags.includes(tag)))
    }, [tagChangeBool])

    useEffect(() => {
        LoadProduct()
    }, [window.location.pathname])

    const manageTags = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentPage(1)
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
                <div className='searchHolder'>
                    <div className='searchBarVisual'>
                        <IoIosSearch />
                        <input className='searchBar' type="search" value={searchName} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className='buttonHolderFilter'>
                    <button
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        setDrop(!drop)
                    }} className='tagsMobile'>Tag Filters</button>
                    <div className={drop? 'mobileFilters':'hidden'}>
                        {
                            window.location.pathname === '/electronic/products'
                            ?
                            electronic_tags.map((tag, index) => (
                                <div key={index} className='tagVisualFilter'>
                                    <input className='filterCheck'type='checkbox' checked={tagArr[index]} value={tag} onChange={e => manageTags(e)} />
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
                    </div>
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
                    <div className='blockHolder'>
                        {
                            loading
                                ?
                                <LiaSpinnerSolid className='spinner' />
                                :
                                <DisplayProductsHelper products={productsArr} searchTags={searchTags} user={user} navigate={navigate} />

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
                                setCurrentPage(currentPage - 1)
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
                                        setCurrentPage(number)
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
                                setCurrentPage(currentPage + 1)
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
                                setCurrentPage(pageNumbers[pageNumbers.length - 1])
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

export default ProductBrowser
