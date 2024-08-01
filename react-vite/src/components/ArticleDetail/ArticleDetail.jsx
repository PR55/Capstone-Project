import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkLoadOneArticle } from "../../redux/article";
import { LiaSpinnerSolid } from "react-icons/lia";
import './ArticleDetail.css'

function ArticleDetail() {

    const { articleId } = useParams();

    const article = useSelector(store => store.articles[articleId])

    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState(false)

    async function delayThunkCall() {

        var longManageLoad = null

        if(longManageLoad != null && !isLoading){
            window.clearTimeout(longManageLoad)
            longManageLoad = null
        }else if(!longManageLoad){
            setLoading(true)
            longManageLoad = setTimeout(async () => {
                await dispatch(thunkLoadOneArticle(articleId))
                setLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    useEffect(() => {
        if (articleId)
            delayThunkCall()
    }, [articleId])

    return (
        <div className="articleDisplay">
            {
                isLoading
                ?
                <>
                <h2>Loading article...</h2>
                <LiaSpinnerSolid className="spinner"/>
                </>
                :
                article ?
                    <>
                        <div className="articleImageHolder">
                            <img src={article.imageUrl} alt="articleImage" className="articleImage" />
                        </div>
                        <div className="mainInfo">
                            <div>
                                <h1 className="articleTitle">{article.title}</h1>
                                <div className="articleInfo">
                                    <h3>{article.owner.username}</h3>
                                    <p>{article.timeCreated}</p>
                                    <p>{article.timeCreated !== article.timeUpdated ? <p>{article.timeUpdated}</p> : null}</p>
                                </div>

                            </div>
                            <p className="articleBody">
                                {article.body}
                            </p>
                        </div>
                    </>
                    : <h1>404 Article does not exist</h1>
            }
        </div>
    )

}

export default ArticleDetail;
