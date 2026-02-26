import { AuthProvider } from './AuthContext';
import { BookingProvider } from './BookingContex';
import { FiltersProvider } from './FiltersContext';
import { RoomProvider } from './RoomContext';
import { ModalProvider } from './ModalContext';


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
        <ComposeProviders providers={[ModalProvider, AuthProvider, FiltersProvider, BookingProvider, RoomProvider  ]}>
            {children}
        </ComposeProviders>
    );
};





export default AppProvider;