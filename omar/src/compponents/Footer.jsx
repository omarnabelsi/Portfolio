import './Footer.css'
import { FaGithub, FaLinkedin } from "react-icons/fa";
function Footer() {
    const icons=[
        { icon: <FaGithub />, color: "#000000" }, // GitHub
        { icon: <FaLinkedin />, color: "#0A66C2" }, // LinkedIn
    ]
    return (
        <footer className="footer">
            <p className='logo'>Omar</p>
            <p>© 2024 Omar. All rights reserved.</p>
            <div className="social-icons">
                <a href="https://github.com/omarnabelsi" className="social-icon">{icons[0].icon}</a>
                <a href="https://www.linkedin.com/in/omar-nabelsi-4776b8398/" className="social-icon2">{icons[1].icon}</a>
            </div>
        </footer>
    );
}
export default Footer;