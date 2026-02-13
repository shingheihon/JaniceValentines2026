import React, { useState, useRef } from 'react';
import songFile from '../assets/Half of a Love Song.mp3';

function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(songFile));

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button className="music-toggle-btn" onClick={togglePlay} aria-label="Toggle music">
            {isPlaying ? '⏸' : '▶'}
        </button>
    );
}

export default MusicPlayer;
