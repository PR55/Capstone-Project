import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { thunkProductLoadOne } from "../../../redux/product";
import { FaRegStar, FaStar } from "react-icons/fa";
import './ReviewForm.css'
import { thunkNewReview } from "../../../redux/review";

export function ReviewForm() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { productId } = useParams();

    const products = useSelector(store => store.products)

    const [product, setProduct] = useState(null)

    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const [review, setReview] = useState('')

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(thunkProductLoadOne(productId))
    }, [productId])

    useEffect(() => {
        if (Object.values(products).length) {
            setProduct(products[productId])
        }
    }, [products])

    useEffect(() => {
        let errObj = {}

        if (!rating) {
            errObj.rating = 'Please rate the purchase to submit'
        }

        let split = review.split('')

        let map = split.filter((val) => val && val != ' ')

        if (review.length && !map.length) {
            errObj.review = 'Reviews cannot containg empty characters'
        } else if (review.length < 30) {
            errObj.review = 'Review Must be at least 30 characters'
        } else if (review.length > 1000) {
            errObj.review = 'Review cannot be longer than 1000 characters'
        }

        setErrors(errObj)

    }, [review, rating])

    async function onSubmit(e) {
        e.preventDefault()

        let formData = new FormData()

        formData.append('rating', rating)
        formData.append('review', review)

        let d = await dispatch(thunkNewReview(formData, product.id));

        if(d?.errors || !d?.id){
            if(d?.errors){
                setErrors(d.errors)
            }
            return;
        }else{
            navigate('/manage')
        }

    }

    return (
        <div className="reviewForm">
            <h1>Leave a review for &quot;{product && product.name}&quot;:</h1>
            <div className="itemPreview">
                <div className="imgHolder">
                    <img src={product && product.images[0].imageUrl} />
                </div>
                <div>
                    <p>${product && product.price}</p>
                    <div>{product && product.description.map(text => (
                                <p>{text}</p>
                            ))}</div>
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
                    {errors?.review && <p className="error">{errors.review}</p>}
                    <button className='submitButton' disabled={errors?.review || errors?.rating}>Submit Review</button>
                </form>
            </div>
        </div>
    )
}
