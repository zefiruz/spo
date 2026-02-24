import { useAuth } from '../../context/AuthContext';
import './Modal.css';
import { useState } from 'react';

const SignUpModal = ({ onClose }) => {
  const [inputLogin, setinputLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { login, users, setUsers } = useAuth();
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация на пустые поля
    if (!inputLogin || !password) {
        alert("Заполните все поля");
        return;
    }

    const isExistUser = users.some(u => inputLogin === u.login);
    if (isExistUser) {
      alert("Этот логин уже занят");
      return;
    }

    if (confirmPassword !== password) {
      alert("Пароли не совпадают");
      return;
    }

    const newUser = {
      id: Date.now(),
      login: inputLogin,
      password: password,
      isAdmin: false // по умолчанию не админ
    };

    setUsers([...users, newUser]);
    login(newUser);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Регистрация</h2>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <label className='modal-input'>
            <span>Логин</span>
            <input
              value={inputLogin}
              onChange={(e) => setinputLogin(e.target.value)}
              type="text"
              placeholder="Придумайте логин"
            />
          </label>

          {/* Пароль */}
          <label className='modal-input password-input-container'>
            <span>Пароль</span>
            <div className="input-wrapper">
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Пароль"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="password-toggle-btn"
                >
                  {isPasswordVisible ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  )}
                </button>
            </div>
          </label>

          {/* Подтверждение пароля */}
          <label className='modal-input password-input-container'>
            <span>Подтвердите пароль</span>
            <div className="input-wrapper">
                <input 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  placeholder="Повторите пароль"
                />
                <button
                  type="button"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  className="password-toggle-btn"
                >
                  {isConfirmPasswordVisible ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  )}
                </button>
            </div>
          </label>

          <div className="modal-actions">
            <button className="login-btn" type="submit">Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;