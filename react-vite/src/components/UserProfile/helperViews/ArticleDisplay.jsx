import { useEffect, useState } from "react"

function ArticleDisplay({articles, user}){

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

    useEffect(()=>{
        setPages(articles, currentPage)
    }, [currentPage])

    return(
        <>
            {
                articles && sorted.length
                ?
                <>
                {
                sorted.map(article => (
                    <div className="articleBlockProfile">
                        <div className="articlePBImgHolder">
                            <img src={article.imageUrl}/>
                        </div>
                        <div className="articlePBDescript">
                            <p className="titleProfile">{article.title}</p>
                            <p className="bodyProfile">{article.body.length > 175 ?article.body.slice(0,176) + '...' :article.body}</p>
                        </div>
                        <div className="articlePBInteract">
                            {
                                user &&user?.id === article.owner.id
                                ?
                                <p className="updateButton">Update</p>
                                : null
                            }
                        </div>
                    </div>
                ))}
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
                :
                null
            }
        </>
    )

}
export default ArticleDisplay;
