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
        unit: 'ud',
        isComingSoon: true
    },
    {
        title: 'IMPRESORA 3D',
        category: 'IMPRESORA 3D',
        description: 'Soluciones de impresión 3D industrial con la BCN3D Omega I60. Máxima precisión y volumen para tu flujo digital.',
        image: '/omega_i60.jpg',
        price: '6000.00',
        unit: 'ud',
        isComingSoon: true
    },
    {
        title: 'Camiseta SmileCAD Academy',
        category: 'ROPA',
        description: 'Camiseta premium de algodón con el logo oficial de SmileCAD Digital Design Academy. Edición limitada.',
        image: '/shirt_academy.png',
        price: '29.00',
        unit: 'ud'
    },
    {
        title: 'Termo SmileCAD Academy',
        category: 'ACCESORIOS',
        description: 'Termo premium de acero inoxidable con aislamiento térmico y logo oficial grabado. Ideal para el día a día en la clínica o la academia.',
        image: '/thermos_academy.png',
        price: '35.00',
        unit: 'ud'
    },

];

const Products = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState('TODOS');
    const [cart, setCart] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({}); // { productIndex: 'M' }
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = (product, index) => {
        if (product.category === 'ROPA' && !selectedSizes[index]) {
            alert('Por favor, selecciona una talla antes de añadir al carrito.');
            return;
        }

        const cartItem = {
            ...product,
            cartId: Date.now() + Math.random(), // ID único para el carrito
            selectedSize: selectedSizes[index] || null
        };

        setCart([...cart, cartItem]);
        setIsCartOpen(true); // Abrir carrito al añadir
    };

    const removeFromCart = (cartId) => {
        setCart(cart.filter(item => item.cartId !== cartId));
    };

    const handleSizeSelect = (index, size) => {
        setSelectedSizes({
            ...selectedSizes,
            [index]: size
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    const filteredProducts = selectedCategory === 'TODOS' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="products-page store-theme">
            {/* Overlay para el Carrito */}
            {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}

            {/* Panel Lateral del Carrito */}
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>TU CESTA</h2>
                    <button className="btn-close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
                </div>

                <div className="cart-content">
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <p>Tu cesta está vacía</p>
                            <button className="btn-text" onClick={() => setIsCartOpen(false)}>VOLVER A LA TIENDA</button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.cartId} className="cart-item">
                                <div className="cart-item-img">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="cart-item-info">
                                    <h4>{item.title}</h4>
                                    {item.selectedSize && <p className="cart-item-size">Talla: {item.selectedSize}</p>}
                                    <p className="cart-item-price">€{item.price}</p>
                                </div>
                                <button className="btn-remove-item" onClick={() => removeFromCart(item.cartId)}>🗑️</button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>TOTAL:</span>
                            <span>€{calculateTotal()}</span>
                        </div>
                        <button className="btn-checkout" onClick={() => alert('Próximamente: Integración con plataforma de pago.')}>
                            FINALIZAR COMPRA
                        </button>
                    </div>
                )}
            </div>

            <nav className="store-navbar">
                <button className="btn-back-home-minimal" onClick={onBack}>← INICIO</button>
                <div className="store-logo">SMILECAD<span>SHOP</span></div>
                <div className="store-cart-icon" onClick={() => setIsCartOpen(true)}>
                    🛒 <span className="cart-count">{cart.length}</span>
                </div>
            </nav>

            <header className="store-hero">
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <span className="hero-tag">COLECCIÓN 2026</span>
                    <h1>SOLUCIONES DIGITALES AVANZADAS</h1>
                    <p>Únete a la revolución</p>
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
                        {filteredProducts.map((product, index) => {
                            const productIndex = products.indexOf(product);
                            return (
                                <div key={index} className={`product-card-v2 ${product.isComingSoon ? 'coming-soon' : ''}`}>
                                    <div className="product-badge">
                                        {product.isComingSoon ? 'PRÓXIMAMENTE' : product.category}
                                    </div>
                                    <div className="product-img-wrapper">
                                        <img src={product.image} alt={product.title} />
                                        {!product.isComingSoon && (
                                            <div className="product-quick-actions">
                                                <button className="btn-quick-view">VISTA RÁPIDA</button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="product-info-v2">
                                        <div className="product-meta">
                                            <h3>{product.title}</h3>
                                        </div>
                                        <p className="product-desc-v2">{product.description}</p>
                                        
                                        {product.category === 'ROPA' && !product.isComingSoon && (
                                            <div className="size-selector">
                                                <span>TALLA:</span>
                                                <div className="size-options">
                                                    {['S', 'M', 'L', 'XL'].map(size => (
                                                        <button 
                                                            key={size}
                                                            className={`size-btn ${selectedSizes[productIndex] === size ? 'active' : ''}`}
                                                            onClick={() => handleSizeSelect(productIndex, size)}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="product-footer-v2">
                                            <div className="product-price">
                                                <span className="currency">€</span>
                                                <span className="amount">{product.price}</span>
                                                <span className="unit">/ {product.unit}</span>
                                            </div>
                                            <button 
                                                className={`btn-add-to-cart ${product.category === 'ROPA' && !selectedSizes[productIndex] ? 'locked-btn' : ''}`}
                                                disabled={product.isComingSoon}
                                                onClick={() => handleAddToCart(product, productIndex)}
                                            >
                                                {product.isComingSoon ? 'BLOQUEADO' : 'AÑADIR'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
