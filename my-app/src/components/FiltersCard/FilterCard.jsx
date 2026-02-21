import React from 'react';
import './FilterCard.css';
import { useFilters } from '../../context/FiltersContext';

const FilterCard = () => {
    const { filters, updateFilters } = useFilters();

    const handleParamChange = (param) => {
        const currentParams = filters.params || [];
        const newParams = currentParams.includes(param)
            ? currentParams.filter(p => p !== param)
            : [...currentParams, param];
        updateFilters({ params: newParams });
    };

    return (
        <aside className="filter-card">
            <h3 className="filter-card__title">Фильтры</h3>

            {/* Цена за ночь (Разделенный прямоугольник) */}
            <div className="filter-section">
                <label className="filter-section__label">Цена за ночь</label>
                <div className="dual-input">
                    <input
                        type="number"
                        placeholder="От"
                        value={filters.minPrice || ''}
                        onChange={(e) => updateFilters({ minPrice: e.target.value })}
                    />
                    <div className="dual-input__divider"></div>
                    <input
                        type="number"
                        placeholder="До"
                        value={filters.maxPrice || ''}
                        onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                    />
                </div>
            </div>

            {/* Даты пребывания (Аналогичный прямоугольник) */}
            <div className="filter-section">
                <label className="filter-section__label">Даты пребывания</label>
                <div className="dual-input">
                    <input type="text" placeholder="Заезд" onFocus={(e) => (e.target.type = "date")} />
                    <div className="dual-input__divider"></div>
                    <input type="text" placeholder="Выезд" onFocus={(e) => (e.target.type = "date")} />
                </div>
            </div>

            {/* Числовые параметры (Гости и Кровати) */}
            <div className="filter-grid">
                <div className="filter-section">
                    <div className="input-row">
                        <label className="filter-section__label">Гости</label>
                        <input
                            className="single-input"
                            type="number"
                            min="1"
                            value={filters.guests}
                            onChange={(e) => updateFilters({ guests: e.target.value })}
                        />
                    </div>
                </div>

                <div className="filter-section">
                    <div className="input-row">
                        <label className="filter-section__label">Кровати</label>
                        <input
                            className="single-input"
                            type="number"
                            min="0"
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>

            {/* Количество комнат (Чекбоксы) */}
            <div className="filter-section">
                <label className="filter-section__label">Количество комнат</label>
                <div className="checkbox-group">
                    {[1, 2, 3, '4+'].map(num => (
                        <label key={num} className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkbox-label">{num} {num === 1 ? 'комната' : 'комнаты'}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* В номере (Чекбоксы) */}
            <div className="filter-section">
                <label className="filter-section__label">В номере</label>
                <div className="checkbox-group">
                    {['Кондиционер', 'Wi-Fi', 'Минибар', 'Сейф'].map(item => (
                        <label key={item} className="checkbox-container">
                            <input type="checkbox" onChange={() => handleParamChange(item.toLowerCase())} />
                            <span className="checkbox-label">{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Питание (Радиокнопки) */}
            <div className="filter-section">
                <label className="filter-section__label">Питание</label>
                <div className="radio-group">
                    <label className="radio-container">
                        <input type="radio" name="food" value="included" />
                        <span className="radio-label">Включено</span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="food" value="not-included" defaultChecked />
                        <span className="radio-label">Не включено</span>
                    </label>
                </div>
            </div>

            <button className="filter-card__reset" onClick={() => window.location.reload()}>Сбросить всё</button>
        </aside>
    );
};

export default FilterCard;