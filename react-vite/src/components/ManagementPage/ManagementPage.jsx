import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCurrentUserArticles } from "../../redux/article";
import { thunkCurrentUserProducts } from "../../redux/product";
import './ManagementPage.css'
import { useNavigate } from "react-router-dom";

function ManagementPage() {

    const products = useSelector(Store => Store.products)
    const articles = useSelector(Store => Store.articles)

    const [electronic, setElectronic] = useState(true)
    const [article, setArticle] = useState(false)

    const dispatch = useDispatch()

    const thunkCall = async () => {
        if (electronic || !article) {
            await dispatch(thunkCurrentUserProducts())
        } else {
            await dispatch(thunkCurrentUserArticles())
        }
    }

    useEffect(() => {
        thunkCall()
    }, [electronic, article])

    const navigate = useNavigate()

    return (
        <div className="manageHolder">
            <div className="manageInfo">
                <p
                    className={electronic && !article ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(true)
                        setArticle(false)
                    }}>Electronic</p>
                <p
                    className={!electronic && !article ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(false)
                        setArticle(false)
                    }}>Traditional</p>
                <p
                    className={article && !electronic ? 'activeHeader' : 'inactiveHeader'}
                    onClick={() => {
                        setElectronic(false)
                        setArticle(true)
                    }}>Articles</p>
            </div>
            <div className="manageDisplay">
                    {
                        !article
                            ?
                            Object.values(products).map(product => {
                                if (electronic && product.isTraditional == false) {
                                    return (
                                        <div key={product.id} className='productBlockManage'>
                                            <div className='imageHolder'>
                                                <img src={product.images[0].imageUrl} alt={'gameImg'} />
                                            </div>
                                            <div className='manageDescription'>
                                                <p className='title' onClick={() => navigate(`/products/${product.id}`)}>{product.name}</p>
                                                <p className="priceManage">${product.price.toFixed(2)}</p>
                                                <p className='body'>{product.description.length > 250 ? product.description.slice(0, 250) + "..." : product.description}</p>
                                                <div className="manageTags">
                                                    {product.tags.map(tag => (
                                                        <p>{tag.tag}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='Purchase'>
                                                <p className="toUpdateButton" onClick={() => navigate(`/products/${product.id}/edit`)}>Update</p>
                                                <button>Delete</button>
                                            </div>
                                        </div>
                                    )
                                } else if (!electronic && product.isTraditional == true) {
                                    return (
                                        <div key={product.id} className='productBlockManage'>
                                            <div className='imageHolder'>
                                                <img src={product.images[0].imageUrl} alt={'gameImg'} />
                                            </div>
                                            <div className='manageDescription'>
                                                <p className='title' onClick={() => navigate(`/products/${product.id}`)}>{product.name}</p>
                                                <p className="priceManage">${product.price.toFixed(2)}</p>
                                                <p className='body'>{product.description.length > 250 ? product.description.slice(0, 250) + "..." : product.description}</p>
                                                <div className="manageTags">
                                                    {product.tags.map(tag => (
                                                        <p>{tag.tag}</p>
                                                    ))}
                                                </div>

                                            </div>
                                            <div className='Purchase'>
                                                <p className="toUpdateButton" onClick={() => navigate(`/products/${product.id}/edit`)}>Update</p>
                                                <button>Delete</button> {/*Make into a modal*/}
                                            </div>
                                        </div>
                                    )
                                }
                            })
                            :
                            Object.values(articles).map(article => {
                                return (
                                    <div key={article.id} className='productBlockManage'>
                                        <div className='imageHolder'>
                                            <img src={article.imageUrl} alt={'gameImg'} />
                                        </div>
                                        <div className='manageDescription'>
                                            <p className='title' onClick={() => navigate(`/articles/${article.id}`)}>{article.title}</p>
                                            <p className='creator'>{article.owner?.username}</p>
                                            <p className='body'>{article.body.length > 250 ? article.body.slice(0, 250) + "..." : article.body}</p>
                                            <div className="manageTags">
                                                    {article.tags.map(tag => (
                                                        <p>{tag.tag}</p>
                                                    ))}
                                                </div>
                                        </div>
                                        <div className='Purchase'>
                                            <p className="toUpdateButton" onClick={() => navigate(`/articles/${article.id}/edit`)}>Update</p>
                                            <button>Delete</button>
                                        </div>
                                    </div>
                                )
                            })
                    }

            </div>

        </div>
    )
}

export default ManagementPage;
