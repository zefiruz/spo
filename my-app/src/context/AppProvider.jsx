import { AuthProvider } from './AuthContext';
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
        <ComposeProviders providers={[AuthProvider, FiltersProvider]}>
            {children}
        </ComposeProviders>
    );
};





export default AppProvider;