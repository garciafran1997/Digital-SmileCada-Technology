import React from 'react';
import './Section.css';

const Section = ({ id, title, description, image, align = 'left', ctaText = 'SABER MÁS', onCtaClick }) => {
    const isVideo = image && (image.endsWith('.mp4') || image.endsWith('.webm') || image.endsWith('.ogg'));

    return (
        <section id={id} className={`generic-section ${align}`}>
            <div className="section-container">
                <div className="section-content">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <button className="btn-outline" onClick={onCtaClick}>{ctaText}</button>
                </div>
                <div className="section-image soft-fade">
                    {isVideo ? (
                        <video 
                            src={image} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <img src={image} alt={title} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Section;
