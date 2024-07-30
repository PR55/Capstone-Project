import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ReviewDisplay({ reviews, user }) {
    const navigate = useNavigate()
    return (
        <>
            {
                reviews.length ?
                    reviews.map(review => (
                        <div className="reviewBlock" onClick={() => {
                            navigate(`/products/${review.product.id}`)
                        }}>
                            <div className="reviewBlockLeft">
                                <div className="imgHolderReviewProfile">
                                    <img src={review.product.image.imageUrl} />
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
                                                            <FaStar className={index % 2 == 0 ? 'evenStarActive' : 'oddStarActive'}/>
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
                                <p className="title">Review for {review?.product?.name}</p>
                                <div className="reviewBody">
                                    <p>{review.review.length > 100 ? review.review.slice(0,101) + '...  ':review.review}</p>
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
                                            navigate(`/reviews/${review.id}/edit`)
                                        }}
                                        >Update</p>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    ))
                    :
                    <p>None</p>
            }
        </>
    )
}

export default ReviewDisplay;
