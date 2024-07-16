import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCurrentUserArticles } from "../../redux/article";
import { thunkCurrentUserProducts } from "../../redux/product";
import './ManagementPage.css'
import { useNavigate } from "react-router-dom";
import ProductDisplayManager from "./helperItems/ProductDisplayManager";
import ArticleDisplayManager from "./helperItems/ArticleDisplayManager";

function ManagementPage() {

    const user = useSelector(store => store.session.user)

    const products = useSelector(Store => Store.products)
    const articles = useSelector(Store => Store.articles)

    const [electronic, setElectronic] = useState(true)
    const [article, setArticle] = useState(false)

    const dispatch = useDispatch()

    const thunkCall = async () => {
        if (electronic || !article) {
            await dispatch(thunkCurrentUserProducts())
        } else {
            await dispatch(thunkCurrentUserArticles())
        }
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
                        !article
                            ?
                            <ProductDisplayManager products={products} electronic={electronic}/>
                            :
                            <ArticleDisplayManager articles={articles}/>
                    }

            </div>

        </div>
    )
}

export default ManagementPage;
