import { createContext, useState, useEffect, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'
import { ADMIN_CREDENTIALS } from '../config';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage("users", []);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminExists = users.some(u => u.login === ADMIN_CREDENTIALS.login);
    const savedUser = localStorage.getItem('current_user');
    if (!adminExists) {
      setUsers(prev => [...prev, ADMIN_CREDENTIALS]);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('current_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, users, setUsers, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Кастомный хук для удобного доступа
export const useAuth = () => useContext(AuthContext);