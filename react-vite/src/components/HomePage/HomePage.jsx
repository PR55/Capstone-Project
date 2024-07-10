import { useNavigate } from 'react-router-dom';
import './HomePage.css'

function HomePage(){
    const navigate = useNavigate()
    return(
        <div className="splashPage">
            <div className="splashLeft">
                <h1>Traditional Products</h1>
                <button  className='electronicButton' onClick={e =>
                    {
                        e.preventDefault()
                        navigate('/traditional/products')
                    }}>Browse Traditional</button>
            </div>
            <div className="splashRight">
                <h1>Electronic Products</h1>
                <button className='electronicButton' onClick={e =>
                    {
                        e.preventDefault()
                        navigate('/electronic/products')
                    }}>Browse Electronic</button>
            </div>
        </div>
    )
}

export default HomePage;
