import { useNavigate } from 'react-router-dom';
import './HomePage.css'
import { useEffect, useRef, useState } from 'react';

function HomePage() {
    const navigate = useNavigate()

    const [tradHover, setTradhover] = useState(false)
    const [elecHover, setElechover] = useState(false)

    const ulRef = useRef();

    useEffect(() => {

        const hover = (e) => {
            if (e.target.classList.contains('electronicButton')) {
                setElechover(true)
                setTradhover(false);
            } else if (e.target.classList.contains('traditionalButton')) {
                setElechover(false)
                setTradhover(true)
            } else {
                setElechover(false)
                setTradhover(false)
            }

        }

        document.addEventListener('mouseover', hover)

        return () => {
            document.removeEventListener('mouseover', hover)
        }

    }, [tradHover, elecHover])

    return (
        <div className="splashPage">
            <div className={tradHover ? "splashLeftExtend" : elecHover ? "splashLeftShrink" : "splashLeft"}>
                <h1 className={tradHover ? 'tradHeaderExtend' : 'tradHeader'}>Traditional Products</h1>
                <img className={tradHover ? 'splashImageExtend' : 'splashImage'} src='https://elot-bucket.s3.us-east-2.amazonaws.com/traditional.png' />
            </div>
            <button className='traditionalButton' onClick={e => {
                e.preventDefault()
                navigate('/traditional/products')
            }}>Browse Traditional</button>
            <div className={elecHover ? 'splashRightExtend' : tradHover ? 'splashRightShrink' : "splashRight"}>
                <h1 className={elecHover ? 'tradHeaderExtend' : 'tradHeader'}>Electronic Products</h1>
                <img className={elecHover ? 'splashImageExtend' : 'splashImage'} src='https://elot-bucket.s3.us-east-2.amazonaws.com/elextronic.jpg' />
            </div>
            <button className='electronicButton' onClick={e => {
                e.preventDefault()
                navigate('/electronic/products')
            }}>Browse Electronic</button>
            <div className={'hidden'}>
                {/* Hidden div, made to purely hold the buttons still, since animation causes a shift if not last in the  container*/}
            <h1 className={elecHover?'elecHeaderExtend':'elecHeader'}>Electronic Products</h1>
                <img className={elecHover?'splashImageExtend':'splashImage'} src='https://elot-bucket.s3.us-east-2.amazonaws.com/elextronic.jpg'/>
            </div>

        </div>
    )
}

export default HomePage;
