// context/ModalContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [noContactsOpen, setNoContactsOpen] = useState(false);
    const [authModal, setAuthModal] = useState(null); // 'login', 'signup' или null

    // Методы для контактов
    const openNoContactsModal = () => setNoContactsOpen(true);
    const closeNoContactsModal = () => setNoContactsOpen(false);

    // Методы для авторизации
    const openLogin = () => setAuthModal('login');
    const openSignup = () => setAuthModal('signup');
    const closeAuth = () => setAuthModal(null);

    return (
        <ModalContext.Provider value={{
            noContactsOpen, openNoContactsModal, closeNoContactsModal,
            authModal, openLogin, openSignup, closeAuth
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);