import { useNavigate } from 'react-router-dom';
import './HomePage.css'
import { useEffect, useRef, useState } from 'react';

function HomePage(){
    const navigate = useNavigate()

    const [tradHover, setTradhover] = useState(true)
    const [elecHover, setElechover] = useState(false)

  const ulRef = useRef();

    useEffect(() => {

        const hover = (e) => {
            console.log(e.target.classList)
            if(e.target.classList.contains('electronicButton')){
                setElechover(true)
                setTradhover(false);
            }else if(e.target.classList.contains('traditionalButton')){
                setElechover(false)
                setTradhover(true)
            }else{
                setElechover(false)
                setTradhover(false)
            }

        }

        document.addEventListener('mouseover', hover)

        return () => {
            document.removeEventListener('mouseover', hover)
        }

    }, [tradHover, elecHover])

    return(
        <div className="splashPage">
            <div className={tradHover ? "splashLeftExtend":"splashLeft"}>
                <h1 style={tradHover ? {color:'blue'}:{color:'red'}}>Traditional Products</h1>
                <button className='traditionalButton' onClick={e =>
                    {
                        e.preventDefault()
                        navigate('/traditional/products')
                    }}>Browse Traditional</button>
            </div>
            <div className={tradHover ? "splashRightShrink":"splashRight"}>
                <h1 style={elecHover ? {color:'blue'}:{color:'red'}}>Electronic Products</h1>
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
