import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OpenModalDelete from "../OpenModal/OpenModalDelete";
import ConfirmTrashComment from "../ModalItem/ModalDeleteComment";

function CommentDisplay({ reviews }) {

    const navigate = useNavigate()

    const [deleted, setDeleted] = useState(false)

    const [pageNumbers, setPageNumbers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const numProductsForPage = 4

    const [sorted, setSorted] = useState([])

    const parseNum = 3

    function setPages(arr, page = 1) {

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

        if(page > pageArr[pageArr.length-1]){
            setCurrentPage(pageArr[pageArr.length-1])
        }
    }
    useEffect(() => {
        let arr = Object.values(reviews)

        arr.sort((a, b) => {
            let date1 = new Date(a.timeUpdated)
            let date2 = new Date(b.timeUpdated)

            if (date1 > date2) {
                return -1
            } else if (date1 < date2) {
                return 1
            } else {
                return 0
            }
        })

        setPages(arr, currentPage)

    }, [deleted, currentPage])

    return (
        <>
            {
                reviews && Object.values(reviews).length
                    ?
                    <>
                    {sorted.map(review => (
                        <div className="reviewBlockManage" onClick={e => {
                            e.stopPropagation()
                            navigate(`/articles/${review.article.id}`)
                        }}>
                            <div className="reviewBlockMLeft">
                                <div className="reviewBImageHolder">
                                    <img src={review.article.imageUrl} alt="" />
                                </div>
                                <div className="manageRating">
                                    {
                                        [1,2,3,4,5].map((a, index) => {
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
                                        })
                                    }
                                    <p>
                                        {review.rating}
                                    </p>

                                </div>
                            </div>
                            <div className="reviewBInfo">
                                <p className="title">{review.article.title}</p>
                                <p className="reviewIDescript">{review.comment.length > 400 ? review.comment.slice(0, 400) + '...' : review.comment}</p>
                            </div>
                            <div className='Purchase'>
                                <p className="toUpdateButton" onClick={e => {
                                    e.stopPropagation()
                                    navigate(`/comments/${review.id}/edit`)
                                }}>Update</p>
                                <OpenModalDelete
                                    product={review}
                                    modalComponent={<ConfirmTrashComment obj ={review} deleted={deleted} setDeleted={setDeleted}/>}
                                />
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
                                window.scrollTo({top:0, left:0, behavior:'instant'})
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
                                window.scrollTo({top:0, left:0, behavior:'instant'})
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
                                        window.scrollTo({top:0, left:0, behavior:'instant'})
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
                                window.scrollTo({top:0, left:0, behavior:'instant'})
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
                                window.scrollTo({top:0, left:0, behavior:'instant'})
                            }}
                            className='decoratorPageNums'
                        >{'>>'}</p>
                        :
                        null
                }

            </div>
            </>
                    :
                    <h1>No Comments have been made!</h1>
            }
        </>
    )

}

export default CommentDisplay;
