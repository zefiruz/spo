import { useState, useEffect } from 'react';

const useRooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('hotels_data');
        if (data) {
            setRooms(JSON.parse(data));
        }
    }, []);

    /**
     * @param {Object} filters - Объект с фильтрами
     * {
     * startDate: 'YYYY-MM-DD',
     * endDate: 'YYYY-MM-DD',
     * minPrice: number,
     * maxPrice: number,
     * type: string,
     * guests: number
     * }
     */
    const getFilteredRooms = (filters = {}) => {
        return rooms.filter(room => {
            // 1. Фильтр по цене
            if (filters.minPrice && room.cost < filters.minPrice) return false;
            if (filters.maxPrice && room.cost > filters.maxPrice) return false;

            // 2. Фильтр по гостям
            if (filters.guests && room.guestForRoom < filters.guests) return false;

            // 3. Фильтр по ПАРАМЕТРАМ (params)
            // filters.params — это массив строк, например ["wifi", "minibar"]
            if (filters.params && filters.params.length > 0) {
                const roomParamsValues = Object.values(room.params); // получаем ["codei", "wifi"...]

                // Проверяем, что КАЖДАЯ строка из фильтра есть в параметрах комнаты
                const hasAllParams = filters.params.every(param =>
                    roomParamsValues.includes(param)
                );

                if (!hasAllParams) return false;
            }

            // 4. Фильтр по датам
            if (filters.startDate && filters.endDate) {
                const reqStart = new Date(filters.startDate);
                const reqEnd = new Date(filters.endDate);

                const hasOverlap = room.bookedDates.some(booking => {
                    if (booking.status === 'cancelled') return false;
                    const bStart = new Date(booking.start);
                    const bEnd = new Date(booking.end);
                    return reqStart < bEnd && reqEnd > bStart;
                });

                if (hasOverlap) return false;
            }

            return true;
        });
    };

    const bookRoom = (roomId, startDate, endDate, userId) => {
        const updatedRooms = rooms.map(room => {
            if (room.id === roomId) {
                const newBooking = {
                    start: startDate,
                    end: endDate,
                    userId: userId,
                    status: 'pending'
                };
                return { ...room, bookedDates: [...room.bookedDates, newBooking] };
            }
            return room;
        });

        setRooms(updatedRooms);
        localStorage.setItem('hotels_data', JSON.stringify(updatedRooms));
    };

    return { rooms, bookRoom, getFilteredRooms };
};

export default useRooms;