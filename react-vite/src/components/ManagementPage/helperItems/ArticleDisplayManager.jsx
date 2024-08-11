import OpenModalDelete from "../OpenModal/OpenModalDelete";
import ConfirmTrashArticle from "../ModalItem/ModalDeleteArticle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function ArticleDisplayManager({articles}){
    const navigate = useNavigate()

    const [deleted, setDeleted] = useState(false)

    const [pageNumbers, setPageNumbers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const numProductsForPage = 4

    const [sorted, setSorted] = useState([])

    const parseNum = 3

    function setPages(arr, page = 1) {

        if (arr.length < 2) {
            setSorted(arr)
            setPageNumbers([1])
            return
        }

        let val = arr.length / numProductsForPage;

        let arr2 = arr.slice((numProductsForPage * (page - 1)), numProductsForPage * page)
        setSorted(arr2)

        let pageArr = []

        for (let i = 0; i < val; i++) {
            pageArr.push(i + 1)
        }

        setPageNumbers(pageArr)

        if(page > pageArr[pageArr.length-1]){
            setCurrentPage(pageArr[pageArr.length-1])
        }
    }

    useEffect(() => {
        setPages(Object.values(articles), currentPage)
    }, [deleted, currentPage])

    return(
        <>
        {
            sorted.length?
            <>{
            sorted.map(article => {
                return (
                    <div key={article.id} className='productBlockManage' onClick={() => navigate(`/articles/${article.id}`)}>
                        <div className='imageHolder'>
                            <img src={article.imageUrl} alt={'gameImg'} />
                        </div>
                        <div className='manageDescription'>
                            <p className='title'>{article?.title && article.title.length > 50 ?article.title.slice(0,50) + '...' :article.title}</p>
                            <p className='creator'>{article.owner?.username}</p>
                            <p className='body'>{article?.body}</p>
                            <div className="manageTags">
                                    {article?.tags.map(tag => (
                                        <p key={tag.id}>{tag.tag}</p>
                                    ))}
                                </div>
                        </div>
                        <div className='Purchase'>
                            <p className="toUpdateButton" onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/articles/${article.id}/edit`)
                                }}>Update</p>
                            <OpenModalDelete
                                modalComponent={<ConfirmTrashArticle obj={article} deleted={deleted} setDeleted={setDeleted}/>}/>
                        </div>
                    </div>
                )

            })}
            <div className='paginationNav'>
                {
                    pageNumbers.length && currentPage !== 1
                        ?
                        <p
                            onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                setPageNumbers([])
                                setCurrentPage(1)
                                window.scrollTo({top:0, left:0, behavior:'instant'})
                            }}
                            className='decoratorPageNums'
                        >{'<<'}</p>
                        :
                        null
                }
                {
                    pageNumbers.length && currentPage > 1
                        ?
                        <p
                            onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                setPageNumbers([])
                                setCurrentPage(currentPage - 1)
                                window.scrollTo({top:0, left:0, behavior:'instant'})
                            }}
                            className='decoratorPageNums'
                        >{'<'}</p>
                        :
                        null
                }
                {
                    pageNumbers.map((number, index) => {
                        if (number >= currentPage - (parseNum - 1) && number < currentPage + parseNum) {
                            return (
                                <p key={index}
                                    onClick={e => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setPageNumbers([])
                                        setCurrentPage(number)
                                        window.scrollTo({top:0, left:0, behavior:'instant'})
                                    }}
                                    className={number === currentPage ? 'Active' : 'inActive'}
                                >{number}</p>
                            )
                        }
                    })
                }
                {
                    pageNumbers.length && currentPage < pageNumbers[pageNumbers.length - 1]
                        ?
                        <p
                            onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                setPageNumbers([])
                                setCurrentPage(currentPage + 1)
                                window.scrollTo({top:0, left:0, behavior:'instant'})
                            }}
                            className='decoratorPageNums'
                        >{'>'}</p>
                        :
                        null
                }
                {
                    pageNumbers.length && currentPage !== pageNumbers[pageNumbers.length - 1]
                        ?
                        <p
                            onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                setPageNumbers([])
                                setCurrentPage(pageNumbers[pageNumbers.length - 1])
                                window.scrollTo({top:0, left:0, behavior:'instant'})
                            }}
                            className='decoratorPageNums'
                        >{'>>'}</p>
                        :
                        null
                }

            </div>
            </>
            :<h1>No Articles to manage! Use NavBar to go post an Article!</h1>
        }
        </>
    )
}

export default ArticleDisplayManager;
