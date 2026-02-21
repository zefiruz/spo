    import { createContext, useState, useContext } from 'react';

    const FiltersContext = createContext();

    export const FiltersProvider = ({ children }) => {
        const [filters, setFilters] = useState({
            startDate: null,
            endDate: null,
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