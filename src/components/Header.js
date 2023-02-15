import { Link } from 'react-router-dom';
import logo from '../images/header/logo.svg';

function Header({email, text, linkURL, handleExit}) {

    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo"/>
            {email && 
                <div className='header__menu'>
                    <p className="header__email">{email}</p>
                    <button onClick={handleExit} className="header__link header__link_light">{text}</button>
                </div> 
            }
            {!email && <Link to={linkURL} className="header__link">{text}</Link>}
        </header>
    )
}

export default Header;