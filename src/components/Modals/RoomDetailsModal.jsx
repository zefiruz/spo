import React, { useState } from 'react';
import './RoomDetailsModal.css';
import { useFilters } from '../../context/FiltersContext';
import { useBooking } from '../../context/BookingContex';

const hotelImages = [
    new URL('../../__mocks__/photo1.jpg', import.meta.url).href,
    new URL('../../__mocks__/photo2.jpg', import.meta.url).href,
    new URL('../../__mocks__/photo3.jpg', import.meta.url).href,
];

const RoomDetailsModal = ({ room, isOpen, onClose }) => {
    const { filters, updateFilters } = useFilters();
    const { createBooking } = useBooking();
    const [indexImage, setIndexImage] = useState(0)
    const [tempindexImage, setTempIndexImage] = useState(0)
    if (!isOpen || !room) return null;

    const calculateDaysBetween = (startDate, endDate) => {
        // Превращаем входные данные в объекты Date, если они еще не ими являются
        const start = new Date(startDate);
        const end = new Date(endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const diffInMs = end - start;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return Math.abs(diffInDays);
    };

    const countPrice = () => {
        return calculateDaysBetween(filters.startDate, filters.endDate) * room.cost;
    }

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`; // Формат YYYY-MM-DD
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <div className="room-details__images-container">
                    <div className="images-container__main-img">
                        <img src={hotelImages[tempindexImage]}></img>
                    </div>
                    <div className='room-details__small-images-container'>
                        {hotelImages?.map((img, index) => (
                            <img
                                onMouseEnter={() => { setTempIndexImage(index) }}
                                onMouseLeave={() => setTempIndexImage(indexImage)}
                                onClick={() => setIndexImage(index)}
                                key={index}
                                src={img}
                                alt={`Фото отеля ${index + 1}`}
                                className={index == indexImage ? "img__item selected-img" : "img__item"}
                            />
                        ))}
                    </div>
                </div>
                <div className="room-details__content-container">
                    <h2>{room.title}</h2>
                    <div className="description-wrapper">
                        <div className="room-details__desc-container">
                            <p>{room.description}</p>
                        </div>
                    </div>
                    <div className="hotel-card__params">
                        {Object.values(room.params || {}).map((param, index) => (
                            <span key={index} className="param-tag">{param}</span>
                        ))}
                    </div>
                    <div className='room-detels__date-seletor'>
                        <div className="dual-input">
                            <input
                                type="date"
                                value={formatDate(filters.startDate)}
                                max={filters.endDate ? formatDate(filters.endDate) : undefined}
                                onChange={(e) => updateFilters({ startDate: new Date(e.target.value) })}
                            />
                            <div className="dual-input__divider"></div>
                            <input
                                type="date"
                                value={formatDate(filters.endDate)}
                                min={filters.startDate ? formatDate(filters.startDate) : undefined}
                                onChange={(e) => updateFilters({ endDate: new Date(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="room-details__buy-section">
                        <div className='buy-section__cost'>{countPrice()} ₽</div>
                        <button className="hotel-card__book-btn" onClick={() => { createBooking(room.id); onClose(); }}>Выбрать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailsModal;