import { useModal } from '../../../context/Modal';

function OpenModalDelete({
  modalComponent, // component to render inside the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  product //see if hover and click needs to be disabled
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.stopPropagation();
    if (product?.purchased) {
      if (!product.purchased) {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onItemClick === "function") onItemClick();
      }
    } else {
      if (onModalClose) setOnModalClose(onModalClose);
      setModalContent(modalComponent);
      if (typeof onItemClick === "function") onItemClick();
    }
  };

  return (
    <p onClick={onClick} className={product?.purchased && product.purchased ? "toDeleteButton disabled" : "toDeleteButton"}>Delete</p>
  );
}

export default OpenModalDelete;
