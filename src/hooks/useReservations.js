import { useState, useEffect } from 'react';
import { useFilters } from '../context/FiltersContext';
import { useBooking } from '../context/BookingContex';

const useReservations = () => {
    const [rooms, setRooms] = useState([]);
    const { filters } = useFilters();
    const {allReservations, createBooking} = useBooking();

    useEffect(() => {
        const data = localStorage.getItem('hotels_data');
        if (data) {
            setRooms(JSON.parse(data));
        }
    }, []);


    const getFilteredRooms = () => {
        return rooms.filter(room => {
            // 1. Фильтр по цене
            if (filters.minPrice && room.cost < filters.minPrice) return false;
            if (filters.maxPrice && room.cost > filters.maxPrice) return false;

            // 2. Фильтр по гостям
            if (filters.guests && room.guestForRoom < filters.guests) return false;

            // 3. Фильтр по удобствам (params)
            if (filters.params && filters.params.length > 0) {
                const roomParamsValues = Object.values(room.params);
                const hasAllParams = filters.params.every(param =>
                    roomParamsValues.includes(param)
                );
                if (!hasAllParams) return false;
            }

            // 4. Фильтр по датам (Проверка занятости через внешний массив броней)
            if (filters.startDate && filters.endDate) {
                const reqStart = new Date(filters.startDate);
                const reqEnd = new Date(filters.endDate);

                // Ищем пересечения в глобальном списке бронирований для этой комнаты
                const hasOverlap = allReservations.some(booking => {
                    // Пропускаем отмененные брони
                    if (booking.status === 'cancelled') return false;
                    // Проверяем только для текущей комнаты
                    if (booking.roomId !== room.id) return false;

                    const bStart = new Date(booking.startDate);
                    const bEnd = new Date(booking.endDate);

                    // Формула пересечения интервалов
                    return reqStart < bEnd && reqEnd > bStart;
                });

                if (hasOverlap) return false;
            }

            return true;
        });
    };

    return { rooms, getFilteredRooms };
};

export default useReservations;