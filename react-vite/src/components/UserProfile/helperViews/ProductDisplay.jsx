import {AddToCart} from "../../ProductBrowser";

function ProductDisplay({
    traditional,
    productsArr,
    user,
    navigate,
    setProcess,
    processCart
}) {
    return (
        <>
            {
                productsArr ?
                    productsArr.map(product => (
                        <div className="profileProductBlock" onClick={e => {
                           e.stopPropagation()
                           navigate(`/products/${product.id}`)
                        }}>
                            <div className="profileProductImgHolder">
                                <img src={product.image.imageUrl} alt="" />
                            </div>
                            <div className="blockDescriptionProfile">
                                <p className="title">{product.name}</p>
                                <p>${product.price.toFixed(2)}</p>
                                <p>{product.description.length > 75 ? product.description.slice(0, 76) + '...' : product.description}</p>
                                <div className="profileTagHolder">
                                    {
                                        product.tags.map((tag,index) => (
                                            index < 3 ?
                                            <p>{tag.tag}</p>
                                            :
                                            null
                                        ))
                                    }
                                    {
                                        product.tags.length > 3
                                        ?
                                        <p>+{product.tags.length - 3} more</p>
                                        :null
                                    }
                                </div>
                            </div>
                            <div className="buttonsProfile">
                            <AddToCart
                                user={user} product={product}
                                navigate={navigate} setProcess={setProcess}
                                processCart={processCart}
                                />
                            </div>
                        </div>
                    ))
                    : null
            }
        </>
    )
}

export default ProductDisplay;
