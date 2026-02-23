import { AuthProvider } from './AuthContext';
import { BookingProvider } from './BookingContex';
import { FiltersProvider } from './FiltersContext';


const ComposeProviders = ({ providers, children }) => {
    return (
        <>
            {providers.reduceRight((acc, Provider) => {
                return <Provider>{acc}</Provider>;
            }, children)}
        </>
    );
};


const AppProvider = ({ children }) => {
    return (
        <ComposeProviders providers={[AuthProvider, FiltersProvider, BookingProvider]}>
            {children}
        </ComposeProviders>
    );
};





export default AppProvider;