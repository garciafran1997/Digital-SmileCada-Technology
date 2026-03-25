import React, { useState } from 'react';
import './SoftwareModal.css';

const softwareList = [
    {
        name: 'iBiteSmile',
        tagline: 'Solución de IA para la Odontología Digital',
        description: 'iBiteSmile es una solución de software impulsada por inteligencia artificial (IA) diseñada para la odontología digital, que automatiza la alineación y corrección de la oclusión (mordida) en modelos 3D con un solo clic. Es una herramienta enfocada a laboratorios dentales y clínicas que permite obtener una mordida precisa sin necesidad de ajustes manuales complejos.',
        image: '/software_box.png?v=2',
        link: 'https://bitefinder-ten.vercel.app/'
    }
];

const SoftwareModal = ({ isOpen, onClose }) => {
    const [view, setView] = useState('catalogue'); // 'catalogue' or 'detail'

    if (!isOpen) return null;

    const handleClose = () => {
        setView('catalogue');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>&times;</button>

                {view === 'catalogue' ? (
                    <div className="catalogue-view">
                        <div className="modal-header centered">
                            <span className="modal-subtitle">CATÁLOGO DIGITAL 2026</span>
                            <h2>SMILECAD SOFTWARE</h2>
                        </div>
                        <div className="catalogue-grid">
                            {softwareList.map((sw, index) => (
                                <div key={index} className="catalogue-item" onClick={() => setView('detail')}>
                                    <div className="item-cover">
                                        <img src={sw.image} alt={sw.name} />
                                        <div className="item-overlay">
                                            <span className="view-more">VER MÁS</span>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <h3>{sw.name}</h3>
                                        <p>{sw.tagline}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="detail-view">
                        <div className="modal-header">
                            <button className="btn-back" onClick={() => setView('catalogue')}>← VOLVER AL CATÁLOGO</button>
                            <h2>DETALLES DEL SOFTWARE</h2>
                        </div>
                        <div className="software-focus">
                            {softwareList.map((sw, index) => (
                                <div key={index} className="software-showcase">
                                    <div className="showcase-image">
                                        <img src={sw.image} alt={sw.name} />
                                        <div className="image-overlay"></div>
                                    </div>
                                    <div className="showcase-info">
                                        <div className="software-badge">DESTACADO</div>
                                        <h3>{sw.name}</h3>
                                        <h4 className="software-tagline">{sw.tagline}</h4>
                                        <p>{sw.description}</p>
                                        <div className="showcase-actions">
                                            <a href={sw.link} target="_blank" rel="noopener noreferrer" className="btn-premium">INICIAR</a>
                                            <button className="btn-premium outline" onClick={() => alert(`Cargando tutorial de ${sw.name}...`)}>VER TUTORIAL</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SoftwareModal;
