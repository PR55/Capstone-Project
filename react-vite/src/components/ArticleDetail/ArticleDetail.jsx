import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { makeComment, thunkLoadOneArticle } from "../../redux/article";
import { LiaSpinnerSolid } from "react-icons/lia";
import { FaRegStar, FaStar } from "react-icons/fa";
import './ArticleDetail.css'

function setCIds(comments, setArr) {
    let arr = []

    for (let comment of comments) {
        arr.push(comment.owner.id)
    }

    setArr(arr)
}

function ArticleDetail() {

    const { articleId } = useParams();

    const article = useSelector(store => store.articles[articleId])

    const user = useSelector(store => store.session.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [comment, setComment] = useState('')

    const [isLoading, setLoading] = useState(false)

    const [commentIds, setIds] = useState([])

    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const [errors, setErrors] = useState({})

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

    useEffect(() => {
        if (article?.comments) {
            setCIds(article.comments, setIds)
        }
    }, [article])

    async function postComment(e) {
        e.preventDefault();
        e.stopPropagation();
        let form = new FormData()

        form.append('comment', comment)
        form.append('rating', rating)

        let b = await dispatch(makeComment(article.id, form))



        // setComment('')

    }

    useEffect(()=>{
        let errObj = {}
        if(!rating){
            errObj.rating = "Please select a rating!"
        }

        let verify = comment.split('').filter(c => {
            if(c != ' '){
                return c
            }
        })

        if(!verify.length){
            errObj.comment = "Please enter a valid comment!"
        } else if(comment.length < 30){
            errObj.comment = "Comment must be at least 30 characters long!"
        } else if(comment.length > 500){
            errObj.comment = "Comment must be at most 500 characters long!"
        }

        setErrors(errObj)
    },[rating, comment])

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
                                        <h3 className="hoverName" onClick={e => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            navigate(`/user/${article.owner.id}`)
                                        }}
                                        >{article.owner.username}</h3>
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
                                        let code = text.slice(0, 2)
                                        return (
                                            <p className={code == '/c' ? 'selfCenter' : ''}>{code === '/c' ? text.slice(2) : text}</p>
                                        )
                                    })}
                                </div>
                                {
                                    article.owner.id !== user?.id
                                        ?
                                        <div className="articleComments">
                                            {
                                                user && !commentIds.includes(user?.id)
                                                    ?
                                                    <div className="postComment">
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
                                                        <p className="errors">{errors?.rating}</p>
                                                        <div className="postArea">
                                                            <div className="userImage">
                                                                <p>{user.username[0].toUpperCase()}</p>
                                                            </div>
                                                            <textarea name="" id="" value={comment} onChange={e => setComment(e.target.value)} />
                                                        </div>
                                                        <p className="errors">{errors?.comment}</p>
                                                        <button onClick={postComment} disabled={Object.keys(errors).length}>Post</button>
                                                    </div>
                                                    : null
                                            }
                                            <div className="commentsView">
                                                <h3>Comments ({article?.comments.length})</h3>
                                                {
                                                    article?.comments.length
                                                        ?
                                                        article?.comments.map((comment, index) => {

                                                            return (
                                                                <div key={index} className="commentTile">
                                                                    <div className="userImage" onClick={e => {
                                                                        e.preventDefault()
                                                                        e.stopPropagation()
                                                                        navigate(`/user/${comment.owner.id}`)
                                                                    }}>
                                                                        <p>{comment.owner.username[0].toUpperCase()}</p>
                                                                    </div>
                                                                    <div className="commentDetails">
                                                                        <p className="comment">{comment.comment}</p>
                                                                        <div className="ratingDisplayComment">
                                                                            {
                                                                                [1, 2, 3, 4, 5].map((a, index) => {
                                                                                    let check = comment.rating >= 1 * a;
                                                                                    return (
                                                                                        <div className="oneStar">
                                                                                            {
                                                                                                check
                                                                                                    ?
                                                                                                    <FaStar className={'commentStar'}/>
                                                                                                    :
                                                                                                    null
                                                                                            }
                                                                                            <FaRegStar className={'commentStarAbs'} />
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        <p>No comments have been made!</p>
                                                }
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </>
                        : <h1>404 Article does not exist</h1>
            }
        </div>
    )

}

export default ArticleDetail;
