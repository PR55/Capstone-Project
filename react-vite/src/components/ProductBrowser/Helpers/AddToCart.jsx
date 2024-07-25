import { addToCart, isInCart } from '../../cart'

function AddToCart({user, product, navigate, setProcess, processCart}) {

    return (
        <>
        {
            (user && product.owner.id == user.id) ?
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/products/${product.id}/edit`)
                }}
                disabled={product.purchased}
                className="addToCart">Update Product</button>
            :
            <button
                className='addToCart'
                disabled={isInCart(product.id) || product.purchased} onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product.id)
                    setProcess(!processCart)
                }}>Add to Cart</button>
        }
        </>
    )

}

export default AddToCart;
