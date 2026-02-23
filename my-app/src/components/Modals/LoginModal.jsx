import { useAuth } from '../../context/AuthContext'
import './Modal.css'
import { useState } from 'react';


const LoginModal = ({ onClose, OnOpenSignUp }) => {
  const {users, login } = useAuth();
  const [inputLogin, setInputLogin] = useState();
  const [password, setPassword] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlelogin = (e) => {
    e.preventDefault();
    const user = users.find(u => inputLogin === u.login);
    if (user && user.password === password) {
      login(user);
      onClose();
      return
    }
    alert("Неверный логин или пароль")
  }
  const handleInputLoginChange = (e) => {
    setInputLogin(e.target.value)
  }
  const handlePasswordChange = (e) => { setPassword(e.target.value) }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Вход</h2>
        <label className='modal-input'>
        <span>Логин</span>
        <input
          value={inputLogin}
          onChange={handleInputLoginChange}
          type="text"
          placeholder="Логин"
        />
        </label>
        <label  className='modal-input'>
          <span>Пароль</span>
        <input value={password}
          onChange={handlePasswordChange}
          type={isPasswordVisible ? ("text") : ("password")}
          placeholder="Пароль"
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="password-toggle-btn"
        >
          {isPasswordVisible ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>)}
        </button>
        </label>

        <button  className="login-btn" type="submit" onClick={handlelogin}>Войти</button>
        <button className="sighup-btn" onClick={OnOpenSignUp}>Зарегистрироваться</button>
      </div>
    </div>
  );
}

export default LoginModal;