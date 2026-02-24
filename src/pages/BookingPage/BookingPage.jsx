import React, { useState, useMemo } from 'react';
import { useBooking } from '../../context/BookingContex';
import { ResevationCard } from '../../components/ReservationCard/ReservationCard';
import { ReservationAdminCard } from '../../components/ReservationAdminCard/ReservationAdminCard';
import { useAuth } from '../../context/AuthContext';

import './BookingPage.css'
const BookingPage = () => {
    const { userReservations, allReservations } = useBooking();
    const { user } = useAuth();

    // Состояния фильтрации для админа
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchId, setSearchId] = useState('');

    // Вычисляем, что показывать
    const filteredReservations = useMemo(() => {
        let list = user?.isAdmin ? allReservations : userReservations;

        if (user?.isAdmin) {
            // Фильтр по статусу
            if (statusFilter !== 'all') {
                list = list.filter(res => res.status === statusFilter);
            }
            // Поиск по ID брони или ID комнаты
            if (searchId) {
                list = list.filter(res =>
                    res.id.toString().includes(searchId) ||
                    res.roomId.toString().includes(searchId)
                );
            }
        }
        return list;
    }, [user, allReservations, userReservations, statusFilter, searchId]);

    return (
        <div className="booking-page centered-page">
            <h2>{user?.isAdmin ? "Панель администратора: Все бронирования" : "Мои бронирования"}</h2>

            {/* Блок фильтров только для админа */}
            {user?.isAdmin && (
                <div className="admin-booking-filters">
                    <div className="filter-group">
                        <label>Статус:</label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">Все</option>
                            <option value="pending">В обработке</option>
                            <option value="confirm">Подтвержденные</option>
                            <option value="cancelled">Отмененные</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <input
                            type="text"
                            placeholder="Поиск по ID брони или комнаты..."
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                    </div>
                    <div className="admin-booking-stats">
                        Найдено: <strong>{filteredReservations.length}</strong>
                    </div>
                </div>
            )}

            {filteredReservations && filteredReservations.length > 0 ? (
                <div className="reservations-list">
                    {filteredReservations.map((element) => (
                        user.isAdmin ? (
                            <ReservationAdminCard key={element.id} Reservation={element} />
                        ) : (
                            <ResevationCard key={element.id} Reservation={element} />
                        )
                    ))}
                </div>
            ) : (
                <div className="no-bookings">
                    <p>{searchId || statusFilter !== 'all' ? "Бронирований с такими параметрами не найдено" : "Бронирований пока нет."}</p>
                </div>
            )}
        </div>
    );
}

export default BookingPage;