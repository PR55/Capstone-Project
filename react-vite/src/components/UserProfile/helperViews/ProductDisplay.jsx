import { AddToCart } from "../../ProductBrowser";
import { useEffect, useState } from "react"

function ProductDisplay({
    traditional,
    productsArr,
    user,
    navigate,
    setProcess,
    processCart,
}) {
    const [pageNumbers, setPageNumbers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const numProductsForPage = 4

    const [sorted, setSorted] = useState([])

    const parseNum = 3

    function setPages(arr, page = 1) {

        if (!arr?.length) {
            return
        }

        if (arr.length < 2) {
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

    useEffect(() => {
        setPages(productsArr, currentPage)
    }, [currentPage])
    return (
        <>
            {
                sorted.length ?
                    <>{
                        sorted.map(product => (
                            <div className="profileProductBlock" key={product.id} onClick={e => {
                                e.stopPropagation()
                                navigate(`/products/${product.id}`)
                            }}>
                                <div className="profileProductImgHolder">
                                    <img src={product.image.imageUrl} alt="" />
                                </div>
                                <div className="blockDescriptionProfile">
                                    <p className="titleProfile">{product.name.length > 30 ? product.name.slice(0, 31) + '...' : product.name}</p>
                                    <p>${product.price.toFixed(2)}</p>
                                    <p className='body'>{product.description[0].length > 125 ? product.description[0].slice(0,125) + '...': product.descriptionp[0]}</p>
                                    <div className="profileTagHolder">
                                        {
                                            product.tags.map((tag, index) => (
                                                index < 3 ?
                                                    <p key={tag.id}>{tag.tag}</p>
                                                    :
                                                    null
                                            ))
                                        }
                                        {
                                            product.tags.length > 3
                                                ?
                                                <p>+{product.tags.length - 3} more</p>
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="buttonsProfile">
                                    {
                                        user
                                            ?
                                            <AddToCart
                                                user={user} product={product}
                                                navigate={navigate} setProcess={setProcess}
                                                processCart={processCart}
                                            />
                                            : null
                                    }

                                </div>
                            </div>
                        ))}
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
                    </>
                    : <h2>No {traditional ? 'Electronic' : 'Traditional'} products have been made by this user</h2>
            }
        </>
    )
}

export default ProductDisplay;
