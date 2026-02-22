import Reservation from '../models/Room';

const initialRooms = [
    new Reservation(
        1,
        "Люкс с видом на море",
        "Просторный номер с панорамными окнами",
        "Deluxe",
        15000,
        2, 2,
                {
            1: "codei"
        }
    ),
    new Reservation(
        2,
        "Стандартный двухместный",
        "Уютный номер для двоих",
        "Standard",
        5000, 1, 2,
        {
            1: "codei"
        }
    ),
    new Reservation(
        3,
        "Семейный номер",
        "Две комнаты и детская кровать",
        "Family",
        8000, 3, 4,{
            1: "codei",
            2: "minibar",
            3: "wifi"
        },
    )
];



export const initLocalStorage = () => {
    if (!localStorage.getItem('hotels_data')) {
        localStorage.setItem('hotels_data', JSON.stringify(initialRooms));
    }
}