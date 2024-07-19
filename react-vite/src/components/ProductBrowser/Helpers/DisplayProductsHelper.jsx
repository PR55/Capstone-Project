import { useEffect, useState } from 'react'
import '../ProductBrowser.css'
import AddToCart from './AddToCart'

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
                                            key = {tag.id}
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
                                user ?
                                <AddToCart user={user} product={product} setProcess={setProcess} navigate={navigate} processCart={processCart}/>
                                :null
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
