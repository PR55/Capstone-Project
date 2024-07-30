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
            <div className={tradHover ? "splashLeftExtend" : elecHover ? "splashLeftShrink" : "splashLeft"}>
                <h1 className={tradHover ? 'tradHeaderExtend' : 'tradHeader'}>Traditional Products</h1>
                <img className={tradHover ? 'splashImageExtend' : 'splashImage'} src='https://elot-bucket.s3.us-east-2.amazonaws.com/traditional.png' />
            </div>
            <button className={elecHover?'traditionalButtonLower': 'traditionalButton'} onClick={e => {
                e.preventDefault()
                navigate('/traditional/products')
            }}
            onMouseEnter={e => {
                e.stopPropagation()
                setTradhover(true)
            }}
            onMouseLeave={e => {
                e.stopPropagation()
                setTradhover(false)
            }}
            onTouchStart={e => {
                setTradhover(false)
            }}
            >Browse Traditional</button>
            <div className={elecHover ? 'splashRightExtend' : tradHover ? 'splashRightShrink' : "splashRight"}>
                <h1 className={elecHover ? 'elecHeaderExtend' : 'elecHeader'}>Electronic Products</h1>
                <img className={elecHover ? 'splashImageExtend' : 'splashImage'} src='https://elot-bucket.s3.us-east-2.amazonaws.com/elextronic.jpg' />
            </div>
            <button className={tradHover ? 'electronicButtonLower':'electronicButton'} onClick={e => {
                e.preventDefault()
                navigate('/electronic/products')
            }}
            onMouseEnter={e => {
                e.stopPropagation()
                setElechover(true)
            }}
            onMouseLeave={e => {
                e.stopPropagation()
                setElechover(false)
            }}
            onTouchStart={e => {
                setElechover(false)
            }}
            >Browse Electronic</button>
            <div className={'hidden'}>
                {/* Hidden div, made to purely hold the buttons still, since animation causes a shift if not last in the  container*/}
            <h1 className={elecHover?'elecHeaderExtend':'elecHeader'}></h1>
            </div>

        </div>
    )
}

export default HomePage;
