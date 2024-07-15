import { useModal } from "../../../context/Modal";
import { thunkaddOneImage } from "../../../redux/product";
import '../ProductDetail.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function AddImage({ obj }) {

    const [deleting, setDeleting] = useState(false)

    const { closeModal } = useModal()

    const dispatch = useDispatch()

    const [image, setImage] = useState(null)

    const [errors,setErrors] = useState({})

    useEffect(()=>{

        const errObj = {}

        if(!image){
            errObj.image = 'Please select an image'
        }

        setErrors(errObj)

    }, [image])

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('image', image)

        setDeleting(true)
        let d = await dispatch(thunkaddOneImage(formData,obj.id))

        if(d?.errors){
            setDeleting(false);
            setErrors(d.errors);
            return;
        }

        closeModal()
    }

    return (
        <div className="addPhoto">
            <h1>Please select a photo to upload</h1>
            {deleting ?
                <h1>PROCESSING POST REQUEST</h1>
                : null}
            <form onSubmit={(e) => onSubmit(e)}
                encType="multipart/form-data">
                <div className="inputHoldersModal">
                    <label htmlFor="productType">Image:</label>
                    <input type="file" id='productType'
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])} />
                </div>
                {errors?.image ? <p className="errors">{errors.image}</p> : null}
                <button disabled={deleting || Object.values(errors).length}>Submit Photo</button>
            </form>

        </div>
    )


}

export default AddImage;
