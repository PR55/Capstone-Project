import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkLoadOneArticle } from "../../redux/article";
import './ArticleDetail.css'

function ArticleDetail() {

    const { articleId } = useParams();

    const article = useSelector(store => store.articles[articleId])

    const dispatch = useDispatch()

    useEffect(() => {
        if (articleId)
            dispatch(thunkLoadOneArticle(articleId))
    }, [articleId])

    return (
        <div className="articleDisplay">
            {
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
