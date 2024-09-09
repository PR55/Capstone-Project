import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ManagementPage.css'
import { useNavigate } from "react-router-dom";
import ProductDisplayManager from "./helperItems/ProductDisplayManager";
import ArticleDisplayManager from "./helperItems/ArticleDisplayManager";
import { thunkCurrentUserProducts, thunkCurrentUserArticles } from "../../redux/userContent";
import { LiaSpinnerSolid } from "react-icons/lia";
import { thunkMyReviewsLoad } from "../../redux/review";
import ReviewDisplay from "./helperItems/ReviewDisplay";
import { thunkMyCommentsLoad } from "../../redux/comment";
import CommentDisplay from "./helperItems/CommentDisplay";

function ManagementPage() {

    const user = useSelector(store => store.session.user)

    const iterable = useSelector(Store => Store.userContent)

    const reviews = useSelector(Store => Store.reviews)
    const comments = useSelector(Store => Store.comments)

    const [electronic, setElectronic] = useState(true)
    const [article, setArticle] = useState(false)
    const [review, setReview] = useState(false)
    const [comment, setComment] = useState(false)

    const [isLoading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const thunkCall = async () => {
        setLoading(true)
        if (electronic || (!article && !review && !comment)) {
            await dispatch(thunkCurrentUserProducts())
        } else if (article) {
            await dispatch(thunkCurrentUserArticles())
        } else if (review) {
            await dispatch(thunkMyReviewsLoad())
        } else {
            await dispatch(thunkMyCommentsLoad())
        }
        setLoading(false)
    }

    async function delayThunkCall() {

        var longManageLoad = null

        if (longManageLoad != null && !isLoading) {
            window.clearTimeout(longManageLoad)
            longManageLoad = null
        } else if (!longManageLoad) {
            setLoading(true)
            longManageLoad = setTimeout(async () => {
                await thunkCall()
                setLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    useEffect(() => {
        delayThunkCall()
    }, [electronic, article])

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])


    return (
        <div className={isLoading ? "manageHolder spinCursor":"manageHolder"}>
            <div className="manageInfo">
                <p
                    className={!comment && electronic && !article && !review ?
                        isLoading ? 'activeHeader spinCursor':'activeHeader'
                        : isLoading ? 'inactiveHeader spinCursor':'inactiveHeader'}
                    onClick={() => {
                        if (!isLoading) {
                            setElectronic(true)
                            setArticle(false)
                            setReview(false)
                            setComment(false)
                        }
                    }}>Electronic</p>
                <p
                    className={!comment && !electronic && !article && !review ?
                        isLoading ? 'activeHeader spinCursor':'activeHeader'
                        : isLoading ? 'inactiveHeader spinCursor':'inactiveHeader'}
                    onClick={() => {
                        if (!isLoading) {
                            setElectronic(false)
                            setArticle(false)
                            setReview(false)
                            setComment(false)
                        }
                    }}>Traditional</p>
                <p
                    className={!comment && article && !electronic && !review ?
                        isLoading ? 'activeHeader spinCursor':'activeHeader'
                        : isLoading ? 'inactiveHeader spinCursor':'inactiveHeader'}
                    onClick={() => {
                        if (!isLoading) {
                            setElectronic(false)
                            setArticle(true)
                            setReview(false)
                            setComment(false)
                        }
                    }}>Articles</p>
                <p
                    className={!comment && review && !electronic && !article ?
                        isLoading ? 'activeHeader spinCursor':'activeHeader'
                        : isLoading ? 'inactiveHeader spinCursor':'inactiveHeader'}
                    onClick={() => {
                        if (!isLoading) {
                            setElectronic(false)
                            setArticle(false)
                            setReview(true)
                            setComment(false)
                        }
                    }}>Reviews</p>
                <p
                    className={comment && !review && !electronic && !article ?
                        isLoading ? 'activeHeader spinCursor':'activeHeader'
                        : isLoading ? 'inactiveHeader spinCursor':'inactiveHeader'}
                    onClick={() => {
                        if (!isLoading) {
                            setElectronic(false)
                            setArticle(false)
                            setReview(false)
                            setComment(true)
                        }
                    }}>Comments</p>
            </div>
            <div className="manageDisplay">
                {
                    isLoading ?
                        <LiaSpinnerSolid className="spinner" />
                        :
                        !article
                            ?
                            !review ?
                                !comment ?
                                    <ProductDisplayManager products={iterable} electronic={electronic} />
                                    :
                                    <CommentDisplay reviews={comments} />
                                :
                                <ReviewDisplay reviews={reviews} />
                            :
                            <ArticleDisplayManager articles={iterable} />
                }

            </div>

        </div>
    )
}

export default ManagementPage;
