import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ManagementPage.css'
import { useNavigate } from "react-router-dom";
import ProductDisplayManager from "./helperItems/ProductDisplayManager";
import ArticleDisplayManager from "./helperItems/ArticleDisplayManager";
import { thunkCurrentUserProducts,thunkCurrentUserArticles } from "../../redux/userContent";
import { LiaSpinnerSolid } from "react-icons/lia";

function ManagementPage() {

    const user = useSelector(store => store.session.user)

    const iterable = useSelector(Store => Store.userContent)

    const [electronic, setElectronic] = useState(true)
    const [article, setArticle] = useState(false)

    const [isLoading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const thunkCall = async () => {
        setLoading(true)
        if (electronic || !article) {
            await dispatch(thunkCurrentUserProducts())
        } else {
            await dispatch(thunkCurrentUserArticles())
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
                    className={electronic && !article ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(true)
                        setArticle(false)
                    }}>Electronic</p>
                <p
                    className={!electronic && !article ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(false)
                        setArticle(false)
                    }}>Traditional</p>
                <p
                    className={article && !electronic ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(false)
                        setArticle(true)
                    }}>Articles</p>
            </div>
            <div className="manageDisplay">
                    {
                        isLoading?
                        <LiaSpinnerSolid className="spinner"/>
                        :
                        !article
                            ?
                            <ProductDisplayManager products={iterable} electronic={electronic}/>
                            :
                            <ArticleDisplayManager articles={iterable}/>
                    }

            </div>

        </div>
    )
}

export default ManagementPage;
