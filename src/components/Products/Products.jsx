import React, { useEffect, useState } from 'react';
import './Products.css';

const productCategories = ['TODOS', 'SCANER', 'IMPRESORA 3D', 'ROPA', 'OTROS'];

const products = [
    {
        title: 'Creality RaptorX',
        category: 'SCANER',
        description: 'El primer escáner híbrido inalámbrico de láser azul y NIR del mundo. Escaneo de alta precisión y máxima libertad.',
        image: '/raptorx.jpg',
        price: '3900.00',
        unit: 'ud'
    },
    {
        title: 'IMPRESORA 3D',
        category: 'IMPRESORA 3D',
        description: 'Soluciones de impresión 3D industrial con la BCN3D Omega I60. Máxima precisión y volumen para tu flujo digital.',
        image: '/omega_i60.jpg',
        price: '6000.00',
        unit: 'ud'
    },
    {
        title: 'Ortodoncia Invisible',
        category: 'ROPA',
        description: 'Diseño de alineadores y planificación de movimientos dentales para tratamientos de ortodoncia de vanguardia.',
        image: '/library_bg.png',
        price: '90.00',
        unit: 'arcada'
    },
    {
        title: 'Modelos de Estudio',
        category: 'OTROS',
        description: 'Impresión 3D de modelos de alta resolución para diagnóstico y presentación de casos a pacientes.',
        image: '/news_bg.png',
        price: '15.00',
        unit: 'ud'
    }
];

const Products = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState('TODOS');
    
    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProducts = selectedCategory === 'TODOS' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="products-page store-theme">
            <nav className="store-navbar">
                <button className="btn-back-home-minimal" onClick={onBack}>← INICIO</button>
                <div className="store-logo">SMILECAD<span>SHOP</span></div>
                <div className="store-cart-icon">🛒 <span className="cart-count">0</span></div>
            </nav>

            <header className="store-hero">
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <span className="hero-tag">COLECCIÓN 2026</span>
                    <h1>SOLUCIONES DIGITALES AVANZADAS</h1>
                    <p>Eleva tu clínica al siguiente nivel con nuestros servicios de diseño y fabricación CAD/CAM.</p>
                </div>
            </header>

            <main className="store-main">
                <aside className="store-sidebar">
                    <h3>CATEGORÍAS</h3>
                    <ul className="category-list">
                        {productCategories.map(cat => (
                            <li 
                                key={cat} 
                                className={selectedCategory === cat ? 'active' : ''}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                    
                    <div className="sidebar-promo">
                        <h4>SMILECAD ELITE</h4>
                        <p>Suscríbete para obtener precios especiales por volumen.</p>
                        <button className="btn-text">SABER MÁS →</button>
                    </div>
                </aside>

                <div className="store-content">
                    <div className="content-toolbar">
                        <p>Mostrando {filteredProducts.length} productos</p>
                        <div className="view-options">
                            <span>CUADRÍCULA</span>
                            <span>LISTA</span>
                        </div>
                    </div>

                    <div className="store-grid">
                        {filteredProducts.map((product, index) => (
                            <div key={index} className="product-card-v2">
                                <div className="product-badge">{product.category}</div>
                                <div className="product-img-wrapper">
                                    <img src={product.image} alt={product.title} />
                                    <div className="product-quick-actions">
                                        <button className="btn-quick-view">VISTA RÁPIDA</button>
                                    </div>
                                </div>
                                <div className="product-info-v2">
                                    <div className="product-meta">
                                        <h3>{product.title}</h3>
                                    </div>
                                    <p className="product-desc-v2">{product.description}</p>
                                    <div className="product-footer-v2">
                                        <div className="product-price">
                                            <span className="currency">€</span>
                                            <span className="amount">{product.price}</span>
                                            <span className="unit">/ {product.unit}</span>
                                        </div>
                                        <button className="btn-add-to-cart">AÑADIR</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="store-bottom-footer">
                <div className="footer-cols">
                    <div className="footer-col">
                        <h4>GARANTÍA SMILECAD</h4>
                        <p>Precisión certificada y entrega en 24/48h.</p>
                    </div>
                    <div className="footer-col">
                        <h4>SOPORTE TÉCNICO</h4>
                        <p>Atención directa por expertos CAD/CAM.</p>
                    </div>
                    <div className="footer-col">
                        <h4>PAGO SEGURO</h4>
                        <p>Transacciones protegidas y facturación mensual.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Products;
