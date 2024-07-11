// import { useModal } from "../../context/Modal";

function ProductImageModal({imageUrl}){
    // const {closeModal} = useModal()

    return(
        <div className="modalImageContained">
            <img src={imageUrl} className="modalImage"/>
        </div>
    )
}

export default ProductImageModal;
