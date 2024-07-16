import OpenModalDelete from "../OpenModal/OpenModalDelete";
import ConfirmTrashArticle from "../ModalItem/ModalDeleteArticle";
import { useNavigate } from "react-router-dom";
function ArticleDisplayManager({articles}){
    const navigate = useNavigate()
    return(
        <>
        {
            Object.values(articles).length?Object.values(articles).map(article => {
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
                            <OpenModalDelete
                                modalComponent={<ConfirmTrashArticle obj={article}/>}/>
                        </div>
                    </div>
                )
            }):<h1>No Articles to manage! Use NavBar to go post an Article!</h1>
        }
        </>
    )
}

export default ArticleDisplayManager;
