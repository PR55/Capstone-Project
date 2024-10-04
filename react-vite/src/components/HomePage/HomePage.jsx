import { useNavigate } from 'react-router-dom';
import './HomePage.css'
import { useState } from 'react';

function HomePage() {
    const navigate = useNavigate()

    const [tradHover, setTradhover] = useState(false)
    const [elecHover, setElechover] = useState(false)

    return (
        <div className="splashPage" onTouchMove={e => {
            e.stopPropagation()
        }}>
            <div className={tradHover && window.innerWidth > 960 ? "splashLeftExtend" : elecHover && window.innerWidth > 960  ? "splashLeftShrink" : "splashLeft"}>
                <h1 className={tradHover && window.innerWidth > 960  ? 'tradHeaderExtend' : 'tradHeader'}>Traditional Products</h1>
                <img className={tradHover && window.innerWidth > 960  ? 'splashImageExtend' : 'splashImage'} src='https://elot-bucket.s3.us-east-2.amazonaws.com/traditional.png' />
            </div>
            <button className={elecHover&& window.innerWidth > 960  ?'traditionalButtonLower': 'traditionalButton'} onClick={e => {
                e.preventDefault()
                navigate('/traditional/products')
                window.scrollTo({top:0, left:0, behavior:"instant"})
            }}
            onMouseEnter={e => {
                e.stopPropagation()
                setTradhover(true)
            }}
            onMouseLeave={e => {
                e.stopPropagation()
                setTradhover(false)
            }}
            onTouchStart={() => {
                setTradhover(false)
            }}
            >Browse Traditional</button>
            <div className={elecHover && window.innerWidth > 960 ? 'splashRightExtend' : tradHover && window.innerWidth > 960  ? 'splashRightShrink' : "splashRight"}>
                <h1 className={elecHover && window.innerWidth > 960  ? 'elecHeaderExtend' : 'elecHeader'}>Electronic Products</h1>
                <img className={elecHover && window.innerWidth > 960  ? 'splashImageExtend' : 'splashImage'} src='https://elot-bucket.s3.us-east-2.amazonaws.com/elextronic.jpg' />
            </div>
            <button className={tradHover && window.innerWidth > 960  ? 'electronicButtonLower':'electronicButton'} onClick={e => {
                e.preventDefault()
                navigate('/electronic/products')
                window.scrollTo({top:0, left:0, behavior:"instant"})
            }}
            onMouseEnter={e => {
                e.stopPropagation()
                setElechover(true)
            }}
            onMouseLeave={e => {
                e.stopPropagation()
                setElechover(false)
            }}
            onTouchStart={() => {
                setElechover(false)
            }}
            >Browse Electronic</button>
        </div>
    )
}

export default HomePage;
