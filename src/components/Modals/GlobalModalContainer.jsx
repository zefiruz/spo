// components/Modals/GlobalModalContainer.jsx
import React from 'react';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext'; // Чтобы прокинуть setUser
import NoContactsModal from './NoContactsModal';
import LoginModal from './LoginModal';
import SignupModal from './SignUpModal';

const GlobalModalContainer = () => {
    const {
        noContactsOpen, closeNoContactsModal,
        authModal, openSignup, closeAuth
    } = useModal();

    const { setUser } = useAuth(); // Берем из контекста авторизации

    return (
        <>
            {/* Модалка отсутствия контактов */}
            {noContactsOpen && (
                <NoContactsModal
                    noContactsOpen={noContactsOpen}
                    onClose={closeNoContactsModal}
                />
            )}

            {/* Модалка Логина */}
            {authModal === 'login' && (
                <LoginModal
                    onClose={closeAuth}
                    OnOpenSignUp={openSignup}
                    setUser={setUser}
                />
            )}

            {/* Модалка Регистрации */}
            {authModal === 'signup' && (
                <SignupModal
                    onClose={closeAuth}
                    setUser={setUser}
                />
            )}
        </>
    );
};

export default GlobalModalContainer;