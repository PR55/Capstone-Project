import { useEffect, useState } from 'react'
import { addToCart, isInCart } from '../../cart'
import '../ProductBrowser.css'

function DisplayProductsHelper({products, searchTags, user, navigate}){
    const [processCart, setProcess] = useState(false)

    useEffect(() => {
        // console.log('adding to cart!')
    }, [processCart])

    return(
        <>
        {
            products.length?
            products.map(product => {
                return (
                    <div key={product.id} className='productBlock' onClick={() => navigate(`/products/${product.id}`)}>
                        <div className='imageHolder'>
                            <img src={product.images[0].imageUrl} alt={'gameImg'} />
                        </div>
                        <div className='description'>
                            <p className='title'>{product.name.length > 50 ? product.name.slice(0,50) + '...':product.name}</p>
                            <p className='creator'>{product.owner?.username}</p>
                            <p className='body'>{product.description.length > 250 ? product.description.slice(0, 250) + "..." : product.description}</p>
                            <div className='browseTags'>
                                {
                                    product.tags.map(tag => (
                                        <p
                                            className={searchTags.includes(tag.tag) ? 'tagHighlight' : 'tag'}
                                        >{tag.tag}</p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='purchase'>
                            <p className='displayPrice'>${product.price.toFixed(2)}</p>
                            {/* <button>Buy Now</button> */}
                            {
                                (user && product.owner.id == user.id) ?
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(`/products/${product.id}/edit`)
                                        }}
                                        className="addToCart">Update Product</button>
                                    :
                                    <button
                                        className='addToCart'
                                        disabled={isInCart(product.id)} onClick={(e) => {
                                            e.stopPropagation()
                                            addToCart(product.id)
                                            setProcess(!processCart)
                                        }}>Add to Cart</button>
                            }
                        </div>
                    </div>
                )
            })
            :
            <h1>No Products matching that name and/or filter</h1>
        }
        </>
    )
}


export default DisplayProductsHelper;
