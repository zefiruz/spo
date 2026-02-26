import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const NoContactsModal = ({ noContactsOpen, onClose }) => {
    const navigate = useNavigate();

    if (!noContactsOpen) return null;

    const handleGoToProfile = () => {
        onClose();
        navigate('/profile');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content warning-modal" onClick={(e) => e.stopPropagation()}>
                <div className="warning-icon">⚠️</div>
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
        </div>
    );
};

export default NoContactsModal;