import useLocalStorage from '../../hooks/useLocalStorage';
import { useBooking } from '../../context/BookingContex';
import 'ReservationCard.css';
export const ResevationCard = ({ Reservation }) => {
    // Вызываем хук с ключом "hotels_data" и дефолтным пустым массивом
    const [rooms] = useLocalStorage('hotels_data', []);
    const {cancelBooking} = useBooking();
    // Ищем комнату, соответствующую ID в бронировании
    const currentRoom = rooms.find(r => r.id === Reservation.roomId);

    return (
        <div
            className='reservation-card__container'
            onClick={() => {
                if(window.confirm("Отменить это бронирование?")) {
                    cancelBooking(Reservation.id)
                }
            }}
        >
            <div className="res-row"><strong>ID брони:</strong> <span>{Reservation.id}</span></div>
            <div className="res-row"><strong>Заезд:</strong> <span>{new Date(Reservation.startDate).toLocaleDateString('ru-RU')}</span></div>
            <div className="res-row"><strong>Отъезд:</strong> <span>{new Date(Reservation.endDate).toLocaleDateString('ru-RU')}</span></div>
            <div className="res-row"><strong>ID комнаты:</strong> <span>{Reservation.roomId}</span></div>
            <div className="res-row title-row"><strong>Название:</strong> <span>{currentRoom ? currentRoom.title : "Комната не найдена"}</span></div>
            
            <div className="cancel-hint">Нажмите, чтобы отменить</div>
        </div>
    );
};