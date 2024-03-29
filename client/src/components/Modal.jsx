import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-md w-full shadow-lg">
        <button onClick={onClose} className="float-right font-bold text-gray-800 dark:text-gray-200"><FontAwesomeIcon icon={faClose} size='lg'/></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
