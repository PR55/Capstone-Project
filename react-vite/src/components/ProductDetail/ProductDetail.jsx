import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkProductLoadOne } from "../../redux/product";
import ProductImageModal from "./ProductImageModal";
import './ProductDetail.css'
import OpenModalImageItem from "./OpenModalImageItem";

function ProductDetail() {

    const { productId } = useParams()
    const dispatch = useDispatch()

    const product = useSelector(store => store.products[productId])

    const [curPhoto, setCurPhoto] = useState(0)

    useEffect(() => {
        if (productId)
            dispatch(thunkProductLoadOne(productId))
    }, [productId])


    const navigate = useNavigate()

    return (
        <div className="detailHolder">
            {
                product
                    ?
                    <div>
                        <div className="navBack">
                            <p
                                className='placeholderNav'
                                onClick={() => navigate(product.isTraditional ? '/traditional/products' : '/electronic/products')}
                            >{'< Back'}</p>
                        </div>
                        <div className='topInfo'>
                            <div className="previewImageHolder">
                                {
                                    product.images.map((image, index) => {
                                        console.log(index)
                                        return (
                                            <div
                                            key={index}
                                                className={curPhoto == index ? "selected previewImageNot":"previewImage"}
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
                            </div>
                            <div
                            className="topImage"

                            >
                                <OpenModalImageItem
                                    itemText={'Current active photo'}
                                    modalComponent={<ProductImageModal imageUrl = {product?.images[curPhoto].imageUrl}/>}
                                    imageObj={product?.images[curPhoto]}
                                 />
                            </div>
                            <div className="topDescrip">
                                <p>{product.name}</p>
                                <p>{product.owner.username}</p>
                                <div className="topTags">
                                    {
                                        product.tags.map(tag => (
                                            <p key={tag.id}>{tag.tag}</p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="topButtons">
                                <p>${product.price.toFixed(2)}</p>
                                <button>Buy Now</button>
                                <button>Add to cart</button>
                            </div>
                        </div>
                        <div className='bottomInfo'>
                            <h3>Description:</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    : <h1>Product does not exist!</h1>
            }

        </div>
    )
}

export default ProductDetail;
