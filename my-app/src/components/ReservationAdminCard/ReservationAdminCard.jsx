import useLocalStorage from '../../hooks/useLocalStorage';
import { useBooking } from '../../context/BookingContex';
export const ReservationAdminCard = ({ Reservation }) => {
    // Вызываем хук с ключом "hotels_data" и дефолтным пустым массивом
    const [rooms] = useLocalStorage('hotels_data', []);
    const { cancelBooking, updateBookingStatus } = useBooking();
    const currentRoom = rooms.find(r => r.id === Reservation.roomId);
    const handleApproveStatus = () => {
        updateBookingStatus(Reservation.id, 'approve');
    }
    const handleCancelBooking = () => {
        cancelBooking(Reservation.id);
    }
    return (
        <div
            className='reservation-card__container' style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <div><strong>ID брони:</strong> {Reservation.id}</div>
            <div><strong>Заезд:</strong> {new Date(Reservation.startDate).toLocaleDateString('ru-RU')}</div>
            <div><strong>Отъезд:</strong> {new Date(Reservation.endDate).toLocaleDateString('ru-RU')}</div>
            <div><strong>ID комнаты:</strong> {Reservation.roomId}</div>
            {/* Добавляем проверку, что комната найдена, чтобы не упасть с ошибкой */}
            <div><strong>Название:</strong> {currentRoom ? currentRoom.title : "Комната не найдена"}</div>
            <button onClick={handleApproveStatus}>Принять</button>
            <button onClick={handleCancelBooking}>Отклонить</button>
        </div>
    );
};