function ArticleDisplay({articles, user}){

    return(
        <>
            {
                articles && articles.length
                ?
                articles.map(article => (
                    <div className="articleBlockProfile">
                        <div className="articlePBImgHolder">
                            <img src={article.imageUrl}/>
                        </div>
                        <div className="articlePBDescript">
                            <p className="title">{article.title}</p>
                            <p>{article.body.length > 250 ? article.body.slice(0,251) + '...':article.body}</p>
                        </div>
                        <div className="articlePBInteract">
                            {
                                user &&user?.id
                                ?
                                <p className="updateButton">Update</p>
                                : null
                            }
                        </div>
                    </div>
                ))
                :
                null
            }
        </>
    )

}
export default ArticleDisplay;
