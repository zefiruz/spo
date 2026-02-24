import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    // Используем твой хук для работы с базой отелей
    const [rooms, setRooms] = useLocalStorage('hotels_data', []);

    // Добавление
    const addRoom = (roomData) => {
        setRooms(prev => [...prev, roomData]);
    };

    // Удаление
    const deleteRoom = (roomId) => {
        if (window.confirm("Вы уверены, что хотите удалить этот номер?")) {
            setRooms(prev => prev.filter(room => room.id !== roomId));
        }
    };

    // Редактирование
    const updateRoom = (roomId, updatedData) => {
        setRooms(prev => prev.map(room =>
            room.id === roomId ? { ...room, ...updatedData } : room
        ));
    };

    return (
        <RoomContext.Provider value={{ rooms, addRoom, deleteRoom, updateRoom }}>
            {children}
        </RoomContext.Provider>
    );
};

export const useRooms = () => useContext(RoomContext);