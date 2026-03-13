import React, { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success'

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content contact-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                {status === 'success' ? (
                    <div className="success-view">
                        <div className="success-icon">✓</div>
                        <h2>¡Mensaje Enviado!</h2>
                        <p>Hemos recibido tu solicitud. Nos pondremos en contacto contigo en las próximas 24 horas laborables.</p>
                        <button className="btn-premium" onClick={onClose}>CERRAR</button>
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <span className="modal-subtitle">START YOUR PROJECT</span>
                            <h2>ENVIAR TRABAJO</h2>
                            <p>Cuéntanos sobre tu caso clínico y nuestro equipo se pondrá en contacto para coordinar el flujo digital.</p>
                        </div>
                        
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>NOMBRE Y APELLIDOS</label>
                                <input type="text" placeholder="Tu nombre..." required />
                            </div>
                            <div className="form-group">
                                <label>CLÍNICA / LABORATORIO</label>
                                <input type="text" placeholder="Nombre de tu clínica..." required />
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label>EMAIL</label>
                                    <input type="email" placeholder="email@ejemplo.com" required />
                                </div>
                                <div className="form-group">
                                    <label>TELÉFONO</label>
                                    <input type="tel" placeholder="+34 000 000 000" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>TIPO DE TRABAJO</label>
                                <select required>
                                    <option value="">Selecciona una opción...</option>
                                    <option value="cad">Diseño CAD Premium</option>
                                    <option value="implants">Planificación Implantes</option>
                                    <option value="ortho">Ortodoncia Invisible</option>
                                    <option value="other">Otros servicios</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>MENSAJE / COMENTARIOS</label>
                                <textarea rows="4" placeholder="Cuéntanos más detalles sobre el trabajo..."></textarea>
                            </div>
                            
                            <button type="submit" className="btn-premium" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactModal;
