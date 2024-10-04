import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneUser } from "../../redux/user";
import { LiaSpinnerSolid } from "react-icons/lia";
import { FaBookOpen } from "react-icons/fa6";
import { CiBoxes } from "react-icons/ci";
import ProductDisplay from "./helperViews/ProductDisplay";
import ReviewDisplay from "./helperViews/ReviewDisplay";
import ArticleDisplay from "./helperViews/ArticleDisplay";
import './UserProfile.css'
import CommentDisplay from "./helperViews/CommentDisplay";
import StarView from "./helperViews/StarView";
import StarView2 from "./helperViews/StarView2";

function UserProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userId } = useParams()

    const loggedUser = useSelector(store => store.session.user)

    const user = useSelector(store => store.users[userId])

    const [rating, setRating] = useState(0)
    const [productRating, setPRating] = useState(0)
    const [articleRating, setARating] = useState(0)

    const [active, setActive] = useState([true, false, false, false])

    const [processCart, setProcess] = useState(false)

    const [isloading, setLoading] = useState(false)
    const [isFirstLoad, setFirstLoading] = useState(false)

    const [isTablet, setTablet] = useState(window.innerWidth <= 960 && window.innerWidth > 750)

    async function delayThunkCall() {

        var longUserLoad = null

        if (longUserLoad != null && !isloading) {
            window.clearTimeout(longUserLoad)
            longUserLoad = null
        } else {
            setLoading(true)
            longUserLoad = setTimeout(async () => {
                await dispatch(getOneUser(userId))
                setLoading(false)
                setFirstLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    function asyncCall() {
        setFirstLoading(true)
        delayThunkCall()
    }

    function secondAsyncCall() {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        delayThunkCall()
    }

    useEffect(() => {
        const handleResize = () => setTablet(window.innerWidth <= 960 && window.innerWidth > 750)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => { }, [isTablet])

    useEffect(() => {
        asyncCall()
    }, [userId])

    useEffect(() => {
        if (user && user?.username) {
            let total = 0
            for (let review of user.reviews) {
                //Reviews for a user's products from the backend
                total += review.rating
            }

            total /= user.reviews.length

            if (total) {
                setRating(total)
            } else {
                setPRating(3)
            }

            let total2 = 0

            for (let comment of user.comments) {
                total2 += comment.rating
            }

            total2 /= user.comments.length

            if (total2) {
                setARating(total2)
            } else {
                setARating(3)
            }

            let total3 = total ? total2 ? (total + total2) / 2 : (total + 3) / 2 : total2 ? (3 + total2) / 2 : 3

            setRating(total3)

        }
    }, [user])


    useEffect(() => {
        secondAsyncCall()
    }, [active[0], active[1], active[2], active[3], active[4]])

    return (
        <div className="profileHolder">
            <div className="navHolderLeft">
                <div className="navTop">
                    <p className="profilePlaceholder">{user?.username && !isFirstLoad ? user?.username.toUpperCase()[0] : <LiaSpinnerSolid className='spinner' />}</p>
                    <p className="username">{user?.username && !isFirstLoad ? user.username : null}</p>
                    <div className="ratingView">
                        <StarView rating={rating} isFirstLoad={isFirstLoad} />
                        <StarView2 rating={productRating} isFirstLoad={isFirstLoad} icon={<CiBoxes />} />
                        <StarView2 rating={articleRating} isFirstLoad={isFirstLoad} icon={<FaBookOpen />} />
                    </div>
                </div>
                <div className="navBottom">
                    <p className={active[0] ? 'activeNav' : 'inactiveNav'}
                        onClick={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            let newArr = [1, 2, 3, 4, 5].map(() => false)
                            newArr[0] = true
                            setActive(newArr)
                        }}
                    >Electronic</p>
                    <p className={active[1] ? 'activeNav' : 'inactiveNav'}
                        onClick={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            let newArr = [1, 2, 3, 4, 5].map(() => false)
                            newArr[1] = true
                            setActive(newArr)
                        }}
                    >Traditional</p>
                    <p className={active[2] ? 'activeNav' : 'inactiveNav'}
                        onClick={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            let newArr = [1, 2, 3, 4, 5].map(() => false)
                            newArr[2] = true
                            setActive(newArr)
                        }}
                    >Articles</p>
                    <p className={active[3] ? 'activeNav' : 'inactiveNav'}
                        onClick={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            let newArr = [1, 2, 3, 4, 5].map(() => false)
                            newArr[3] = true
                            setActive(newArr)
                        }}
                    >Reviews</p>
                    <p className={active[4] ? 'activeNav' : 'inactiveNav'}
                        onClick={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            let newArr = [1, 2, 3, 4, 5].map(() => false)
                            newArr[4] = true
                            setActive(newArr)
                        }}
                    >Comments</p>
                </div>
            </div>
            <div className="displayHolderRight">
                {
                    isloading
                        ?
                        <LiaSpinnerSolid className='spinner' />
                        :
                        active[0] || active[1]
                            ?
                            <ProductDisplay
                                traditional={active[0]}
                                productsArr={active[0] ? user?.products.electronic : user?.products.traditional} user={loggedUser}
                                navigate={navigate} processCart={processCart} setProcess={setProcess}
                            />
                            :
                            active[2]
                                ?
                                <ArticleDisplay articles={user.articles} user={loggedUser} />
                                :
                                active[3]
                                    ?
                                    <ReviewDisplay reviews={user?.madeReviews} user={loggedUser} />
                                    :
                                    active[4] ?
                                        <CommentDisplay reviews={user?.madeComments} user={loggedUser} />
                                        :
                                        null
                }
            </div>
        </div>
    )

}

export default UserProfile;
