import { useState, useRef } from 'react';
import "./SearchCard.css";
import { useBooking } from '../../context/BookingContex';
import { useFilters } from '../../context/FiltersContext';
import RoomDetailsModal from '../Modals/RoomDetailsModal'
const hotelImages = [
    new URL('../../__mocks__/photo1.jpg', import.meta.url).href,
    new URL('../../__mocks__/photo2.jpg', import.meta.url).href,
    new URL('../../__mocks__/photo3.jpg', import.meta.url).href,
];

const SearchCard = ({ room }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { createBooking } = useBooking();
    const { filters } = useFilters();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const timerRef = useRef(null);

    const startSlide = () => {
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev === hotelImages.length - 1 ? 0 : prev + 1));
        }, 1200);
    };

    const stopSlide = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setCurrentIndex(0);
    };
    const handleBooking = () => {
        // setIsDetailsOpen(true);
        createBooking(room.id, filters.startDate, filters.endDate);
    }

    return (
        <div className="hotel-card"
            onMouseEnter={startSlide}
            onMouseLeave={stopSlide}
            onClick={handleBooking}>
            <div className="hotel-card__image-container">
                <img
                    src={hotelImages[currentIndex]}
                    alt={room.title}
                    className="hotel-card__image"
                />
                <div className="hotel-card__type-badge">{room.type}</div>

                <div className="hotel-card__dots">
                    {hotelImages.map((_, i) => (
                        <span key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} />
                    ))}
                </div>
            </div>

            <div className="hotel-card__content">
                <div className="hotel-card__header">
                    <h3 className="hotel-card__title">{room.title}</h3>
                    <div className="hotel-card__rating">★ 4.9</div>
                </div>

                <p className="hotel-card__description">{room.description}</p>

                <div className="hotel-card__details">
                    <span>👥 {room.guestForRoom} гостей</span>
                    <span>🛏️ {room.bedsForRoom} кровати</span>
                </div>

                <div className="hotel-card__params">
                    {Object.values(room.params || {}).map((param, index) => (
                        <span key={index} className="param-tag">{param}</span>
                    ))}
                </div>

                <div className="hotel-card__footer">
                    <div className="hotel-card__price">
                        <span className="price-value">{room.cost.toLocaleString()} ₽</span>
                        <span className="price-period"> / ночь</span>
                    </div>
                    <button className="hotel-card__book-btn">Выбрать</button>
                </div>
            </div>
            <RoomDetailsModal
                room={room}
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
            />
        </div>
    );
};

export default SearchCard;