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
                <h1 className={tradHover?'tradHeaderExtend':'tradHeader'}>Traditional Products</h1>
                <img className={tradHover?'splashImageExtend':'splashImage'} src='https://elot-bucket.s3.us-east-2.amazonaws.com/traditional.png'/>


            </div>
            <button className='traditionalButton' onClick={e =>
                    {
                        e.preventDefault()
                        navigate('/traditional/products')
                    }}>Browse Traditional</button>
            <div className={tradHover ? "splashRightShrink":"splashRight"}>
                {/* <h1 style={elecHover ? {color:'blue'}:{color:'red'}}>Electronic Products</h1> */}
                <img className='splashImage' src='https://elot-bucket.s3.us-east-2.amazonaws.com/elextronic.jpg'/>
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
