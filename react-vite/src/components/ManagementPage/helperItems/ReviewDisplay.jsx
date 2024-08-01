import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OpenModalDelete from "../OpenModal/OpenModalDelete";
import ConfirmTrashReview from "../ModalItem/ModalDeleteReview";

function ReviewDisplay({ reviews }) {

    const navigate = useNavigate()

    const [sortedArr, setSorted] = useState([])

    const [deleted, setDeleted] = useState(false)

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

        setSorted(arr)
    }, [deleted])

    return (
        <>
            {
                reviews && Object.values(reviews).length
                    ?
                    sortedArr.map(review => (
                        <div className="reviewBlockManage" onClick={e => {
                            e.stopPropagation()
                            navigate(`/products/${review.product.id}`)
                        }}>
                            <div className="reviewBlockMLeft">
                                <div className="reviewBImageHolder">
                                    <img src={review.product.image.imageUrl} alt="" />
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
                                <p className="title">{review.product.name}</p>
                                <p className="reviewIDescript">{review.review.length > 400 ? review.review.slice(0, 400) + '...' : review.review}</p>
                            </div>
                            <div className='Purchase'>
                                <p className="toUpdateButton" onClick={e => {
                                    e.stopPropagation()
                                    navigate(`/review/${review.id}/edit`)
                                }}>Update</p>
                                <OpenModalDelete
                                    product={review}
                                    modalComponent={<ConfirmTrashReview obj ={review} deleted={deleted} setDeleted={setDeleted}/>}
                                />
                            </div>
                        </div>
                    ))
                    :
                    <h1>No reviews have been made!</h1>
            }
        </>
    )

}

export default ReviewDisplay;
