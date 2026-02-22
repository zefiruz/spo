import { useBooking } from '../../context/BookingContex';
import { ResevationCard } from '../../components/ReservationCard/ReservationCard';
import { ReservationAdminCard } from '../../components/ReservationAdminCard/ReservationAdminCard';
import { useAuth } from '../../context/AuthContext';

const BookingPage = () => {
    const { userReservations, allReservations } = useBooking();
    const { user } = useAuth();

    const reservationsToShow = user?.isAdmin ? allReservations : userReservations;

    return (
        <div className="booking-page">
            <h2>{user?.isAdmin ? "Панель администратора: Все бронирования" : "Мои бронирования"}</h2>

            {reservationsToShow && reservationsToShow.length > 0 ? (
                reservationsToShow.map((element) => (
                    user.isAdmin ? (
                        <ReservationAdminCard key={element.id} Reservation={element} />
                    ) : (
                        <ResevationCard key={element.id} Reservation={element} />
                    )
                ))
            ) : (
                <p>Бронирований пока нет.</p>
            )}
        </div>
    );
}

export default BookingPage;