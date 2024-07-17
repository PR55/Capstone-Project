import OpenModalDelete from "../OpenModal/OpenModalDelete";
import ConfirmTrashProduct from "../ModalItem/ModalDeleteProduct";
import { useNavigate } from "react-router-dom";

function ProductDisplayManager({products, electronic}){

    const navigate = useNavigate()

    let arr = Object.values(products).filter(product => {
        if(electronic && product.isTraditional == false){
            return product
        }else if(!electronic && product.isTraditional == true){
            return product
        }
    })

    return (
        arr.length ?
        arr.map(product => {
            return (
                <div key={product.id} className='productBlockManage'  onClick={() => navigate(`/products/${product.id}`)}>
                    <div className='imageHolder'>
                        <img src={product.images[0].imageUrl} alt={'gameImg'} />
                    </div>
                    <div className='manageDescription'>
                        <p className='title'>{product?.name && product.name.length > 50 ? product.name.slice(0,50) + '...':product.name}</p>
                        <p className="priceManage">${product.price.toFixed(2)}</p>
                        <p className='body'>{product.description.length > 250 ? product.description.slice(0, 250) + "..." : product.description}</p>
                        <div className="manageTags">
                            {product.tags.map(tag => (
                                <p>{tag.tag}</p>
                            ))}
                        </div>

                    </div>
                    <div className='Purchase'>
                        <p className="toUpdateButton" onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/products/${product.id}/edit`)
                            }}>Update</p>
                        <OpenModalDelete
                        modalComponent={<ConfirmTrashProduct obj={product}/>}
                        />
                    </div>
                </div>
            )
    })
    :
    <h1>No {electronic?'Electronic':'Traditional'} Products to manage! Go post some {electronic?'Electronic':'Traditional'} Products using the NavBar above!</h1>
)
}

export default ProductDisplayManager;
