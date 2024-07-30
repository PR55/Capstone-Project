import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ManagementPage.css'
import { useNavigate } from "react-router-dom";
import ProductDisplayManager from "./helperItems/ProductDisplayManager";
import ArticleDisplayManager from "./helperItems/ArticleDisplayManager";
import { thunkCurrentUserProducts,thunkCurrentUserArticles } from "../../redux/userContent";
import { LiaSpinnerSolid } from "react-icons/lia";
import { thunkMyReviewsLoad } from "../../redux/review";
import ReviewDisplay from "./helperItems/ReviewDisplay";

function ManagementPage() {

    const user = useSelector(store => store.session.user)

    const iterable = useSelector(Store => Store.userContent)

    const reviews = useSelector(Store => Store.reviews)

    const [electronic, setElectronic] = useState(true)
    const [article, setArticle] = useState(false)
    const [review, setReview] = useState(false)

    const [isLoading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const thunkCall = async () => {
        setLoading(true)
        if (electronic || (!article && !review)) {
            await dispatch(thunkCurrentUserProducts())
        } else if(article){
            await dispatch(thunkCurrentUserArticles())
        } else{
            await dispatch(thunkMyReviewsLoad())
        }
        setLoading(false)
    }

    useEffect(() => {
        thunkCall()
    }, [electronic, article])

    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate('/')
        }
    }, [])


    return (
        <div className="manageHolder">
            <div className="manageInfo">
                <p
                    className={electronic && !article && !review ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(true)
                        setArticle(false)
                        setReview(false)
                    }}>Electronic</p>
                <p
                    className={!electronic && !article && !review ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(false)
                        setArticle(false)
                        setReview(false)
                    }}>Traditional</p>
                <p
                    className={article && !electronic && !review ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(false)
                        setArticle(true)
                        setReview(false)
                    }}>Articles</p>
                <p
                    className={review && !electronic && !article ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(false)
                        setArticle(false)
                        setReview(true)
                    }}>Reviews</p>
            </div>
            <div className="manageDisplay">
                    {
                        isLoading?
                        <LiaSpinnerSolid className="spinner"/>
                        :
                        !article
                            ?
                            !review ?
                            <ProductDisplayManager products={iterable} electronic={electronic}/>
                            :
                            <ReviewDisplay reviews={reviews}/>
                            :
                            <ArticleDisplayManager articles={iterable}/>
                    }

            </div>

        </div>
    )
}

export default ManagementPage;
