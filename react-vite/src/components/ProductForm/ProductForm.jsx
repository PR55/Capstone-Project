import { useEffect, useState } from "react";
import { thunkNewProduct } from "../../redux/product";
import './ProductForm.css'

function ProductForm() {

    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [price, setPrice] = useState(0.10)
    const [tags, setTags] = useState('')
    const [type, setType] = useState(false)
    const [image, setImage] = useState(null)

    const [isPosting, setPosting] = useState(false)

    const [errors, setErrors] = useState({})

    useEffect(()=>{
        const newErrors = {}

        if(name.length < 10){
            newErrors.name = 'Must be at least 10 characters long'
        }else if (name.length > 75){
            newErrors.name = 'NAme cannot be longer than 75 characters'
        }

        if(body.length < 30){
            newErrors.description = 'Must be at least 30 characters long'
        }else if (body.length > 2000){
            newErrors.description = 'Description cannot be longer than 2000 characters'
        }

        if(price < 0.1){
            newErrors.price = 'Price must be at least 10 cents'
        }

        if(typeof image == File){
            newErrors.image = 'Please upload an image'
        }

        setErrors(newErrors)
    },[name, body,image, price])

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", body);
        formData.append("price", price);
        formData.append("tags", ['Multiplayer', 'Nintendo', 'Switch']);
        formData.append("isTraditional", type);
        formData.append("image", image);
        await console.log(formData.entries().toArray());
        return
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        let d = await dispatch(thunkNewProduct(formData));

        if(d?.errors){
            setErrors(d.errors)
        }
        // history.push("/images");
    }

    return (
        <div className='productFormDiv'>
            <h1>Product Form</h1>
            <form onSubmit={e => onSubmit(e)} className="productForm">
                <div className="inputHolders">
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id='productName' value={name} onChange={e => setName(e.target.value)}/>
                </div>
                {errors?.name ?<p className="errors">{errors.name}</p> :null}
                <div className="inputHolders">
                    <label htmlFor="productBody">Description:</label>
                    <textarea name="productBody" id="prouctBody" value={body} onChange={e => setBody(e.target.value)}/>
                </div>
                {errors?.description ?<p className="errors">{errors.description}</p> :null}
                <div className="inputHolders">
                    <label htmlFor="productPrice">Product Price:</label>
                    <input type="number" step="0.01" min={.10} id='productPrice' value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                {errors?.price ?<p className="errors">{errors.price}</p> :null}
                <div className="inputHolders">
                    <label htmlFor="productTags">Product Tags:</label>
                    <input type="text"id='productTags' value={tags} onChange={e => setTags(e.target.value)}/>
                </div>
                <div className="inputHolders">
                    <label htmlFor="productType">Is Traditional?</label>
                    <input type="checkbox" id='productType' value={type} onChange={e => setType(e.target.value)}/>
                </div>
                <div className="inputHolders">
                    <label htmlFor="productType">Image:</label>
                    <input type="file" id='productType'
                    accept=".png,.jpg,.jpeg,.gif"
                    onChange={e => setImage(e.target.files[0])}/>
                </div>
                {errors?.image ?<p className="errors">{errors.image}</p> :null}
                {isPosting?<h3>Posting your product...</h3> :null}
                <button disabled={isPosting || Object.values(errors).length}>Submit</button>
            </form>
        </div>
    )
}

export default ProductForm;
