import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneUser } from "../../redux/user";
import { FaRegStar, FaStar } from "react-icons/fa";
import { LiaSpinnerSolid } from "react-icons/lia";
import ProductDisplay from "./helperViews/ProductDisplay";
import ReviewDisplay from "./helperViews/ReviewDisplay";
import ArticleDisplay from "./helperViews/ArticleDisplay";
import './UserProfile.css'

function UserProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userId } = useParams()

    const loggedUser = useSelector(store => store.session.user)

    const user = useSelector(store => store.users[userId])

    const [rating, setRating] = useState(0)

    const [active, setActive] = useState([true, false, false, false])

    const [processCart, setProcess] = useState(false)

    const [isloading, setLoading] = useState(false)
    const [isFirstLoad, setFirstLoading] = useState(false)

    async function delayThunkCall() {

        var longUserLoad = null

        if(longUserLoad!= null && !isloading){
            window.clearTimeout(longUserLoad)
            longUserLoad = null
        }else{
            setLoading(true)
            longUserLoad = setTimeout(async () => {
                await dispatch(getOneUser(userId))
                setLoading(false)
                setFirstLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    function asyncCall(){
        setFirstLoading(true)
        delayThunkCall()
    }

    function secondAsyncCall(){
        delayThunkCall()
    }

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
                setRating(3)
            }
        }
    }, [user])


    useEffect(()=>{
        secondAsyncCall()
    }, [active[0],active[1],active[2],active[3]])

    return (
        <div className="profileHolder">
            <div className="navHolderLeft">
                <div className="navTop">
                    <p className="profilePlaceholder">{user?.username && !isFirstLoad ? user?.username.toUpperCase()[0]: <LiaSpinnerSolid className='spinner'/>}</p>
                    <p className="username">{user?.username && !isFirstLoad ? user.username : null}</p>
                    <div className="ratingHolder">
                    <div className="accountRating">
                        {
                            [1, 2, 3, 4, 5].map((num, index) => {
                                let check = rating >= num * 1;
                                return (
                                    (
                                        <>
                                            {
                                                check
                                                    ?
                                                    <FaStar className={index % 2 == 0 ? 'evenStarActive' : 'oddStarActive'} />
                                                    :
                                                    <FaRegStar className={index % 2 == 0 ? 'evenStar' : 'oddStar'} />
                                            }
                                        </>
                                    )
                                )
                            })
                        }
                    </div>
                    <p className="numericRating">{!isFirstLoad ?rating.toFixed(1):null}</p>
                    </div>
                </div>
                <div className="navBottom">
                    <p className={active[0] ? 'activeNav':'inactiveNav'}
                    onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        let newArr = [1,2,3,4].map(() => false)
                        newArr[0] = true
                        setActive(newArr)
                    }}
                    >Electronic</p>
                    <p className={active[1] ? 'activeNav':'inactiveNav'}
                    onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        let newArr = [1,2,3,4].map(() => false)
                        newArr[1] = true
                        setActive(newArr)
                    }}
                    >Traditional</p>
                    <p className={active[2] ? 'activeNav':'inactiveNav'}
                    onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        let newArr = [1,2,3,4].map(() => false)
                        newArr[2] = true
                        setActive(newArr)
                    }}
                    >Articles</p>
                    <p className={active[3] ? 'activeNav':'inactiveNav'}
                    onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        let newArr = [1,2,3,4].map(() => false)
                        newArr[3] = true
                        setActive(newArr)
                    }}
                    >Reviews</p>
                </div>
            </div>
            <div className="displayHolderRight">
                {
                    isloading
                    ?
                    <LiaSpinnerSolid className='spinner'/>
                    :
                    active[0] || active[1]
                    ?
                    <ProductDisplay
                    traditional={active[0]}
                    productsArr={active[0] ? user?.products.electronic: user?.products.traditional} user={loggedUser}
                    navigate={navigate} processCart={processCart} setProcess={setProcess}
                    />
                    :
                    active[2]
                    ?
                    <ArticleDisplay articles={user.articles} user={loggedUser}/>
                    :
                    active[3]
                    ?
                    <ReviewDisplay reviews={user?.madeReviews} user={loggedUser}/>
                    :
                    null
                }
            </div>
        </div>
    )

}

export default UserProfile;
