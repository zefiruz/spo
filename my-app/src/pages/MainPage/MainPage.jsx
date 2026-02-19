import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './MainPage.css';
import searchIcon from "../../lib/icons/search.svg";

import { registerLocale } from "react-datepicker";
import { ru } from 'date-fns/locale/ru';
registerLocale('ru', ru);

const MainPage = () => {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const [isGuestsOpen, setIsGuestsOpen] = useState(false);
    const [guests, setGuests] = useState({ adults: 2, children: 0 });
    const toggleGuests = () => setIsGuestsOpen(!isGuestsOpen);

    const [activeModal, setActiveModal] = useState(null);

    // Универсальная функция переключения
    const toggleModal = (modalName) => {
        setActiveModal(prev => prev === modalName ? null : modalName);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-bar')) {
                setActiveModal(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="main-container">
            <div className="content-wrapper">
                <h2>Забудь про обычные отели.</h2>
                <p>SEA.hotel - уникальное пространство для тех, кто выбирает лучшее.</p>

                <div className="search-bar">
                    <div className="search-item first-quarter">
                        <label>Заезд</label>
                        <DatePicker
                            selected={checkInDate}
                            onChange={(date) =>
                                {setCheckInDate(date);
                                setActiveModal('checkOut');}}
                            open={activeModal === 'checkIn'}
                            onInputClick={() => toggleModal('checkIn')}
                            popperPlacement="bottom-start" // Фиксирует появление снизу
                            popperModifiers={[
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, 25],
                                    },
                                },
                            ]}
                            selectsStart
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            minDate={new Date()} // Нельзя выбрать прошлое
                            locale="ru" dateFormat="dd MMMM yyyy"
                            placeholderText="Выберите дату"
                            className="custom-datepicker-input"
                        />
                    </div>

                    <div className="search-item second-quarter">
                        <label>Отъезд</label>
                        <DatePicker
                            selected={checkOutDate}
                            onChange={(date) => {
                                setCheckOutDate(date);
                                setActiveModal(null);
                            }}
                            open={activeModal === 'checkOut'} // Управление открытием
                            onInputClick={() => toggleModal('checkOut')}
                            popperPlacement="bottom-start" // Фиксирует появление снизу
                            popperModifiers={[
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, 25],
                                    },
                                },
                            ]}
                            selectsEnd
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            minDate={checkInDate || new Date()} // Нельзя выехать раньше, чем заехали
                            locale="ru"
                            dateFormat="dd MMMM yyyy"
                            placeholderText="Выберите дату"
                            className="custom-datepicker-input"
                        />
                    </div>

                    <div className="search-item half-width" >
                        <div className="input-group" onClick={() => toggleModal('guests')}>
                            <label>Гости</label>
                            <input
                                type="text"
                                readOnly
                                value={`${guests.adults} взрослых, ${guests.children} детей`}
                            />
                        </div>
                        <button className="search-btn-circle">
                            <img src={searchIcon} alt="Search" className="search-icon-svg" />
                        </button>

                        {activeModal === 'guests' && (
                            <div className="guests-modal" onClick={(e) => e.stopPropagation()}>
                                <div className="guest-row">
                                    <div className="guest-info">
                                        <span>Взрослые</span>
                                        <small>От 13 лет</small>
                                    </div>
                                    <div className="counter">
                                        <button onClick={() => setGuests({...guests, adults: Math.max(1, guests.adults - 1)})}>-</button>
                                        <span className="count-number">{guests.adults}</span>
                                        <button onClick={() => setGuests({...guests, adults: guests.adults + 1})}>+</button>
                                    </div>
                                </div>

                                <div className="guest-row">
                                    <div className="guest-info">
                                        <span>Дети</span>
                                        <small>До 12 лет</small>
                                    </div>
                                    <div className="counter">
                                        <button onClick={() => setGuests({...guests, children: Math.max(0, guests.children - 1)})}>-</button>
                                        <span className="count-number">{guests.children}</span>
                                        <button onClick={() => setGuests({...guests, children: guests.children + 1})}>+</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;