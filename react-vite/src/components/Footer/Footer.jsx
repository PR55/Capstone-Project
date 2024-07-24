import './Footer.css'
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
function Footer(){
    return(
        <div className="footer">
            <a
            href='https://github.com/PR55'
            target='_blank'
            className='externalLink'><FaGithubSquare/></a>
            <a
            href='https://www.linkedin.com/in/kyle-joel-flores/'
            target='_blank'
            className='externalLink'><FaLinkedin/></a>
        </div>
    )
}

export default Footer;
