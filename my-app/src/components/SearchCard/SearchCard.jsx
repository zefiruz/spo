// import "./SeachCard.css";
import { useState, useRef } from 'react'

const hotelImages = [
    "./testPhotos/photo1.jpg",
    "./testPhotos/photo2.jpg",
    "./testPhotos/photo3.jpg"
];

const SearchCard = ({ room }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);

    const startSlide = () => {
        timerRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === hotelImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 1500);
    };
    const stopSlide = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setCurrentIndex(0);
    };

    return (
        <div className="card__container">
            <div className="card__image"
                onMouseEnter={() => startSlide()}
                onMouseLeave={() => stopSlide()}
            >
                <img src={hotelImages[currentIndex]} alt="Room img" />
            </div>
            <h3>{room.title}</h3>
            <div>{room.description}</div>
            <div>{room.type}</div>
            <div>{room.cost}</div>
            <div>{room.count}</div>
            <div>{room.badForRoom}</div>
            <div>{room.guestForRoom}</div>
            <ul>
            </ul>
        </div>
    )
}



export default SearchCard;
