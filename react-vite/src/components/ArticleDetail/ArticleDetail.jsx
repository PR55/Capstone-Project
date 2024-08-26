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

        if (longManageLoad != null && !isLoading) {
            window.clearTimeout(longManageLoad)
            longManageLoad = null
        } else if (!longManageLoad) {
            setLoading(true)
            longManageLoad = setTimeout(async () => {
                await dispatch(thunkLoadOneArticle(articleId))
                setLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    function localDate(date) {
        let str = ``
        let transDate = new Date(date)
        str += `${transDate.getMonth() + 1}/${transDate.getDate()}/${transDate.getFullYear()} - `

        let endTiem = 'AM'

        if (transDate.getHours() > 12) {
            str += `${transDate.getHours() - 12}`
            endTiem = 'PM'
        }
        else
            str += `${transDate.getHours()}`

        if (transDate.getMinutes() < 10) {
            str += `:0${transDate.getMinutes()} `
        } else {
            str += `:${transDate.getMinutes()} `
        }

        return str + endTiem
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
                        <LiaSpinnerSolid className="spinner" />
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
                                        {
                                            article.timeCreated !== article.timeUpdated
                                                ?
                                                <div className="date">
                                                    <h4>Last Updated:</h4>
                                                    <p>{localDate(article.timeUpdated)}</p>
                                                </div>
                                                : null
                                        }
                                        <div className="date">
                                            <h4>Posted:</h4>
                                            <p>{localDate(article.timeCreated)}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="articleBody">
                                    {article.body.map(text => {
                                        let code = text.slice(0,2)
                                        //Apply this to product descriptions also for today's push
                                        return (
                                            <p className={code == '/c' ? 'selfCenter':''}>{code === '/c'? text.slice(2):text}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                        : <h1>404 Article does not exist</h1>
            }
        </div>
    )

}

export default ArticleDetail;
