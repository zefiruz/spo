import React from 'react';
import { useModal } from '../../context/ModalContext';
import NoContactsModal from './NoContactsModal';

const GlobalModalContainer = () => {
    const { noContactsOpen, closeNoContactsModal } = useModal();

    if (!noContactsOpen) return null;

    return (
        <NoContactsModal
            noContactsOpen={noContactsOpen}
            onClose={closeNoContactsModal}
        />
    );
};

export default GlobalModalContainer;