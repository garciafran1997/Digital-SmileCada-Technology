import React, { useState } from 'react';
import StlViewer from '../StlViewer/StlViewer';
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
        name: 'SmileCAD 2',
        description: 'Optimizada para fresado en seco y húmedo con conectores reforzados.',
        image: '/grin_7.png',
        link: '#'
    },
    {
        name: 'SmileCAD 3',
        description: 'Diseños simplificados para casos de poco espacio interoclusal.',
        image: '/grin_159.png',
        link: '#'
    }
];

const menuItems = [
    {
        id: 'dental-libraries',
        title: 'Librerías Dentales',
        description: 'Colección completa de librerías para diseño CAD/CAM adaptable a los principales sistemas.'
    },
    {
        id: 'emergence-profiles',
        title: 'Perfiles de Emergencia',
        description: 'Perfiles optimizados para implantes, diseñados para una integración estética y funcional perfecta.',
        downloadLink: '/models/1smile.stl'
    }
];

const LibraryModal = ({ isOpen, onClose }) => {
    const [view, setView] = useState('menu');
    const [showViewer, setShowViewer] = useState(false);
    const [instagramUser, setInstagramUser] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState('');

    if (!isOpen) return null;

    const handleClose = () => {
        setView('menu');
        setShowViewer(false);
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
                                <div 
                                    key={index} 
                                    className={`lib-card ${item.id === 'emergence-profiles' ? 'lib-card-emergence' : ''} ${item.id === 'dental-libraries' ? 'lib-card-libraries' : ''}`}
                                >
                                    {item.id === 'dental-libraries' && (
                                        <div className="lib-video-background">
                                            <img src="/Video_De_Dos_Imágenes.gif" alt="Librerías Dentales Video" />
                                        </div>
                                    )}
                                    {item.icon && <div className="lib-icon">{item.icon}</div>}
                                    <div className="lib-card-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        
                                        {item.id === 'emergence-profiles' && (
                                            <button 
                                                className="btn-lib-viewer"
                                                onClick={() => setShowViewer(!showViewer)}
                                            >
                                                {showViewer ? 'CERRAR VISOR' : 'VISOR 3D'}
                                            </button>
                                        )}

                                        {showViewer && item.id === 'emergence-profiles' && (
                                            <div className="inline-viewer">
                                                <StlViewer url="/models/1smile.stl" />
                                            </div>
                                        )}

                                        <button 
                                            className="btn-lib-action"
                                            onClick={() => {
                                                if (item.id === 'dental-libraries') setView('libraries');
                                                else if (item.id === 'emergence-profiles') setView('download-options');
                                                else window.location.href = item.downloadLink;
                                            }}
                                        >
                                            {item.id === 'dental-libraries' ? 'VER LIBRERÍAS' : 'DESCARGAR AHORA'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : view === 'download-options' ? (
                    <div className="download-options-view">
                        <div className="lib-modal-header">
                            <button className="btn-back-lib" onClick={() => setView('menu')}>← VOLVER A BIBLIOTECA</button>
                            <h2>OPCIONES DE DESCARGA</h2>
                        </div>
                        <div className="download-options-grid">
                            <div className="download-option-card free-tier">
                                <div className="card-header-free">
                                    <h3>STL GRATUITO</h3>
                                </div>
                                <div className="option-instructions">
                                    <p>Para descargar el STL gratuito, sigue estos tres simples pasos:</p>
                                    <ol>
                                        <li>Síguenos en Instagram a <a href="https://instagram.com/labsmilecad" target="_blank" rel="noreferrer">@labsmilecad</a>, <a href="https://instagram.com/academysmilecad" target="_blank" rel="noreferrer">@academysmilecad</a> y <a href="https://instagram.com/digitalsmilecad" target="_blank" rel="noreferrer">@digitalsmilecad</a>.</li>
                                        <li>Sube una historia mencionando a las tres cuentas con esta imagen obligatoria:</li>
                                    </ol>
                                    <div className="promo-image-container">
                                        <img src="/emergencia.jpeg" alt="Imagen para subir a historia" className="promo-image" />
                                        <a href="/emergencia.jpeg" download="emergencia.jpeg" className="btn-download-image">DESCARGAR IMAGEN</a>
                                    </div>
                                    <p>3. Deja tu cuenta de Instagram a continuación para verificar tu historia.</p>
                                    {!formSubmitted ? (
                                        <form className="email-verification-form" onSubmit={(e) => {
                                            e.preventDefault();
                                            if(instagramUser.trim() === '') {
                                                setFormError('Introduce tu usuario');
                                                return;
                                            }
                                            setFormError('');
                                            setFormSubmitted(true);
                                        }}>
                                            <input 
                                                type="text" 
                                                placeholder="@tu_usuario_instagram" 
                                                value={instagramUser}
                                                onChange={(e) => setInstagramUser(e.target.value)}
                                                required
                                            />
                                            {formError && <span className="error-text">{formError}</span>}
                                            <button type="submit" className="btn-submit-email">VERIFICAR Y RECIBIR</button>
                                        </form>
                                    ) : (
                                        <div className="success-message">
                                            ✅ ¡Gracias! Nuestro equipo verificará tu historia y te enviaremos el STL por MD a <strong>{instagramUser}</strong> en breve.
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="download-option-card paid-tier">
                                <div className="card-header-paid">
                                    <h3>PAGO DIRECTO</h3>
                                </div>
                                <div className="option-instructions">
                                    <p>Descarga directa e inmediata del <strong>"Perfil de Emergencia - SmileCad"</strong> sin esperas.</p>
                                    <div className="payment-action">
                                        <div className="price-tag">5,00 €</div>
                                        <a href="/models/perfil_emergencia.stl" download="Perfil de Emergencia - SmileCad.stl" className="btn-pay-download">
                                            COMPRAR
                                        </a>
                                        <span className="payment-note">Acceso instantáneo al archivo STL completo.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
