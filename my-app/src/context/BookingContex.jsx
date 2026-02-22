import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { Reservation } from '../models/Reservation'

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    // Используем твой надежный хук для хранения всех бронирований приложения
    const [allReservations, setAllReservations] = useLocalStorage("reservations", []);
    const { user } = useAuth();

    const getAllReservations = () => allReservations;

    const getRoomReservations = (roomId) => {
        return allReservations.filter(res => res.roomId === roomId);
    };


    const userReservations = useMemo(() => {
        if (!user) return [];
        return allReservations.filter(res => res.userId === user.id);
    }, [allReservations, user]);

    const createBooking = (roomId, startDate, endDate) => {
        if (!user) {
            alert("Необходимо войти в систему");
            return false;
        }

        const newBooking = new Reservation(
            Date.now(),
            user.id,
            startDate,
            endDate,
            roomId,
        )

        setAllReservations([...allReservations, newBooking]);
        return true;
    };

    const cancelBooking = (bookingId) => {
        setAllReservations(allReservations.filter(res => res.id !== bookingId));
    };

    const updateBookingStatus = (bookingId, newStatus) => {
        setAllReservations(prevReservations =>
            prevReservations.map(res =>
                res.id === bookingId
                    ? { ...res, status: newStatus } // Создаем новый объект с измененным статусом
                    : res // Остальные оставляем как есть
            )
        );
    };

    const value = {
        allReservations,
        userReservations,
        getRoomReservations,
        getAllReservations,
        createBooking,
        cancelBooking,
        updateBookingStatus
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};