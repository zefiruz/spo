import React, { useState, useMemo } from 'react';
import { useRooms } from '../../context/RoomContext';
import { RoomModal } from '../../components/Modals/RoomModal';
import './AdminRoomPage.css'

const AdminRoomsPage = () => {
    const { rooms, addRoom, deleteRoom, updateRoom } = useRooms();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    // Состояния для фильтрации
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const handleSave = (room) => {
        if (editingRoom) {
            updateRoom(editingRoom.id, room);
        } else {
            addRoom(room);
        }
        setEditingRoom(null);
    };

    // Логика фильтрации «на лету»
    const filteredRooms = useMemo(() => {
        return rooms.filter(room => {
            const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || room.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [rooms, searchTerm, filterType]);

    return (
        <div className="admin-rooms-page">
            <div className="header">
                <h1>Управление номерами</h1>
                <button className="add-btn" onClick={() => setModalOpen(true)}>+ Добавить номер</button>
            </div>

            {/* Панель фильтров для админа */}
            <div className="admin-filters">
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    className="admin-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="admin-select-filter"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">Все типы</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                </select>

                <div className="admin-stats">
                    Найдено: <strong>{filteredRooms.length}</strong>
                </div>
            </div>

            <div className="rooms-table">
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Цена</th>
                            <th>Параметры</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRooms.length > 0 ? (
                            filteredRooms.map(room => (
                                <tr key={room.id}>
                                    <td className="bold-td">{room.title}</td>
                                    <td><span className={`type-badge ${room.type}`}>{room.type}</span></td>
                                    <td className="price-td">{room.cost} ₽</td>
                                    <td>
                                        <div className="params-list">
                                            {room.params && typeof room.params === 'object'
                                                ? Object.values(room.params).join(', ')
                                                : '—'}
                                        </div>
                                    </td>
                                    <td className="action-btns">
                                        <button className="edit-btn" onClick={() => { setEditingRoom(room); setModalOpen(true); }}>ред.</button>
                                        <button className="delete-btn" onClick={() => deleteRoom(room.id)}>удл.</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Комнаты не найдены</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <RoomModal
                isOpen={isModalOpen}
                onClose={() => { setModalOpen(false); setEditingRoom(null); }}
                onSave={handleSave}
                editRoom={editingRoom}
            />
        </div>
    );
};

export default AdminRoomsPage;