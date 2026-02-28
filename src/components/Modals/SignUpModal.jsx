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

  // Состояние для ошибок
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Валидация логина
    if (inputLogin.length < 3) {
      newErrors.login = "Логин должен быть не короче 3 символов";
    } else if (/\s/.test(inputLogin)) {
      newErrors.login = "Логин не может содержать пробелы";
    } else if (users.some(u => u.login === inputLogin)) {
      newErrors.login = "Этот логин уже занят";
    }

    // Валидация пароля
    if (password.length < 6) {
      newErrors.password = "Пароль должен быть не короче 6 символов";
    }

    // Проверка совпадения
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Если валидация не прошла — выходим
    if (!validate()) return;

    const newUser = {
      id: Date.now(),
      login: inputLogin,
      password: password,
      isAdmin: false
    };

    setUsers([...users, newUser]);
    login(newUser);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content middle-width-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Регистрация</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Логин */}
          <label className={`modal-input ${errors.login ? 'has-error' : ''}`}>
            <span>Логин</span>
            <input
              value={inputLogin}
              onChange={(e) => {
                setinputLogin(e.target.value);
                if (errors.login) setErrors(prev => ({ ...prev, login: '' }));
              }}
              type="text"
              placeholder="Придумайте логин"
            />
            {errors.login && <span className="error-message">{errors.login}</span>}
          </label>

          {/* Пароль */}
          <label className={`modal-input password-input-container ${errors.password ? 'has-error' : ''}`}>
            <span>Пароль</span>
            <div className="input-wrapper">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Минимум 6 символов"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="password-toggle-btn"
              >
                {/* Иконки глаза */}
                {isPasswordVisible ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </label>

          {/* Подтверждение пароля */}
          <label className={`modal-input password-input-container ${errors.confirmPassword ? 'has-error' : ''}`}>
            <span>Подтвердите пароль</span>
            <div className="input-wrapper">
              <input
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                }}
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Повторите пароль"
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className="password-toggle-btn"
              >
                {/* Иконки глаза */}
                {isConfirmPasswordVisible ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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