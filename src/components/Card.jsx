import React from 'react';

function Card({ image, text, onClick }) {
    return (
        <div className={`card ${onClick ? 'clickable' : ''}`} onClick={onClick}>
            <img src={image} alt="Valentine memory" className="card-image" />
            <div className="card-content">
                <p className="card-text">{text}</p>
            </div>
        </div>
    );
}

export default Card;
