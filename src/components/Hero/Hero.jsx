import React, { useState } from 'react';
import './Hero.css';
import SoftwareModal from '../SoftwareModal/SoftwareModal';

const Hero = ({ onProductsClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoSrc = "/INOVACION.mp4"; // Matches INOVACION.mp4 on disk
    const isVideo = videoSrc.split('?')[0].endsWith('.mp4') || videoSrc.split('?')[0].endsWith('.webm');

    return (
        <section id="software" className="hero">
            <div className="hero-content">
                <h1>Innovación Digital con IA</h1>
                <p>Descubre iBiteSmile: la solución líder en corrección de oclusión automatizada para odontología digital avanzada.</p>
                <div className="hero-actions">
                    <button className="btn-primary" onClick={() => setIsModalOpen(true)}>VER SOFTWARE</button>
                    <button className="btn-outline" onClick={onProductsClick}>VER PRODUCTOS</button>
                </div>
            </div>
            <div className="hero-bg soft-fade">
                {isVideo ? (
                    <video 
                        src={videoSrc} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                    />
                ) : (
                    <img src="/software_bg.png" alt="Software Background" />
                )}
            </div>

            <SoftwareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};

export default Hero;
