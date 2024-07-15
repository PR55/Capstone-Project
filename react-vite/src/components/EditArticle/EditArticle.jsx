import { useEffect, useState } from "react";
import { makeOneArticle, thunkLoadOneArticle } from "../../redux/article";
import { allTags } from "../tags";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

function EditArticle(){

    const {articleId} = useParams()

    const article = useSelector(store => store.articles[articleId])

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([])

    const [tracker, setTracker] = useState(allTags.map(tag => false))

    const [tagChangeBool, setTagChangeBool] = useState(false)

    const [errors, setErrors] = useState({})

    const [isPosting, setPosting] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(thunkLoadOneArticle(articleId))
    }, [articleId])

    useEffect(()=>{
        if(article){
            setTitle(article.title)
            setBody(article.body)
            setTags(article.tags.map(tag => tag.tag))
        }
    }, [article])

    useEffect(() => {

        let errObj = {}

        let splitTitle = title.split('')

        // console.log(splitTitle)

        let filtered = splitTitle.filter(char => char !== ' ' && char != '')

        // console.log(filtered)

        if (!filtered.length) {
            errObj.title = 'Cannot submit an empty string'
        } else if (title.length < 5) {
            errObj.title = 'title must be at least 5 characters long'
        } else if (title.length > 200) {
            errObj.title = 'Title cannot be longer than 200 characters'
        }

        let splitBody = body.split('')
        filtered = splitBody.filter(char => char !== ' ' && char != '')

        if (!filtered.length) {
            errObj.body = 'Cannot submit an empty string'
        } else if (body.length < 50) {
            errObj.body = 'Body must be at least 50 characters long'
        } else if (body.length > 5000) {
            errObj.body = 'Body cannot contain more than 5000 characters'
        }

        if(!tags.length){
            errObj.tags = 'Please select at least one tag'
        }else if(tags.length > 7){
            errObj.tags = 'Please only select up to 7 tags'
        }

        if (!image) {
            errObj.image = 'Please select an image for the article'
        }

        setTracker(allTags.map(tag => tags.includes(tag)))

        setErrors(errObj)


    }, [title, body, image, tagChangeBool])

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



    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        for (let tag of tags) {
            formData.append("tags", tag)
        }
        formData.append("image", image);

        setPosting(true);
        let d = await dispatch(makeOneArticle(formData));
        // console.log(d?.errors)
        if (d?.errors) {
            setErrors(d.errors)
            console.log(d.errors)
            setPosting(false)
            return
        }

        navigate(`/articles/${d.id}`)


    }

    return (
        <div>
            <form
                encType="multipart/form-data"
                onSubmit={e => onSubmit(e)}
            >
                <div>
                    <label>Title:</label>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                {errors?.title ? <p>{errors.title}</p> : null}
                <div>
                    <label>Body:</label>
                    <textarea value={body} onChange={e => setBody(e.target.value)} />
                </div>
                {errors?.body ? <p>{errors.body}</p> : null}
                <div className='tagDisplay'>
                    {
                        allTags.map((tagName, index) => (
                            <div key={index} className="tagSelect">
                                <input type="checkbox"
                                    value={tagName}
                                    onChange={e => manageTags(e)}
                                    checked={tracker[index]}
                                />
                                <label>{tagName}</label>
                            </div>
                        ))
                    }
                </div>
                {errors?.tags ? <p>{errors.tags}</p> : null}
                <div>
                    <label>Image:</label>
                    <input type='file' onChange={e => setImage(e.target.files[0])} />
                </div>
                {errors?.image ? <p>{errors.image}</p> : null}
                {isPosting ? <h3>Posting your article...</h3> : null}
                <button disabled={isPosting || Object.values(errors).length}>Submit</button>
            </form>
        </div>
    )
}

export default EditArticle;
