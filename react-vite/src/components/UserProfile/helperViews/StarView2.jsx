import { FaRegStar, FaStar } from "react-icons/fa";

function StarView2({ rating, isFirstLoad, icon }) {
    return (
        <div className="ratingHolder2">
            <div className="accountRating">
                {
                    icon ? icon : null
                }
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
            <p className="numericRating">{!isFirstLoad ? rating.toFixed(1) : null}</p>
        </div>
    )
}

export default StarView2;
