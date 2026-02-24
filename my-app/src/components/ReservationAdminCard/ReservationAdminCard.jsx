import useLocalStorage from '../../hooks/useLocalStorage';
import { useBooking } from '../../context/BookingContex';


import './ReservationAdminCard.css';

export const ReservationAdminCard = ({ Reservation }) => {
    const [rooms] = useLocalStorage('hotels_data', []);
    const { cancelBooking, updateBookingStatus } = useBooking();
    const currentRoom = rooms.find(r => r.id === Reservation.roomId);

    const handleApproveStatus = () => updateBookingStatus(Reservation.id, 'confirm');
    const handleCancelBooking = () => {
        if(window.confirm("Отклонить это бронирование?")) {
            updateBookingStatus(Reservation.id, 'cancelled');
        }
    };

    return (
        <div className='reservation-admin-card__container'>
            <div className="admin-status-badge">{Reservation.status}</div>

            <div className="admin-card-title">
                {currentRoom ? currentRoom.title : "Комната не найдена"}
            </div>

            <div className="res-admin-info">
                <div><strong>ID Бронирования</strong> {Reservation.id}</div>
                <div><strong>ID Комнаты</strong> {Reservation.roomId}</div>
                <div><strong>Дата заезда</strong> {new Date(Reservation.startDate).toLocaleDateString('ru-RU')}</div>
                <div><strong>Дата выезда</strong> {new Date(Reservation.endDate).toLocaleDateString('ru-RU')}</div>
            </div>

            <div className="admin-actions">
                {Reservation.status === 'pending' && (
                    <>
                        <button className="btn-approve" onClick={handleApproveStatus}>Принять</button>
                        <button className="btn-reject" onClick={handleCancelBooking}>Отклонить</button>
                    </>
                )}
                {Reservation.status !== 'pending' && (
                    <div style={{color: '#999', fontSize: '13px', textAlign: 'center', width: '100%'}}>
                        Решение принято
                    </div>
                )}
            </div>
        </div>
    );
};