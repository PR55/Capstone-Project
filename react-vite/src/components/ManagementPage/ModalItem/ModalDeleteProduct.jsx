import { useModal } from "../../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteContentProduct } from "../../../redux/userContent";

function ConfirmTrashProduct({obj, deleted, setDeleted}){

    const [deleting, setDeleting] = useState(false)

    const {closeModal} = useModal()

    const dispatch = useDispatch()

    const onDelete = async() => {
        setDeleting(true)
        await dispatch(thunkDeleteContentProduct(obj.id))
        setDeleted(!deleted)
        closeModal()
    }

    return(
        <div className="confirmTrashHolder">
            <h1>Are you sure you want to delete this Product?</h1>
            {deleting ?
            <h1>PROCESSING DELETE REQUEST</h1>
            :null}
            <div className="confirmTrashButtons">
                <button
                disabled={deleting}
                className="confirm" onClick={()=>onDelete()}>Yes</button>
                <button
                disabled={deleting}
                className="deny" onClick={()=> closeModal()}>No</button>
            </div>

        </div>
    )


}

export default ConfirmTrashProduct;
