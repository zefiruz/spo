import useLocalStorage from '../../hooks/useLocalStorage';
import { useBooking } from '../../context/BookingContex';
import './ReservationCard.css';
export const ResevationCard = ({ Reservation }) => {
    const [rooms] = useLocalStorage('hotels_data', []);
    const { cancelBooking } = useBooking();
    const currentRoom = rooms.find(r => r.id === Reservation.roomId);

    // Объект для перевода статусов
    const statusMap = {
        'pending': { label: 'В обработке', color: '#f39c12' },
        'confirm': { label: 'Подтверждено', color: '#27ae60' },
        'cancelled': { label: 'Отменено', color: '#e74c3c' } // на всякий случай
    };

    const currentStatus = statusMap[Reservation.status] || { label: Reservation.status, color: '#95a5a6' };

    return (
        <div
            className='reservation-card__container'
            onClick={() => {
                // Предотвращаем отмену, если уже отменено
                if (Reservation.status === 'canceling' || Reservation.status === 'cancelled') return;

                if(window.confirm("Отменить это бронирование?")) {
                    cancelBooking(Reservation.id)
                }
            }}
        >
            <div className="status-badge" style={{ backgroundColor: currentStatus.color }}>
                {currentStatus.label}
            </div>

            <div className="res-row"><strong>ID брони:</strong> <span>{Reservation.id}</span></div>
            <div className="res-row"><strong>Заезд:</strong> <span>{new Date(Reservation.startDate).toLocaleDateString('ru-RU')}</span></div>
            <div className="res-row"><strong>Отъезд:</strong> <span>{new Date(Reservation.endDate).toLocaleDateString('ru-RU')}</span></div>
            <div className="res-row"><strong>ID комнаты:</strong> <span>{Reservation.roomId}</span></div>
            <div className="res-row title-row"><strong>Название:</strong> <span>{currentRoom ? currentRoom.title : "Комната не найдена"}</span></div>

            {Reservation.status !== 'canceling' && Reservation.status !== 'cancelled' && (
                <div className="cancel-hint">Нажмите, чтобы отменить</div>
            )}
        </div>
    );
};