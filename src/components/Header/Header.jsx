import "./Header.css"
import { useAuth } from '../../context/AuthContext'
import { Link, NavLink } from 'react-router-dom'
import BadIcon from '../../lib/icons/bad.svg?react'
import ProfileIcon from '../../lib/icons/account_circle.svg?react'

const Header = ({ OnOpenLogin }) => {
    const { user } = useAuth();

    const logoRedirectPath = user?.isAdmin ? "/my-booking" : "/booking";

    return (
        <div className="Header__container">
            <Link to={logoRedirectPath}>
                <h1>SEA<span style={{ color: '#0088FF' }}>.</span>hotel</h1>
            </Link>

            <div className="links--container">
                
                {/* Ссылка на бронирования */}
                {user && (
                    <NavLink to="/my-booking" className="link--item">
                        <div className="link--content">
                            <BadIcon className="link--icon" />
                            <span>Бронирования</span>
                        </div>
                    </NavLink>
                )}

                {/* Админка */}
                {user?.isAdmin && (
                    <NavLink to="/admin/edit-rooms" className="link--item">
                        <div className="link--content">
                            <BadIcon className="link--icon" />
                            <span>Управление номерами</span>
                        </div>
                    </NavLink>
                )}

                {/* Профиль или Кнопка входа */}
                {user ? (
                    <NavLink to="/profile" className="link--item">
                        <div className="link--content">
                            <ProfileIcon className="link--icon" />
                            <span>{user?.login}</span>
                        </div>
                    </NavLink>
                ) : (
                    <button onClick={OnOpenLogin} className="link--item" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <div className="link--content">
                            <ProfileIcon className="link--icon" />
                            <span>Войти</span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header;