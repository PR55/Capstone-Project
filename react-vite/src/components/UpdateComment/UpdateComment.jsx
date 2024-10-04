import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { FaRegStar, FaStar } from "react-icons/fa";
import { thunkOneComment, thunkUpdateComment } from "../../redux/comment";

function UpdateComment(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { commentId } = useParams();

    const products = useSelector(store => store.comments)

    const [productR, setProductR] = useState(null)

    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const [review, setReview] = useState('')

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(thunkOneComment(commentId))
    }, [commentId])

    useEffect(() => {
        if (Object.values(products).length) {
            setProductR(products[commentId])
        }
    }, [products])

    useEffect(() => {
        if(productR?.comment){
            setReview(productR.comment)
            setRating(productR.rating)
        }
    }, [productR])

    useEffect(() => {
        let errObj = {}

        if (!rating) {
            errObj.rating = 'Please rate the purchase to submit'
        }

        let split = review.split('')

        let map = split.filter((val) => val && val != ' ')

        if (review.length && !map.length) {
            errObj.comment = 'Reviews cannot containg empty characters'
        } else if (review.length < 20) {
            errObj.comment = 'Review Must be at least 20 characters'
        } else if (review.length > 500) {
            errObj.comment = 'Review cannot be longer than 500 characters'
        }

        setErrors(errObj)

    }, [review, rating])

    async function onSubmit(e) {
        e.preventDefault()

        let formData = new FormData()

        formData.append('rating', rating)
        formData.append('comment', review)

        let d = await dispatch(thunkUpdateComment(formData, productR?.id));

        if(d?.errors){
            if(d?.errors){
                setErrors(d.errors)
            }
            return;
        }else{
            navigate('/manage')
            window.scrollTo({top:0, left:0, behavior:"instant"})
        }

    }

    return(
        <div className="reviewForm">
            <h1>Update Comment for &quot;{productR && productR?.article.title}&quot;:</h1>
            <div className="itemPreview">
                <div className="imgHolder">
                    <img src={productR && productR?.article.imageUrl} />
                </div>
            </div>
            <div className="formReview">
                <div className="ratingInput">
                    <div className="oneInput">
                        <FaStar className={hoverRating > 0 ? 'fillTestActive' : rating > 0 && hoverRating == 0 ? 'fillTestActive' : 'fillTest'} />
                        <FaRegStar className="fillTest2" onMouseEnter={(e) => {
                            e.stopPropagation()
                            setHoverRating(1)
                        }} onMouseLeave={(e) => {
                            e.stopPropagation()
                            setHoverRating(0)
                        }}
                            onClick={e => {
                                e.stopPropagation()
                                setRating(1)
                            }} />
                    </div>
                    <div className="oneInput">
                        <FaStar className={hoverRating > 1 ? 'fillTestActive' : rating > 1 && hoverRating == 0 ? 'fillTestActive' : 'fillTest'} />
                        <FaRegStar className="fillTest2" onMouseEnter={(e) => {
                            e.stopPropagation()
                            setHoverRating(2)
                        }} onMouseLeave={(e) => {
                            e.stopPropagation()
                            setHoverRating(0)
                        }}
                            onClick={e => {
                                e.stopPropagation()
                                setRating(2)
                            }} />
                    </div>
                    <div className="oneInput">
                        <FaStar className={hoverRating > 2 ? 'fillTestActive' : rating > 2 && hoverRating == 0 ? 'fillTestActive' : 'fillTest'} />
                        <FaRegStar className="fillTest2" onMouseEnter={(e) => {
                            e.stopPropagation()
                            setHoverRating(3)
                        }} onMouseLeave={(e) => {
                            e.stopPropagation()
                            setHoverRating(0)
                        }}
                            onClick={e => {
                                e.stopPropagation()
                                setRating(3)
                            }} />
                    </div>
                    <div className="oneInput">
                        <FaStar className={hoverRating > 3 ? 'fillTestActive' : rating > 3 && hoverRating == 0 ? 'fillTestActive' : 'fillTest'} />
                        <FaRegStar className="fillTest2" onMouseEnter={(e) => {
                            e.stopPropagation()
                            setHoverRating(4)
                        }} onMouseLeave={(e) => {
                            e.stopPropagation()
                            setHoverRating(0)
                        }}
                            onClick={e => {
                                e.stopPropagation()
                                setRating(4)
                            }} />
                    </div>
                    <div className="oneInput">
                        <FaStar className={hoverRating > 4 ? 'fillTestActive' : rating > 4 && hoverRating == 0 ? 'fillTestActive' : 'fillTest'}
                        />
                        <FaRegStar className="fillTest2" onMouseEnter={(e) => {
                            e.stopPropagation()
                            setHoverRating(5)
                        }} onMouseLeave={(e) => {
                            e.stopPropagation()
                            setHoverRating(0)
                        }}
                            onClick={e => {
                                e.stopPropagation()
                                setRating(5)
                            }} />
                    </div>
                </div>
                {errors?.rating && <p className="error">{errors.rating}</p>}
                <form action="" className="Form" onSubmit={onSubmit}>
                    <div className="inputHolderReview">
                        <label htmlFor="reviewBody">Review:</label>
                        <textarea id='reviewBody' value={review} onChange={e => {
                            setReview(e.target.value)
                        }} />
                    </div>
                    {errors?.comment && <p className="error">{errors.comment}</p>}
                    <button className='submitButton' disabled={errors?.comment || errors?.rating}>Submit Review</button>
                </form>
            </div>
        </div>
    )

}

export default UpdateComment;
