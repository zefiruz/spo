import useLocalStorage from '../../hooks/useLocalStorage';
import { useBooking } from '../../context/BookingContex';
export const ResevationCard = ({ Reservation }) => {
    // Вызываем хук с ключом "hotels_data" и дефолтным пустым массивом
    const [rooms] = useLocalStorage('hotels_data', []);
    const {cancelBooking} = useBooking();
    // Ищем комнату, соответствующую ID в бронировании
    const currentRoom = rooms.find(r => r.id === Reservation.roomId);

    return (
        <div
        onClick={() => cancelBooking(Reservation.id)}
        className='reservation-card__container' style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <div><strong>ID брони:</strong> {Reservation.id}</div>
            <div><strong>Заезд:</strong> {new Date(Reservation.startDate).toLocaleDateString('ru-RU')}</div>
            <div><strong>Отъезд:</strong> {new Date(Reservation.endDate).toLocaleDateString('ru-RU')}</div>
            <div><strong>ID комнаты:</strong> {Reservation.roomId}</div>
            {/* Добавляем проверку, что комната найдена, чтобы не упасть с ошибкой */}
            <div><strong>Название:</strong> {currentRoom ? currentRoom.title : "Комната не найдена"}</div>
        </div>
    );
};