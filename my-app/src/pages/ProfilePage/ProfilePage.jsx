import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProfilePage.css';
import ProfileIcon from '../../lib/icons/account_circle.svg';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // 1. Создаем состояние для полей формы
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: ''
    });

    // 2. Загружаем данные из localStorage при загрузке страницы
    useEffect(() => {
        if (user) {
            const savedData = localStorage.getItem(`profile_data_${user.login}`);
            if (savedData) {
                setFormData(JSON.parse(savedData));
            }
        } else {
            navigate('/');
        }
    }, [user, navigate]);

    // 3. Обработчик изменения инпутов
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 4. Функция сохранения
    const handleSave = () => {
        localStorage.setItem(`profile_data_${user.login}`, JSON.stringify(formData));
        alert('Данные успешно сохранены!');
    };

    if (!user) return null;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-sidebar">
                    <div className="avatar-wrapper">
                        <img 
                            src={user.photoURL || ProfileIcon} 
                            className="profile-avatar"
                            alt="Avatar"
                        />
                    </div>
                    <h2 className="profile-display-name">{user.login || "Путешественник"}</h2>
                    <button className="logout-btn" onClick={logout}>Выйти из аккаунта</button>
                </div>

                <div className="profile-main">
                    <h3>Контактная информация</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Имя</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Ваше имя" 
                            />
                        </div>
                        <div className="info-item">
                            <label>Фамилия</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Ваша фамилия" 
                            />
                        </div>
                        <div className="info-item">
                            <label>Отчество</label>
                            <input 
                                type="text" 
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                placeholder="Ваше отчество" 
                            />
                        </div>
                        <div className="info-item">
                            <label>Телефон</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+7 (___) ___-__-__" 
                            />
                        </div>
                        <div className="info-item full-width">
                            <label>Email</label>
                            <input type="email" value={user.email || user.login} readOnly className="readonly-input" />
                            <small>Email используется для входа и не может быть изменен</small>
                        </div>
                    </div>
                    <button className="save-profile-btn" onClick={handleSave}>
                        Сохранить изменения
                    </button>

                    {/* Секция статистики */}
                    <div className="stats-section">
                        <h3>Статистика</h3>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-value">12</span>
                                <span className="stat-label">Всего броней</span>
                            </div>
                            <div className="stat-card confirmed">
                                <span className="stat-value">8</span>
                                <span className="stat-label">Подтверждено</span>
                            </div>
                            <div className="stat-card cancelled">
                                <span className="stat-value">1</span>
                                <span className="stat-label">Отменено</span>
                            </div>
                            <div className="stat-card finished">
                                <span className="stat-value">3</span>
                                <span className="stat-label">Завершено</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;