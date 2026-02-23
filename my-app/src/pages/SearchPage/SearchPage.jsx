import { useState } from 'react';
import SearchCard from "../../components/SearchCard/SearchCard";
import useReservations from '../../hooks/useReservations';
import { useFilters } from '../../context/FiltersContext';
import FilterCard from "../../components/FiltersCard/FilterCard";
import SearchIcon from '../../lib/icons/search.svg?react';
import './SearchPage.css';

const SearchPage = () => {
    const { filters, updateFilters } = useFilters();
    const { getFilteredRooms } = useReservations();
    const [searchQuery, setSearchQuery] = useState("");

    // Сначала фильтруем по параметрам из FilterCard
    const filteredByParams = getFilteredRooms(filters);

    // Затем дополнительно фильтруем по названию из строки поиска
    const availableRooms = filteredByParams.filter(room =>
        room.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="search-page-container">
            <aside className="filters-sidebar-wrapper">
                <FilterCard />
            </aside>

            <main className="results-section">
                <div className="search-query-container">
                    <div className="search-bar">
                        <div className="search-item">
                            <label>Поиск</label>
                            <input
                                type="text"
                                placeholder="Название отеля или номера..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="search-btn-circle">
                            <SearchIcon width="20" height="20" />
                        </button>
                    </div>
                </div>

                <div className="results-header">
                    <h2>Найдено вариантов: {availableRooms.length}</h2>
                    <p>Результаты для {filters.guests} гостей</p>
                </div>

                <div className="rooms-grid">
                    {availableRooms.length > 0 ? (
                        availableRooms.map(room => (
                            <SearchCard key={room.id} room={room} />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>К сожалению, ничего не найдено.</p>
                            <button onClick={() => {
                                updateFilters({ params: [], maxPrice: 50000 });
                                setSearchQuery("");
                            }}>
                                Сбросить всё
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SearchPage;