import OpenModalDelete from "../OpenModal/OpenModalDelete";
import ConfirmTrashProduct from "../ModalItem/ModalDeleteProduct";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductDisplayManager({products, electronic}){

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

    let arr = Object.values(products).filter(product => {
        if(electronic && product.isTraditional == false){
            return product
        }else if(!electronic && product.isTraditional == true){
            return product
        }
    })

    useEffect(() => {
        setPages(arr, currentPage)
    }, [deleted, currentPage])

    return (
        sorted.length ?
        <>
        {sorted.map(product => {
            return (
                <div key={product.id} className='productBlockManage'  onClick={() => navigate(`/products/${product.id}`)}>
                    <div className='imageHolder'>
                        <img src={product.images[0].imageUrl} alt={'gameImg'} />
                    </div>
                    <div className='manageDescription'>
                        <p className='title'>{product.name.length > 50 ? product.name.slice(0,50) + '...':product.name}</p>
                        <p className="priceManage">${product.price.toFixed(2)}</p>
                        <p className='bodyManage'>{product.description[0].length > 125 ? product.description[0].slice(0,125) + '...': product.description}</p>
                        <div className="manageTags">
                            {product.tags.map(tag => (
                                <p key={tag.id}>{tag.tag}</p>
                            ))}
                        </div>

                    </div>
                    <div className='Purchase'>
                        <p className={product.purchased ? "toUpdateButton disabled":"toUpdateButton"} onClick={(e) => {
                            e.stopPropagation()
                            if(!product.purchased){
                                navigate(`/products/${product.id}/edit`)
                            }
                            }}
                            >Update</p>
                        <OpenModalDelete
                        product={product}
                        modalComponent={<ConfirmTrashProduct obj={product} deleted={deleted} setDeleted={setDeleted}/>}
                        />
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
    :
    <h1>No {electronic?'Electronic':'Traditional'} Products to manage! Go post some {electronic?'Electronic':'Traditional'} Products using the NavBar above!</h1>
)
}

export default ProductDisplayManager;
