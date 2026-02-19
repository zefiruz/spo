import SearchCard from "../components/SearchCard/SearchCard";
import Reservation from '../models/reservation';
import useRooms from '../hooks/useReservations'

import { useState } from "react";


const SearchPage = () => {
    const [filters, setFilters] = useState({});
    const { getFilteredRooms } = useRooms();


// const searchFilters = {
//     startDate: "2026-06-05",
//     endDate: "2026-06-12",
//     minPrice: 3000,
//     maxPrice: 20000,
//     guests: 2
// };

const availableRooms = getFilteredRooms();
    const room = new Reservation(
            3,
            "Семейный номер",
            "Две комнаты и детская кровать",
            "Family",
            8000,
            3, 3, 4,
            [
            {
                start: "2026-06-01",
                end: "2026-06-10",
                userId: "user_123",
                status: "confirmed"
            },
            {
                start: "2026-07-15",
                end: "2026-07-20",
                userId: "user_456",
                status: "pending"
            }
        ]
        );
    return(<div>
        SeachPage
        {availableRooms.map(room => (
            <SearchCard key={room.id} room={room} />
        ))}
    </div>
    )
}

export default SearchPage;