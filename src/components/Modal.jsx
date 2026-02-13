import React from 'react';
import './Modal.css'; // We'll create this file

function Modal({ isOpen, onClose, image, text }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                {image && <img src={image} alt="Popup Memory" className="modal-image" />}
                <p className="modal-text">{text}</p>
            </div>
        </div>
    );
}

export default Modal;
