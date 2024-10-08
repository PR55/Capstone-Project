import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkProductLoadOne } from "../../redux/product";
import ProductImageModal from "./ProductImageModal";
import OpenModalImageItem from "./OpenModalImageItem";
import OpenAddPhoto from "./openModalIonItems/OpenAddPhoto";
import AddImage from "./modalComponent/AddImage";
import { addToCart, isInCart } from "../cart";
import { FaStar, FaRegStar } from "react-icons/fa";
import { LiaSpinnerSolid } from "react-icons/lia";
import './ProductDetail.css'

function ProductDetail() {

    const user = useSelector(store => store.session.user)

    const { productId } = useParams()
    const dispatch = useDispatch()

    const product = useSelector(store => store.products[productId])

    const [curPhoto, setCurPhoto] = useState(0)
    const [updateButton, setUpdate] = useState(false)

    const [ownerRating, setRating] = useState(5)

    const [isLoading, setLoading] = useState(false)

    async function delayThunkCall() {

        var longManageLoad = null

        if(longManageLoad != null && !isLoading){
            window.clearTimeout(longManageLoad)
            longManageLoad = null
        }else if(!longManageLoad){
            setLoading(true)
            longManageLoad = setTimeout(async () => {
                await dispatch(thunkProductLoadOne(productId))
                setLoading(false)
                return 'Grab Complete'
            }, 1000)
        }

    }

    useEffect(() => {
        if (productId)
            delayThunkCall()
    }, [productId])


    useEffect(() => {
        if (product && !product.images[curPhoto]) {
            setCurPhoto(curPhoto - 1)
        }
        if (product?.owner && product.owner?.reviews) {
            let total = 0

            for (let review of product.owner.reviews) {
                total += review.rating
            }
            total /= product.owner.reviews.length

            if (total > 0) {
                setRating(total)
            } else {
                setRating(3)
            }
        }
    }, [product, curPhoto])

    useEffect(() => {
        //Force cart reload update
    }, [updateButton])

    const navigate = useNavigate()

    return (
        <div className="detailHolderSingle">
            {
                isLoading
                ?
                <>
                <h2>Loading product...</h2>
                <LiaSpinnerSolid className="spinner"/>
                </>
                :
                product
                    ?
                    <div className="allInfo">
                        <div className="navBack">
                            <p
                                className='placeholderNav'
                                onClick={() => {
                                    navigate(product.isTraditional ? '/traditional/products' : '/electronic/products')
                                    window.scrollTo({top:0, left:0, behavior:"instant"})
                                }}
                            >{'< Back'}</p>
                        </div>
                        <div className='topInfo'>
                            <div className="previewImageHolder">
                                {
                                    product.images.map((image, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={curPhoto == index ? "selected previewImageNot" : "previewImage"}
                                            >
                                                <img
                                                    src={image.imageUrl}
                                                    onClick={() => {
                                                        if (curPhoto != index) {
                                                            setCurPhoto(index)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )
                                    })
                                }
                                {product.images.length < 3 && (user && product.owner.id == user.id)
                                    ?
                                    <OpenAddPhoto
                                        modalComponent={<AddImage obj={product} />}
                                    />
                                    : null}
                            </div>
                            <div
                                className="topImage"

                            >
                                <OpenModalImageItem
                                    itemText={'Current active photo'}
                                    modalComponent={<ProductImageModal imgsLength={product?.images.length} imageUrl={product?.images[curPhoto]} ownerId={product.owner.id} />}
                                    imageObj={product?.images[curPhoto]}
                                />
                            </div>
                            <div className="previewImageHolderMobile">
                                {
                                    product.images.map((image, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={curPhoto == index ? "selected previewImageNot" : "previewImage"}
                                            >
                                                <img
                                                    src={image.imageUrl}
                                                    onClick={() => {
                                                        if (curPhoto != index) {
                                                            setCurPhoto(index)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )
                                    })
                                }
                                {product.images.length < 3 && (user && product.owner.id == user.id)
                                    ?
                                    <OpenAddPhoto
                                        modalComponent={<AddImage obj={product} />}
                                    />
                                    : null}
                            </div>
                            <div className="topDescrip">
                                <p className="title">{product.name}</p>
                                <div className="ownerDisplay">
                                    <p className="ownerDisplayName" onClick={e => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        navigate(`/user/${product.owner.id}`)
                                        window.scrollTo({top:0, left:0, behavior:"instant"})
                                    }}>{product.owner.username}</p>
                                    <p className="ratingDisplay"><FaStar className="star" /> <FaRegStar className="starAbs" />{ownerRating.toFixed(1)}</p>
                                </div>
                                <div className="topTags">
                                    {
                                        product.tags.map(tag => (
                                            <p key={tag.id}>{tag.tag}</p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="topButtons">
                                <p className="priceDetail">${product.price.toFixed(2)}</p>
                                {/* <button>Buy Now</button> */}
                                {
                                    (user && product.owner.id == user.id) ?
                                        <button
                                            onClick={() => {
                                                navigate('edit')
                                                window.scrollTo({top:0, left:0, behavior:"instant"})
                                            }}
                                            className="cartButtonDetail"
                                            disabled={product.purchased}>Update Product</button>
                                        :
                                        <button
                                            className="cartButtonDetail"
                                            disabled={!user || isInCart(product.id) || product.purchased}
                                            onClick={() => {
                                                addToCart(product.id)
                                                setUpdate(!updateButton)
                                            }}
                                        >Add to cart</button>
                                }
                                {product.purchased ? <p className="Error">SOLD</p> : null}
                            </div>
                            <div className="mobileDescrip">
                            <div className="topDescripMobile">
                                <p className="title">{product.name}</p>
                                <div className="ownerDisplay">
                                    <p className="ownerDisplayName" onClick={e => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        navigate(`/user/${product.owner.id}`)
                                        window.scrollTo({top:0, left:0, behavior:"instant"})
                                    }}>{product.owner.username}</p>
                                    <p className="ratingDisplay"><FaStar className="star" /> <FaRegStar className="starAbs" />{ownerRating.toFixed(1)}</p>
                                </div>
                                <div className="topTags">
                                    {
                                        product.tags.map(tag => (
                                            <p key={tag.id}>{tag.tag}</p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="topButtonsMobile">
                                <p className="priceDetail">${product.price.toFixed(2)}</p>
                                {/* <button>Buy Now</button> */}
                                {
                                    (user && product.owner.id == user.id) ?
                                        <button
                                            onClick={() => {
                                                navigate('edit')
                                                window.scrollTo({top:0, left:0, behavior:"instant"})
                                            }}
                                            className="cartButtonDetail"
                                            disabled={product.purchased}>Update Product</button>
                                        :
                                        <button
                                            className="cartButtonDetail"
                                            disabled={!user || isInCart(product.id) || product.purchased}
                                            onClick={() => {
                                                addToCart(product.id)
                                                setUpdate(!updateButton)
                                            }}
                                        >Add to cart</button>
                                }
                                {product.purchased ? <p className="Error">SOLD</p> : null}
                            </div>
                            </div>
                        </div>
                        <div className='bottomInfo'>
                            <h3>Description:</h3>
                            <div>{product.description.map((text,index) => (
                                <p key={index}>{text}</p>
                            ))}</div>
                        </div>
                    </div>
                    : <h1>Product does not exist!</h1>
            }

        </div>
    )
}

export default ProductDetail;
