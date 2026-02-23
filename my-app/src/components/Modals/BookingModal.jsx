import React from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, room, onConfirm }) => {
    if (!isOpen || !room) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="modal-body">
                    {/* Левая часть: Информация */}
                    <div className="modal-info">
                        <h2 className="modal-title">{room.title}</h2>
                        <p className="modal-description">{room.description}</p>
                        
                        <div className="modal-footer">
                            <div className="modal-price">
                                <span>{room.cost.toLocaleString()} ₽</span> / ночь
                            </div>
                            <button className="confirm-btn" onClick={() => onConfirm(room)}>
                                Забронировать
                            </button>
                        </div>
                    </div>

                    {/* Правая часть: Картинка */}
                    <div className="modal-gallery">
                        <img src="../../__mocks__/photo1.jpg" alt={room.title} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;