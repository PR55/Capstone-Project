function DisplayArticlesHelper({ articles, navigate }) {

    return (
        <>
            {
                articles.length ?
                    <>
                        {
                            articles.map(product => {
                                return (
                                    <div key={product.id} className='productBlockArticle' onClick={() => navigate(`/articles/${product.id}`)}>
                                        <div className='imageHolder'>
                                            <img src={product.imageUrl} alt={'gameImg'} />
                                        </div>
                                        <div className='description'>
                                            <p className='title'>{product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}</p>
                                            <p className='creator'>{product.owner?.username}</p>
                                            <p>{product.timeUpdated}</p>
                                            <p className='body'>{product.body.length > 250 ? product.body.slice(0, 250) + "..." : product.body}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                    :
                    <h1>No Articles matching that name</h1>
            }
        </>
    )
}

export default DisplayArticlesHelper
