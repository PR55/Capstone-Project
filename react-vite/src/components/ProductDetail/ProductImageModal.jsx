import './ProductDetail.css'
import { IoClose } from "react-icons/io5";
import { useModal } from '../../context/Modal'
import OpenModalTrashItem from './openModalIonItems/OpenModalTrashIcon';
import ConfirmTrash from './modalComponent/TrashConfirm';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function ProductImageModal({ imageUrl, ownerId, imgsLength}) {

    const user = useSelector(store => store.session.user)

    const { closeModal } = useModal();

    useEffect(() => {

    },[user])

    return (
        <div className="modalImageContained">
            <IoClose className='exit' onClick={e => closeModal()} />
            {
                user && ownerId && user.id == ownerId && imgsLength && imgsLength > 1?
                    <OpenModalTrashItem
                        className={'delete'}
                        modalComponent={<ConfirmTrash obj={imageUrl}/>}
                    />
                    : null
            }
            <div className='modalImageCont'>
                <img src={imageUrl?.imageUrl} className="modalImage" />
            </div>
        </div>
    )
}

export default ProductImageModal;
