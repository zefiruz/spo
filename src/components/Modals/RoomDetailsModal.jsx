import React from 'react';
import './RoomDetailsModal.css';

const RoomDetailsModal = ({ room, isOpen, onClose }) => {
    if (!isOpen || !room) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content room-details-card" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="room-details-body">
                    <div className="room-details-image">
                        <div className="placeholder-img">Фото номера</div>
                    </div>

                    <div className="room-details-info">
                        <div className="room-type-badge">{room.type}</div>
                        <h2>{room.title}</h2>
                        <p className="room-description">{room.description || "Описание отсутствует."}</p>

                        <div className="room-stats-grid">
                            <div className="stat-item">
                                <strong>Гостей:</strong> {room.guestForRoom}
                            </div>
                            <div className="stat-item">
                                <strong>Кроватей:</strong> {room.bedForRoom}
                            </div>
                            <div className="stat-item">
                                <strong>Цена:</strong> {room.cost} ₽ / ночь
                            </div>
                        </div>

                        <div className="room-params-list">
                            <h3>Удобства:</h3>
                            <div className="params-tags">
                                {room.params && room.params.length > 0 ? (
                                    room.params.map((param, index) => (
                                        <span key={index} className="param-tag">{param}</span>
                                    ))
                                ) : (
                                    <span>Удобства не указаны</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="secondary-btn" onClick={onClose}>Закрыть</button>
                    <button className="primary-btn" onClick={() => {
                        alert('Переход к бронированию...');
                        onClose();
                    }}>
                        Забронировать за {room.cost} ₽
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailsModal;