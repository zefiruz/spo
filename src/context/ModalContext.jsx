import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [noContactsOpen, setnoContactsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Функция для открытия
    const openNoContactsModal = () => {
        setnoContactsOpen(true);
    };

    // Функция для закрытия
    const closeNoContactsModal = () => {
        setnoContactsOpen(false);
        setModalData(null);
    };

    return (
        <ModalContext.Provider value={{ noContactsOpen, openNoContactsModal, closeNoContactsModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);