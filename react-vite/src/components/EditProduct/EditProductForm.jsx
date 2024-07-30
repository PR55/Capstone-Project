import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { electronic_tags, traditional_tags } from "../tags";
import { thunkProductLoadOne, thunkUpdateProduct } from "../../redux/product";
import '../ProductForm/ProductForm.css'

function EditProductForm() {

    const { productId } = useParams()
    const dispatch = useDispatch()
    const product = useSelector(store => store.products[productId])

    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [price, setPrice] = useState(0.10)
    const [tags, setTags] = useState([])
    const [type, setType] = useState(false)
    const [addImage, setAddImage] = useState(false)
    const [deleteAll, setDeleteAll] = useState(false)
    const [image, setImage] = useState(null)

    const [isPosting, setPosting] = useState(false)

    const [tagArr, setTagArr] = useState(electronic_tags.map(() => false))

    const [tagChangeBool, setTagChangeBool] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (productId)
            dispatch(thunkProductLoadOne(productId))
    }, [productId])

    useEffect(() => {
        if (product) {
            setName(product.name)
            setBody(product.description)
            setPrice(product.price)
            setType(product.isTraditional)
            let tagArr = []

            for (let tag of product.tags) {
                tagArr.push(tag.tag)
            }

            setTags(tagArr)
            setTagChangeBool(!tagChangeBool)
            console.log(product.isTraditional)
        }
    }, [product])

    useEffect(() => {
        if (product && type == product.isTraditional) {
            setTags(product.tags.map(tag => tag.tag))
            setTagChangeBool(!tagChangeBool)
        } else {
            setTags([])
            setTagChangeBool(!tagChangeBool)
        }
    }, [type])

    useEffect(() => {
        const newErrors = {}

        const splitName = name.split('')

        const nameChecker = []

        for(let char of splitName){
            if(char && char != ' '){
                nameChecker.push(char)
            }
        }

        if (nameChecker.length < 1) {
            newErrors.name = 'Must be at least 1 character long'
        } else if (nameChecker.length > 200) {
            newErrors.name = 'Name cannot be longer than 200 characters'
        }

        const splitBody = body.split('')

        const bodyChecker = splitBody.filter(char => char && char != ' ')

        if (bodyChecker.length < 30) {
            newErrors.description = 'Must be at least 30 characters long'
        } else if (bodyChecker.length > 2000) {
            newErrors.description = 'Description cannot be longer than 2000 characters'
        }

        if (price < 0.1) {
            newErrors.price = 'Price must be at least 10 cents'
        }

        if (tags.length < 1) {
            newErrors.tags = "Please select at least 1 tag"
        }

        if(deleteAll && !addImage){
            newErrors.image = 'Must add an image if deleting all'
        }else if(addImage && !image){
            newErrors.image = 'Please select an image file'
        }

        setTagArr(type ? traditional_tags.map(tag => tags.includes(tag)) : electronic_tags.map(tag => tags.includes(tag)))

        setErrors(newErrors)
    }, [name, body, image, price, tagChangeBool, type, deleteAll, addImage])

    const navigate = useNavigate()

    const manageTags = (e) => {
        // console.log(`I have been clicked! my value is ${e.target.value}`)
        let arr = tags
        if (e.target.checked) {
            arr.push(e.target.value)
        } else {
            let ind = arr.indexOf(e.target.value)
            if (ind == 0) {
                arr = arr.slice(1)
            } else if (ind == arr.length - 1) {
                arr.pop()
            } else if (ind > 0) {
                arr = arr.slice(0, ind).concat(arr.slice(ind + 1))
            }
        }
        setTags(arr)
        setTagChangeBool(!tagChangeBool)
    }

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", body);
        formData.append("price", price);
        for (let tag of tags) {
            formData.append("tags", tag)
        }
        formData.append("isTraditional", type);
        formData.append("deleteImages",deleteAll)
        formData.append("addImage",addImage)
        formData.append("image", image);
        console.log(formData.entries().toArray());
        // return
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setPosting(true);
        let d = await dispatch(thunkUpdateProduct(formData, productId));
        // console.log(d?.errors)
        if (d?.errors) {
            setErrors(d.errors)
            console.log(d.errors)
            return
        }

        navigate(`/products/${d.id}`)
        // history.push("/images");
    }

    return (
        <div className='productFormDiv'
        >
            <h1>Product Update Form</h1>
            <form
                onSubmit={e => onSubmit(e)}
                encType="multipart/form-data"
                className="productForm"
            >
                <div className="inputHoldersPostProd">
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id='productName' value={name} onChange={e => setName(e.target.value)} />
                </div>
                {errors?.name ? <p className="errors">{errors.name}</p> : null}
                <div className="inputHoldersPostProd">
                    <label htmlFor="prouctBody">Description:</label>
                    <textarea className="postProdDescript" name="productBody" id="prouctBody" value={body} onChange={e => setBody(e.target.value)} />
                </div>
                {errors?.description ? <p className="errors">{errors.description}</p> : null}
                <div className="inputHoldersPostProd">
                    <label htmlFor="productPrice">Product Price:</label>
                    <input type="number" step="0.01" min={.10} id='productPrice' value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                {errors?.price ? <p className="errors">{errors.price}</p> : null}
                <div className="inputHoldersPostProd">
                    <p>Tags:</p>
                    <div className='tagDisplay'>
                        {
                            type ?
                                traditional_tags.map((tagName, index) => (
                                    <div key={index} className="tagSelect">
                                        <input type="checkbox"
                                            value={tagName}
                                            onChange={e => manageTags(e)}
                                            checked={tagArr[index]}
                                        />
                                        <label>{tagName}</label>
                                    </div>
                                ))
                                :
                                electronic_tags.map((tagName, index) => (
                                    <div key={index} className="tagSelect">
                                        <input type="checkbox"
                                            value={tagName}
                                            onChange={e => manageTags(e)}
                                            checked={tagArr[index]}
                                        />
                                        <label>{tagName}</label>
                                    </div>
                                ))
                        }
                    </div>
                </div>
                {errors?.tags ? <p className="errors">{errors.tags}</p> : null}
                <div className="inputHoldersPostProdCheck">
                    <label htmlFor="productType">Is Traditional?</label>
                    <input type="checkbox" id='productType' checked={type} value={type} onChange={() => setType(!type)} />
                </div>
                <div className="inputHolders">
                    <label htmlFor="productType">Delete all images?</label>
                    <input type="checkbox" id='productType' value={deleteAll} onChange={() => setDeleteAll(!deleteAll)} />
                </div>
                {
                    product?.images.length < 3 || (product?.images.length == 3 && deleteAll) ?
                        <div className="inputHoldersPostProdCheck">
                            <label htmlFor="productType">Add Image?</label>
                            <input type="checkbox" id='productType' value={addImage} onChange={() => setAddImage(!addImage)} />
                        </div>
                        : null
                }
                {
                    addImage
                        ?
                        <div className="inputHoldersPostProd">
                            <label htmlFor="productType">Image:</label>
                            <input type="file" id='productType'
                                accept="image/*"
                                onChange={e => setImage(e.target.files[0])} />
                        </div>
                        : null
                }

                {errors?.image ? <p className="errors">{errors.image}</p> : null}
                {isPosting ? <h3>Posting your product...</h3> : null}
                <button className='submitButton' disabled={isPosting || Object.values(errors).length}>Submit</button>
            </form>
        </div>
    )
}

export default EditProductForm;
