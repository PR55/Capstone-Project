import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

function CommentDisplay({ reviews, user }) {
    const navigate = useNavigate()

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
        setPages(reviews, currentPage)
    }, [currentPage])

    return (
        <>
            {
                sorted.length ?
                    <>
                        {
                            sorted.map(review => (
                                <div key={review.id} className="reviewBlock" onClick={() => {
                                    navigate(`/articles/${review.article.id}`)
                                    window.scrollTo({top:0, left:0, behavior:"instant"})
                                }}>
                                    <div className="reviewBlockLeft">
                                        <div className="imgHolderReviewProfile">
                                            <img src={review.article.imageUrl} />
                                        </div>
                                        <div className="reviewProfileRating">
                                            <div>
                                                {[1, 2, 3, 4, 5].map((a, index) => {
                                                    let check = review.rating >= 1 * a;
                                                    return (
                                                        <>
                                                            {
                                                                check
                                                                    ?
                                                                    <FaStar className={index % 2 == 0 ? 'evenStarActive' : 'oddStarActive'} />
                                                                    :
                                                                    <FaRegStar className={index % 2 == 0 ? 'evenStar' : 'oddStar'} />
                                                            }
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <p>{review.rating}</p>
                                        </div>
                                    </div>
                                    <div className="reviewBodyDescript">
                                        <p className="title">{review?.article?.title}</p>
                                        <div className="reviewBody">
                                            <p>{review.comment.length > 100 ? review.comment.slice(0, 101) + '...  ' : review.comment}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            user && user?.id === review.owner.id
                                                ?
                                                <p
                                                    className="updateButton"
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        navigate(`/comments/${review.id}/edit`)
                                                        window.scrollTo({top:0, left:0, behavior:"instant"})
                                                    }}
                                                >Update</p>
                                                :
                                                null
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
                    :
                    <h2>No comments have been made by this user</h2>
            }
        </>
    )
}

export default CommentDisplay;
