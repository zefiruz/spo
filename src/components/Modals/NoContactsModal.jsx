import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import './Modal.css';
import { useAuth } from '../../context/AuthContext';

const NoContactsModal = ({ noContactsOpen, onClose }) => {
    const navigate = useNavigate();
    const { openLogin } = useModal();
    const {user} = useAuth();

    if (!noContactsOpen) return null;

    const currentRole = user ? (user.isAdmin ? 'admin' : 'user') : 'guest';

    const handleGoToLogin = () => {
        onClose();
        openLogin();
    }

    const handleGoToProfile = () => {
        onClose();
        navigate('/profile');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content warning-modal" onClick={(e) => e.stopPropagation()}>
                <div className="warning-icon">⚠️</div>
                {currentRole == 'guest' && (
                    <div>
                        <h2>Не выполнен вход в систему</h2>
                        <p>
                            Чтобы забронировать этот номер, вам необходимо авторизоваться.

                        </p>
                        <div className="warning-modal__actions">
                            <button className="secondary-btn" onClick={onClose}>Отмена</button>
                            <button className="primary-btn" onClick={handleGoToLogin}>
                                Авторизоваться
                            </button>
                        </div>
                    </div>
                )
                }
                { currentRole == 'user' && (
                    <div>
                        <h2>Контактные данные не заполнены</h2>
                        <p>
                            Чтобы забронировать этот номер, нам необходимо иметь ваши контактные данные.
                            Пожалуйста, укажите <strong>номер телефона</strong> или <strong>email</strong> в личном кабинете.
                        </p>

                        <div className="warning-modal__actions">
                            <button className="secondary-btn" onClick={onClose}>Отмена</button>
                            <button className="primary-btn" onClick={handleGoToProfile}>
                                Перейти в профиль
                            </button>
                        </div>
                    </div>
                )}
                { currentRole == 'admin' && (
                    <div>
                        <h2>Невозможная операция</h2>
                        <p>
                            Эта операция недоступна для роли <strong>{currentRole}</strong>
                        </p>

                        <div className="warning-modal__actions">
                            <button className="secondary-btn" onClick={onClose}>Отмена</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default NoContactsModal;