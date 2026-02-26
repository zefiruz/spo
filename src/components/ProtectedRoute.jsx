import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation, Outlet } from 'react-router-dom';
export const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    // Определяем роль "на лету", не меняя user.role в стейте
    const currentRole = user ? (user.isAdmin ? 'admin' : 'user') : 'guest';

    const isForbidden = () => {
        if (allowedRoles) {
            return !allowedRoles.includes(currentRole);
        }
        return false;
    };

    if (isForbidden()) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};