import { useModal } from "../../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteContentArticle } from "../../../redux/userContent";

function ConfirmTrashArticle({obj, deleted, setDeleted}){

    const [deleting, setDeleting] = useState(false)

    const {closeModal} = useModal()

    const dispatch = useDispatch()

    const onDelete = async() => {
        setDeleting(true)
        await dispatch(thunkDeleteContentArticle(obj.id))
        setDeleted(!deleted)
        closeModal()
    }

    return(
        <div className="confirmTrashHolder">
            <h1>Are you sure you want to delete this Article?</h1>
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

export default ConfirmTrashArticle;
