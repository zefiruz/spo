import useLocalStorage from '../../hooks/useLocalStorage';
import { useBooking } from '../../context/BookingContex';
import { useMemo } from 'react';


import './ReservationAdminCard.css';

export const ReservationAdminCard = ({ Reservation }) => {
    const [rooms] = useLocalStorage('hotels_data', []);
    const { updateBookingStatus } = useBooking();

    // Ищем комнату
    const currentRoom = rooms.find(r => r.id === Reservation.roomId);

    // Ищем данные пользователя в localStorage
    const clientData = useMemo(() => {
        const savedData = localStorage.getItem(`profile_data_${Reservation.userId}`);
        return savedData ? JSON.parse(savedData) : null;
    }, [Reservation.userId]);

    const handleApproveStatus = () => { updateBookingStatus(Reservation.id, 'confirm') };
    const handleCancelBooking = () => {
        if (window.confirm("Отклонить это бронирование?")) {
            updateBookingStatus(Reservation.id, 'cancelled');
        }
    };

    return (
        <div className='reservation-admin-card__container'>
            <div className={`admin-status-badge status-${Reservation.status}`}>
                {Reservation.status === 'confirm' ? 'Подтверждено' :
                    Reservation.status === 'cancelled' ? 'Отменено' : 'Ожидает'}
            </div>

            <div className="admin-card-title">
                {currentRoom ? currentRoom.title : "Комната не найдена"}
            </div>

            {/* НОВЫЙ БЛОК: Информация о клиенте */}
            <div className="admin-client-info">
                <div className="client-header">Данные клиента</div>
                {clientData ? (
                    <div className="client-details">
                        {(clientData.lastName || clientData.firstName || clientData.middleName) && (
                            <p><strong>ФИО:</strong> {`${clientData.lastName} ${clientData.firstName} ${clientData.middleName || ''}`}</p>
                        )}
                        {clientData.email && (<p><strong>Email:</strong> {clientData.email}</p>)}
                        {clientData.phone && (<p><strong>Телефон:</strong> {clientData.phone}</p>)}
                    </div>
                ) : (
                    <div className="client-no-data">Профиль не заполнен (ID: {Reservation.userId})</div>
                )}
            </div>

            <div className="res-admin-info">
                <div><strong>ID Бронирования</strong> {Reservation.id}</div>
                <div><strong>Даты</strong> {new Date(Reservation.startDate).toLocaleDateString()} — {new Date(Reservation.endDate).toLocaleDateString()}</div>
            </div>

            <div className="admin-actions">
                {Reservation.status === 'pending' && (
                    <>
                        <button className="btn-approve" onClick={handleApproveStatus}>Принять</button>
                        <button className="btn-reject" onClick={handleCancelBooking}>Отклонить</button>
                    </>
                )}
                {Reservation.status !== 'pending' && (
                    <div className="admin-decision-made">Решение принято</div>
                )}
            </div>
        </div>
    );
};