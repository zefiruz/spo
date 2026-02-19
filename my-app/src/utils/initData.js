import Reservation from '../models/reservation';

const initialRooms = [
    new Reservation(
        1,
        "Люкс с видом на море",
        "Просторный номер с панорамными окнами",
        "Deluxe",
        15000,
        5, 2, 2,
                {
            1: "codei"
        },
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
    ),
    new Reservation(
        2,
        "Стандартный двухместный",
        "Уютный номер для двоих",
        "Standard",
        5000,
        10, 1, 2,
        {
            1: "codei"
        },
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
    ),
    new Reservation(
        3,
        "Семейный номер",
        "Две комнаты и детская кровать",
        "Family",
        8000,
        3, 3, 4,{
            1: "codei",
            2: "minibar",
            3: "wifi"
        },
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
    )
];


export const initLocalStorage = () => {
    if (!localStorage.getItem('hotels_data')) {
        localStorage.setItem('hotels_data', JSON.stringify(initialRooms));
    }
}