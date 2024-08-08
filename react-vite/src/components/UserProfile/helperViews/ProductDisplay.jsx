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
                                <p className="title">{product.name.length > 50&& window.innerWidth > 960  ? product.name.slice(0,50) + '...': product.name.length > 30 && window.innerWidth <= 960 ? product.name.slice(0,30)+'...':product.name}</p>
                                <p>${product.price.toFixed(2)}</p>
                                <p>{product.description.length > 75 && window.innerWidth > 960 ? product.description.slice(0, 75) + "..." :window.innerWidth <= 960  && window.innerWidth > 750? product.description.slice(0, 100) + '...': window.innerWidth <= 750 ? null:product.description}</p>
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
                    : <h2>No {traditional ? 'Electronic':'Traditional'} products have been made by this user</h2>
            }
        </>
    )
}

export default ProductDisplay;
