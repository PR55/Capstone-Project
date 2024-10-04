import { useEffect, useState } from 'react'
import '../ProductBrowser.css'
import AddToCart from './AddToCart'

function DisplayProductsHelper({ products, searchTags, user, navigate }) {
    const [processCart, setProcess] = useState(false)


    useEffect(() => {
    }, [processCart])

    return (
        <>
            {
                products.length ?
                    products.map(product => {
                        return (
                            <div key={product.id} className='productBlock' onClick={() => {
                                navigate(`/products/${product.id}`)
                                window.scrollTo({ top: 0, left: 0, behavior: "instant" })
                            }}>
                                <div className='imageHolder'>
                                    <img src={product.images[0].imageUrl} alt={'gameImg'} />
                                </div>
                                <div className='description '>
                                    <p className='title'>{product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}</p>
                                    <p className='creator'>{product.owner?.username}</p>
                                    <div className='body'>{product.description.map((text, index) => {
                                        return (
                                            <p key={index}>{index <= 1 && text ? text : null}</p>
                                        )
                                    })}</div>
                                    <div className='browseTags'>
                                        {
                                            product.tags.map(tag => (
                                                <p
                                                    key={tag.id}
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
                                            <AddToCart user={user} product={product} setProcess={setProcess} navigate={navigate} processCart={processCart} />
                                            : null
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
