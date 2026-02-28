import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation, Outlet } from 'react-router-dom';
export const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    const currentRole = user ? (user.isAdmin ? 'admin' : 'user') : 'guest';

    const isForbidden = () => {
        if (allowedRoles) {
            return !allowedRoles.includes(currentRole);
        }
        return false;
    };

    if (isForbidden()) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};