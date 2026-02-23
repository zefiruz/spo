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

    const handleReset = () => {
        updateFilters({
            minPrice: 0,
            maxPrice: 50000,
            guests: 1,
            params: [],
        });
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        
        const year = d.getFullYear();
        
        const month = String(d.getMonth() + 1).padStart(2, '0'); 
        const day = String(d.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`; // Формат YYYY-MM-DD
    };

    return (
        <aside className="filter-card">
            <h3 className="filter-card__title">Фильтры</h3>

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

            <div className="filter-section">
                <label className="filter-section__label">Даты пребывания</label>
                <div className="dual-input">
                    <input 
                        type="date" 
                        value={formatDate(filters.startDate)} 
                        onChange={(e) => updateFilters({ startDate: new Date(e.target.value) })}
                    />
                    <div className="dual-input__divider"></div>
                    <input 
                        type="date" 
                        value={formatDate(filters.endDate)} 
                        onChange={(e) => updateFilters({ endDate: new Date(e.target.value) })}
                    />
                </div>
            </div>

            <div className="filter-grid">
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

            <div className="filter-section">
                <label className="filter-section__label">В номере</label>
                <div className="checkbox-group">
                    {['Кондиционер', 'Wi-Fi', 'Минибар', 'Сейф'].map(item => (
                        <label key={item} className="checkbox-container">
                            <span className="checkbox-label">{item}</span>
                            <input 
                                type="checkbox" 
                                checked={filters.params?.includes(item.toLowerCase())}
                                onChange={() => handleParamChange(item.toLowerCase())} 
                            />
                            <span className="custom-checkbox"></span>
                        </label>
                    ))}
                </div>
            </div>

            <button className="filter-card__reset" onClick={handleReset}>Сбросить всё</button>
        </aside>
    );
};

export default FilterCard;