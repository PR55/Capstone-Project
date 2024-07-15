import { useEffect, useState } from "react";
import { thunkNewProduct } from "../../redux/product";
import './ProductForm.css'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { electronic_tags, traditional_tags } from "../tags";
function ProductForm() {

    // const history = useHistory()
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [price, setPrice] = useState(0.10)
    const [tags, setTags] = useState([])
    const [type, setType] = useState(false)
    const [image, setImage] = useState(null)

    const [tagArr, setTagArr] = useState(electronic_tags.map(() => false))

    const [isPosting, setPosting] = useState(false)

    const [errors, setErrors] = useState({})

    const [tagChangeBool, setTagChangeBool] = useState(false)

    const dispatch = useDispatch()

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

        if (!image) {
            newErrors.image = 'Please upload an image'
        }

        for(let tag of tags){
            if(type && electronic_tags.includes(tag)){
                setTags([]);
                setTagChangeBool(!tagChangeBool)
                break;
            }else if(!type && traditional_tags.includes(tag)){
                setTags([]);
                setTagChangeBool(!tagChangeBool)
                break;
            }
        }

        setTagArr(type ? traditional_tags.map(tag => tags.includes(tag)) : electronic_tags.map(tag=> tags.includes(tag)))

        setErrors(newErrors)
    }, [name, body, image, price, tagChangeBool,type])

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
        formData.append("image", image);
        console.log(formData.entries().toArray());
        // return
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setPosting(true);
        let d = await dispatch(thunkNewProduct(formData));
        // console.log(d?.errors)
        if (d?.errors) {
            setErrors(d.errors)
            console.log(d.errors)
            setPosting(false)
            return
        }

        navigate(`/products/${d.id}`)
        // history.push("/images");
    }

    // console.log(type)

    return (
        <div className='productFormDiv'
        >
            <h1>Product Form</h1>
            <form
                encType="multipart/form-data"
                onSubmit={e => onSubmit(e)} className="productForm">
                <div className="inputHolders">
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id='productName' value={name} onChange={e => setName(e.target.value)} />
                </div>
                {errors?.name ? <p className="errors">{errors.name}</p> : null}
                <div className="inputHolders">
                    <label htmlFor="productBody">Description:</label>
                    <textarea name="productBody" id="prouctBody" value={body} onChange={e => setBody(e.target.value)} />
                </div>
                {errors?.description ? <p className="errors">{errors.description}</p> : null}
                <div className="inputHolders">
                    <label htmlFor="productPrice">Product Price:</label>
                    <input type="number" step="0.01" min={.10} id='productPrice' value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                {errors?.price ? <p className="errors">{errors.price}</p> : null}
                <div className="inputHolders">
                    <p>Tags:</p>
                    <div className='tagDisplay'>
                        {
                            type ?
                                traditional_tags.map((tagName, index) => (
                                    <div key={index} className="tagSelect">
                                        <input type="checkbox"
                                            value={tagName}
                                            onChange={e => manageTags(e)}
                                            checked = {tagArr[index]}
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
                                            checked = {tagArr[index]}
                                        />
                                        <label>{tagName}</label>
                                    </div>
                                ))
                        }
                    </div>
                </div>
                {errors?.tags ? <p className="errors">{errors.tags}</p> : null}
                <div className="inputHolders">
                    <label htmlFor="productType">Is Traditional?</label>
                    <input type="checkbox" id='productType' value={type} onChange={() => setType(!type)} />
                </div>
                <div className="inputHolders">
                    <label htmlFor="productType">Image:</label>
                    <input type="file" id='productType'
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])} />
                </div>
                {errors?.image ? <p className="errors">{errors.image}</p> : null}
                {isPosting ? <h3>Posting your product...</h3> : null}
                <button disabled={isPosting || Object.values(errors).length}>Submit</button>
            </form>
        </div>
    )
}

export default ProductForm;
