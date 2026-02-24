import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContex';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import './ProfilePage.css';
import ProfileIcon from '../../lib/icons/account_circle.svg';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const { userReservations } = useBooking();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', middleName: '', phone: '', email: ''
    });

    // Состояние для ошибок валидации
    const [errors, setErrors] = useState({
        email: '',
        phone: ''
    });

    // Регулярные выражения для проверки
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const validatePhone = (phone) => {
        // Простая проверка: должен начинаться с + или цифры и содержать от 10 до 15 символов
        return String(phone).match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?([0-9]{3})[\s\-]?([0-9]{2})[\s\-]?([0-9]{2})$/);
    };

    const stats = useMemo(() => {
        if (!userReservations) return { total: 0, confirmed: 0, cancelled: 0, finished: 0 };
        return {
            total: userReservations.length,
            confirmed: userReservations.filter(r => r.status === 'confirmed').length,
            cancelled: userReservations.filter(r => r.status === 'cancelled').length,
            finished: userReservations.filter(r => r.status === 'finished').length,
        };
    }, [userReservations]);

    useEffect(() => {
        if (user) {
            const savedData = localStorage.getItem(`profile_data_${user.login}`);
            if (savedData) {
                setFormData(JSON.parse(savedData));
            } else {
                setFormData(prev => ({ ...prev, email: user.email || user.login || '' }));
            }
        } else {
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Сбрасываем ошибку при вводе
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSave = () => {
        let tempErrors = { email: '', phone: '' };
        let isValid = true;

        if (formData.email && !validateEmail(formData.email)) {
            tempErrors.email = 'Некорректный формат email';
            isValid = false;
        }

        if (formData.phone && !validatePhone(formData.phone)) {
            tempErrors.phone = 'Неверный формат телефона (нужно 11 цифр)';
            isValid = false;
        }

        if (!isValid) {
            setErrors(tempErrors);
            return; // Прерываем сохранение
        }

        localStorage.setItem(`profile_data_${user.login}`, JSON.stringify(formData));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (!user) return null;

    return (
        <div className="profile-container centered-page">
            <div className="profile-card">
                <div className="profile-sidebar">
                    <div className="avatar-wrapper">
                        <img src={user.photoURL || ProfileIcon} className="profile-avatar" alt="Avatar" />
                    </div>
                    <h2 className="profile-display-name">{user.login || "Путешественник"}</h2>
                    <button className="logout-btn" onClick={logout}>Выйти из аккаунта</button>
                </div>

                <div className="profile-main">
                    <h3>Контактная информация</h3>
                    <div className="info-grid">
                        {/* Поля Имя, Фамилия, Отчество остаются без изменений */}
                        <div className="info-item">
                            <label>Имя</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Ваше имя" />
                        </div>
                        <div className="info-item">
                            <label>Фамилия</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Ваша фамилия" />
                        </div>
                        <div className="info-item">
                            <label>Отчество</label>
                            <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Ваше отчество" />
                        </div>

                        {/* Поле Телефона с ошибкой */}
                        <div className="info-item">
                            <label>Телефон</label>
                            <input
                                type="tel"
                                name="phone"
                                className={errors.phone ? 'input-error' : ''}
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+7 (999) 000-00-00"
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                        {/* Поле Email с ошибкой */}
                        <div className="info-item full-width">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className={errors.email ? 'input-error' : ''}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>
                    </div>

                    <button className="save-profile-btn" onClick={handleSave}>Сохранить изменения</button>
                    {showToast && <div className="toast-success">Данные успешно сохранены!</div>}

                    {/* Секция статистики остается без изменений */}
                    <div className="stats-section">
                        {/* ... код статистики ... */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;