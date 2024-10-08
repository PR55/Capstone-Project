import { useEffect, useState } from "react";
import { makeOneArticle } from "../../redux/article";
import { allTags } from "../tags";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import './PostArticle.css'

function PostArticle() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([])

    const [tracker, setTracker] = useState(allTags.map(() => false))

    const [tagChangeBool, setTagChangeBool] = useState(false)

    const [errors, setErrors] = useState({})

    const [isPosting, setPosting] = useState(false)

    useEffect(() => {

        let errObj = {}

        let splitTitle = title.split('')

        let filtered = splitTitle.filter(char => char !== ' ' && char != '')

        if (!filtered.length) {
            errObj.title = 'Cannot submit an empty string'
        } else if (title.length < 5) {
            errObj.title = 'Title must be at least 5 characters long'
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

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        if (d?.errors) {
            setErrors(d.errors)
            setPosting(false)
            return
        }

        navigate(`/articles/${d.id}`)
        window.scrollTo({top:0, left:0, behavior:"instant"})


    }

    return (
        <div className="articleFormHolder">
            <h1>Article Form</h1>
            <form
                encType="multipart/form-data"
                onSubmit={e => onSubmit(e)}
                className="articleForm"
            >
                <div className="inputHolderPostArticle">
                    <label>Title:</label>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                {errors?.title ? <p className="errors">{errors.title}</p> : null}
                <div className="inputHolderPostArticle">
                    <label>Body:</label>
                    <textarea className="postArticleDescript" value={body} onChange={e => setBody(e.target.value)} />
                </div>
                {errors?.body ? <p className="errors">{errors.body}</p> : null}
                <div className="inputHolderPostArticle">
                <p>Tags:</p>
                <div className='tagDisplayArticle'>

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
                </div>
                {errors?.tags ? <p className="errors">{errors.tags}</p> : null}
                <div className="inputHolderPostArticle">
                    <label>Image:</label>
                    <input type='file' onChange={e => setImage(e.target.files[0])} />
                </div>
                {errors?.image ? <p className="errors">{errors.image}</p> : null}
                {isPosting ? <h3>Posting your article...</h3> : null}
                <button className='submitButton' disabled={isPosting || Object.values(errors).length}>Submit</button>
            </form>
        </div>
    )
}

export default PostArticle;
