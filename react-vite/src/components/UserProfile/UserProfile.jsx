import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneUser } from "../../redux/user";
import { FaRegStar, FaStar } from "react-icons/fa";
import './UserProfile.css'

function UserProfile() {

    const dispatch = useDispatch()

    const { userId } = useParams()

    const user = useSelector(store => store.users[userId])

    const [rating, setRating] = useState(0)

    const [active, setActive] = useState([true, false, false, false])

    useEffect(() => {
        dispatch(getOneUser(userId))
    }, [userId])

    useEffect(() => {
        if (user && user?.username) {
            let total = 0
            for (let review of user.reviews) {
                total += review.rating
            }

            total /= user.reviews.length

            if (total) {
                setRating(total)
            } else {
                setRating(5)
            }
        }
    }, [user])

    return (
        <div className="profileHolder">
            <div className="navHolderLeft">
                <div className="navTop">
                    <p className="profilePlaceholder">{user?.username && user?.username.toUpperCase()[0]}</p>
                    <p className="username">{user?.username && user.username}</p>
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
                    <p className="numericRating">{rating}</p>
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
                <h1>Display</h1>
            </div>
        </div>
    )

}

export default UserProfile;
