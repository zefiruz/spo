    import { createContext, useState, useContext } from 'react';

    const FiltersContext = createContext();

    export const FiltersProvider = ({ children }) => {

        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const [filters, setFilters] = useState({
            startDate: today,
            endDate: nextWeek,
            guests: 1,
            minPrice: 0,
            maxPrice: 50000,
            params: []
        });

        const updateFilters = (newValues) => {
            setFilters(prev => ({ ...prev, ...newValues }));
        };

        return (
            <FiltersContext.Provider value={{ filters, updateFilters }}>
                {children}
            </FiltersContext.Provider>
        );
    };

    export const useFilters = () => useContext(FiltersContext);