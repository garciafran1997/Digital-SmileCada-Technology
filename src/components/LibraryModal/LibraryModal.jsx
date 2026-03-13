import React, { useState } from 'react';
import './LibraryModal.css';

const dentalLibraries = [
    {
        name: 'SmileCad 1',
        description: 'Morfologías naturales de alta definición para rehabilitaciones estéticas.',
        image: '/library_premium.png',
        link: '/smilecad1.zip',
        isDownload: true
    },
    {
        name: 'Librería de Poscas Zirconia',
        description: 'Optimizada para fresado en seco y húmedo con conectores reforzados.',
        image: '/software_bg.png',
        link: '#'
    },
    {
        name: 'Librería Reduced-Arch',
        description: 'Diseños simplificados para casos de poco espacio interoclusal.',
        image: '/lab_bg.png',
        link: '#'
    }
];

const menuItems = [
    {
        id: 'dental-libraries',
        title: 'Librerías Dentales',
        description: 'Colección completa de librerías para diseño CAD/CAM adaptable a los principales sistemas.',
        icon: '🦷'
    },
    {
        id: 'emergence-profiles',
        title: 'Perfiles de Emergencia',
        description: 'Perfiles optimizados para implantes, diseñados para una integración estética y funcional perfecta.',
        icon: '🔬',
        downloadLink: '#'
    }
];

const LibraryModal = ({ isOpen, onClose }) => {
    const [view, setView] = useState('menu');

    if (!isOpen) return null;

    const handleClose = () => {
        setView('menu');
        onClose();
    };

    return (
        <div className="lib-modal-overlay" onClick={handleClose}>
            <div className="lib-modal-content" onClick={e => e.stopPropagation()}>
                <button className="lib-modal-close" onClick={handleClose}>&times;</button>

                {view === 'menu' ? (
                    <>
                        <div className="lib-modal-header">
                            <span className="lib-subtitle">RECURSOS DESCARGABLES</span>
                            <h2>BIBLIOTECA DIGITAL</h2>
                        </div>
                        <div className="lib-grid">
                            {menuItems.map((item, index) => (
                                <div key={index} className="lib-card" onClick={() => item.id === 'dental-libraries' ? setView('libraries') : window.location.href = item.downloadLink}>
                                    <div className="lib-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <button className="btn-lib-action">
                                        {item.id === 'dental-libraries' ? 'VER LIBRERÍAS' : 'DESCARGAR AHORA'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="libraries-detail">
                        <div className="lib-modal-header">
                            <button className="btn-back-lib" onClick={() => setView('menu')}>← VOLVER A BIBLIOTECA</button>
                            <h2>LIBRERÍAS DISPONIBLES</h2>
                        </div>
                        <div className="libraries-grid">
                            {dentalLibraries.map((lib, index) => (
                                <div key={index} className="library-detail-card">
                                    <div className="library-image">
                                        <img src={lib.image} alt={lib.name} />
                                    </div>
                                    <div className="library-info">
                                        <h3>{lib.name}</h3>
                                        <p>{lib.description}</p>
                                        <a
                                            href={lib.link}
                                            className="btn-download-small"
                                            download={lib.isDownload ? lib.name + '.zip' : undefined}
                                        >
                                            DESCARGAR
                                        </a>
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

export default LibraryModal;
