import "./Header.css"
import { useAuth} from '../../context/AuthContext'
import {Link, NavLink} from 'react-router-dom'
import BadIcon from '../../lib/icons/bad.svg?react'
import ProfileIcon from '../../lib/icons/account_circle.svg?react'
const Header = ({ OnOpenLogin}) => {
    const { user, logout } = useAuth();
    return (
        <div className="Header__container">
            <Link to="/">
                <h1>SEA<span style={{ color: '#0088FF' }}>.</span>hotel</h1>
            </Link>
            <div className="links--container">
                    <Link to="my-booking" className="link--item">
                        <div className="link--content">
                            <BadIcon className="link--icon"/>
                            <span>Бронирования</span>
                        </div>
                    </Link>

                    {user ?(
                        <Link to="/profile" className="link--item">
                             <div className="link--content">
                                <ProfileIcon className="link--icon"/>
                            <span>{user?.login}</span>
                             </div>

                        </Link>
                    ):
                    (
                        (<button onClick={OnOpenLogin} className="link--item">
                            <div className="link--content">
                                <ProfileIcon className="link--icon"/>
                                <span>Войти</span>
                            </div>
                        </button>)
                    )}
            </div>
        </div>
    )
}

export default Header;