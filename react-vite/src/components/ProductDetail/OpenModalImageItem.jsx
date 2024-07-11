import { useModal } from '../../context/Modal';

function OpenModalImageItem({
  modalComponent, // component to render inside the modal
  itemText, // alt text of the image
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  imageObj //Required, image object from database to render
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <img src={imageObj?.imageUrl} onClick={() => onClick()} alt={itemText}/>
  );
}

export default OpenModalImageItem;
