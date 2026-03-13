import React from 'react';
import './LabModal.css';

const services = [
    {
        title: 'Diseño CAD Premium',
        description: 'Servicio de diseño digital para todo tipo de restauraciones: coronas, puentes, carillas e incrustaciones con ajuste micrométrico.',
        icon: '🦷'
    },
    {
        title: 'Planificación de Implantes',
        description: 'Guías quirúrgicas precisas y planificación 3D para cirugías de implantes seguras y predecibles.',
        icon: '📍'
    },
    {
        title: 'Ortodoncia Invisible',
        description: 'Diseño de alineadores y planificación de movimientos dentales para tratamientos de ortodoncia de vanguardia.',
        icon: '✨'
    },
    {
        title: 'Modelos de Estudio',
        description: 'Impresión 3D de modelos de alta resolución para diagnóstico y presentación de casos a pacientes.',
        icon: '📦'
    }
];

const LabModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content lab-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="modal-header centered">
                    <span className="modal-subtitle">SMILECAD LAB SERVICES</span>
                    <h2>NUESTROS SERVICIOS</h2>
                    <p className="header-desc">Soluciones integrales de diseño y fabricación digital para clínicas dentales de alto nivel.</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>

                <div className="modal-footer">
                    <button className="btn-premium" onClick={() => window.open('mailto:info@smilecad.com')}>SOLICITAR PRESUPUESTO</button>
                </div>
            </div>
        </div>
    );
};

export default LabModal;
