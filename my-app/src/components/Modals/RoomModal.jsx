import React, { useState, useEffect } from 'react';
import Room from '../../models/Room';

const AVAILABLE_PARAMS = ['кондиционер', 'wi-fi', 'минибар', 'сейф'];
// Выносим типы в константу для удобства
const ROOM_TYPES = ['Standard', 'Family', 'Deluxe', 'Suite'];

export const RoomModal = ({ isOpen, onClose, onSave, editRoom = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'Standard',
        cost: '',
        badForRoom: '',
        guestForRoom: '',
        params: []
    });

    // Синхронизируем состояние, если открыли на редактирование
    useEffect(() => {
        if (editRoom) {
            setFormData(editRoom);
        } else {
            setFormData({
                title: '',
                description: '',
                type: 'Standard',
                cost: '',
                badForRoom: '',
                guestForRoom: '',
                params: []
            });
        }
    }, [editRoom, isOpen]);

    if (!isOpen) return null;

    const handleParamChange = (param) => {
        const newParams = formData.params.includes(param)
            ? formData.params.filter(p => p !== param)
            : [...formData.params, param];
        setFormData({ ...formData, params: newParams });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalRoom = new Room(
            editRoom?.id || Date.now(),
            formData.title,
            formData.description,
            formData.type,
            Number(formData.cost),
            Number(formData.badForRoom),
            Number(formData.guestForRoom),
            formData.params
        );
        onSave(finalRoom);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{editRoom ? 'Редактировать номер' : 'Добавить новый номер'}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Название номера"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <textarea
                        placeholder="Описание"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />

                    <div className="form-row">
                        <div className="input-group">
                            <label>Тип номера</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                {ROOM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Цена за ночь</label>
                            <input type="number" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Гостей</label>
                            <input type="number" value={formData.guestForRoom} onChange={e => setFormData({ ...formData, guestForRoom: e.target.value })} required />
                        </div>
                        <div className="input-group">
                            <label>Кроватей</label>
                            <input type="number" value={formData.badForRoom} onChange={e => setFormData({ ...formData, badForRoom: e.target.value })} required />
                        </div>
                    </div>

                    <div className="params-section">
                        <label>Доступные удобства:</label>
                        <div className="checkbox-grid">
                            {AVAILABLE_PARAMS.map(param => (
                                <label key={param} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={formData.params.includes(param)}
                                        onChange={() => handleParamChange(param)}
                                    />
                                    <span>{param}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Отмена</button>
                        <button type="submit" className="btn-save">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};