import React from 'react';
import './NewsModal.css';

const newsItems = [
    {
        title: 'Inteligencia Artificial en el Diagnóstico Dental',
        source: 'Gaceta Dental',
        summary: 'La IA está revolucionando la detección precoz de patologías, permitiendo identificar patrones invisibles al ojo humano en radiografías y escaneos 3D.',
        link: 'https://gacetadental.com/'
    },
    {
        title: 'Cirugía Robótica de Alta Precisión',
        source: '100 Dental',
        summary: 'Nuevos sistemas robóticos asistidos por IA permiten la colocación de implantes con una precisión micrométrica, reduciendo tiempos de recuperación.',
        link: 'https://100dental.es/'
    },
    {
        title: 'Nanobots para el Control de Infecciones',
        source: 'Periodoncista Juliana',
        summary: 'Investigaciones recientes muestran el uso de nanobots para atacar selectivamente bacterias patógenas en las encías sin dañar la microbiota saludable.',
        link: 'https://periodoncistajuliana.com/'
    },
    {
        title: 'Impresión 3D de Tejidos y Materiales Bioactivos',
        source: 'La Unión Digital',
        summary: 'El desarrollo de resinas que fomentan la regeneración del esmalte dental marca un hito en la odontología restauradora de 2026.',
        link: 'https://launion.digital/'
    }
];

const NewsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="news-modal-overlay" onClick={onClose}>
            <div className="news-modal-content" onClick={e => e.stopPropagation()}>
                <button className="news-modal-close" onClick={onClose}>&times;</button>
                <div className="news-modal-header">
                    <span className="news-subtitle">ACTUALIDAD DEL SECTOR</span>
                    <h2>NOVEDADES DENTALES 2026</h2>
                </div>
                <div className="news-grid">
                    {newsItems.map((news, index) => (
                        <div key={index} className="news-card">
                            <div className="news-source">{news.source}</div>
                            <h3>{news.title}</h3>
                            <p>{news.summary}</p>
                            <a href={news.link} target="_blank" rel="noopener noreferrer" className="news-link">LEER NOTICIA COMPLETA →</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsModal;
