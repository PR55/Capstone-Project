import { useModal } from '../../../context/Modal';
import { FaPlus } from "react-icons/fa";

function OpenAddPhoto({
    modalComponent, // component to render inside the modal
    itemText, // alt text of the image
    onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    className //required, name of class
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onItemClick === "function") onItemClick();
    };
    return (
        <div className="previewAdd" onClick={() => onClick()}>
        <FaPlus/>
        </div>
    )
}

export default OpenAddPhoto;
