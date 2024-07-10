import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkProductLoadOne } from "../../redux/product";
import './ProductDetail.css'

function ProductDetail() {

    const { productId } = useParams()
    const dispatch = useDispatch()

    const product = useSelector(store => store.products[productId])

    useEffect(() => {
        if (productId)
            dispatch(thunkProductLoadOne(productId))
    }, [productId])



    return (
        <div className="detailHolder">
            {
                product
                    ?
                    <div>
                        <div className='topInfo'>
                            <div className="topImage">
                                <img src={product.imageUrl} alt="" />
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
