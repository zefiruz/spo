import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, deniedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (user) {
        user.role = user.isAdmin ? 'admin' : 'client';
    }
    const hasAccess = !user
        ? (!!allowedRoles || !!deniedRoles)
        : (deniedRoles ? deniedRoles.includes(user.role) : !allowedRoles.includes(user.role));

    if (hasAccess) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Если всё ок — рендерим дочерние роуты (через Outlet для удобства групп)
    return <Outlet />;
};

export default ProtectedRoute;