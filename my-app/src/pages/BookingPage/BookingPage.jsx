import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './BookingPage.css';

const BookingPage = () => {
    const [myBookings, setMyBookings] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const data = localStorage.getItem('hotels_data');
        if (data && user) {
            const allRooms = JSON.parse(data);
            const userBookings = [];

            allRooms.forEach(room => {
                room.bookedDates.forEach(booking => {
                    if (booking.userId === user.id) {
                        userBookings.push({
                            ...booking,
                            roomName: room.name,
                            roomImage: room.image, 
                            cost: room.cost,
                            roomId: room.id
                        });
                    }
                });
            });

            setMyBookings(userBookings);
        }
    }, [user]);

    return (
        <div className="bookings-container">
            <h1 className="bookings-title">Мои бронирования</h1>
            
            {myBookings.length > 0 ? (
                <div className="bookings-list">
                    {myBookings.map((booking, index) => (
                        <div key={index} className="booking-card">
                            <div className="booking-info">
                                <h3>{booking.roomName}</h3>
                                <div className="booking-details">
                                    <p><strong>Заезд:</strong> {new Date(booking.start).toLocaleDateString()}</p>
                                    <p><strong>Выезд:</strong> {new Date(booking.end).toLocaleDateString()}</p>
                                    <p><strong>Цена за ночь:</strong> {booking.cost} ₽</p>
                                </div>
                                <div className={`status-badge ${booking.status}`}>
                                    {booking.status === 'pending' ? 'Ожидает подтверждения' : 'Подтверждено'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-bookings">
                    <p>У вас пока нет забронированных номеров.</p>
                </div>
            )}
        </div>
    );
};

export default BookingPage;