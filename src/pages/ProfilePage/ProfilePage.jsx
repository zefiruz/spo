import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContex';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react'; 
import './ProfilePage.css';
import ProfileIcon from '../../lib/icons/account_circle.svg';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const { userReservations } = useBooking(); // Получаем бронирования пользователя
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', middleName: '', phone: '', email: ''
    });

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
    };

    const handleSave = () => {
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
                        <div className="info-item">
                            <label>Телефон</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+7 (___) ___-__-__" />
                        </div>
                        <div className="info-item full-width">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                    </div>
                    
                    <button className="save-profile-btn" onClick={handleSave}>Сохранить изменения</button>
                    {showToast && <div className="toast-success">Данные успешно сохранены!</div>}

                    <div className="stats-section">
                        <h3>Статистика</h3>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-value">{stats.total}</span>
                                <span className="stat-label">Всего броней</span>
                            </div>
                            <div className="stat-card confirmed">
                                <span className="stat-value">{stats.confirmed}</span>
                                <span className="stat-label">Подтверждено</span>
                            </div>
                            <div className="stat-card cancelled">
                                <span className="stat-value">{stats.cancelled}</span>
                                <span className="stat-label">Отменено</span>
                            </div>
                            <div className="stat-card finished">
                                <span className="stat-value">{stats.finished}</span>
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