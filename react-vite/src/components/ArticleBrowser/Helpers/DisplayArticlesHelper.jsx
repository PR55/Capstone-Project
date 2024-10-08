function DisplayArticlesHelper({ articles, navigate }) {

    function localDate(date) {
        let str = ``
        let transDate = new Date(date)
        str += `${transDate.getMonth() + 1}/${transDate.getDate()}/${transDate.getFullYear()} - `

        let endTiem = 'AM'

        if (transDate.getHours() > 12) {
            str += `${transDate.getHours() - 12}`
            endTiem = 'PM'
        }
        else
            str += `${transDate.getHours()}`

        if (transDate.getMinutes() < 10) {
            str += `:0${transDate.getMinutes()} `
        } else {
            str += `:${transDate.getMinutes()} `
        }

        return str + endTiem
    }

    return (
        <>
            {
                articles.length ?
                    <>
                        {
                            articles.map(product => {
                                return (
                                    <div key={product.id} className='productBlockArticle' onClick={() => {
                                        navigate(`/articles/${product.id}`)
                                        window.scrollTo({top:0, left:0, behavior:"instant"})
                                    }}>
                                        <div className='imageHolder'>
                                            <img src={product.imageUrl} alt={'gameImg'} />
                                        </div>
                                        <div className='description'>
                                            <p className='title'>{product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}</p>
                                            <p className='creator'>{product.owner?.username}</p>
                                            <p>{localDate(product.timeUpdated)}</p>
                                            <div className='body'>{product.body.map((text,index) => (
                                                <p key={index}>{index <= 1 && text ?text:null}</p>
                                            ))}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                    :
                    <h1>No Articles matching that name</h1>
            }
        </>
    )
}

export default DisplayArticlesHelper
