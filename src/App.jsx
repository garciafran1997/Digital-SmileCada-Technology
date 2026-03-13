import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
import NewsModal from './components/NewsModal/NewsModal';
import LibraryModal from './components/LibraryModal/LibraryModal';
import LabModal from './components/LabModal/LabModal';
import ContactModal from './components/ContactModal/ContactModal';
import Products from './components/Products/Products';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'products'
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isLibModalOpen, setIsLibModalOpen] = useState(false);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    if (currentView === 'home') {
      const observerOptions = {
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [currentView]);

  if (currentView === 'products') {
    return <Products onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="App">
      <span id="home" style={{ position: 'absolute', top: 0 }}></span>
      <Navbar onCtaClick={() => setIsContactModalOpen(true)} />
      <Hero onProductsClick={() => setCurrentView('products')} />

      <div className="section-reveal" style={{ opacity: 0 }}>
        <Section
          id="biblioteca"
          title="Biblioteca"
          description="Explora nuestra extensa biblioteca de diseños dentales 3D. Modelos precisos y listos para ser utilizados en tus proyectos."
          image="/imp.mp4"
          align="right"
          ctaText="VER BIBLIOTECA"
          onCtaClick={() => setIsLibModalOpen(true)}
          imageFlex={0.8}
        />
      </div>

      <div className="section-reveal" style={{ opacity: 0 }}>
        <Section
          id="academy"
          title="Academy"
          description="Formación especializada para profesionales del sector dental. Aprende las técnicas más avanzadas en diseño digital y CAD/CAM."
          image="/academy_bg.png"
          align="left"
          ctaText="VER CURSOS"
          onCtaClick={() => window.open('https://academysmilecad.es/', '_blank')}
        />
      </div>

      <div className="section-reveal" style={{ opacity: 0 }}>
        <Section
          id="lab"
          title="SMILECAD LAB"
          description="Nuestro laboratorio digital de alta precisión. Ofrecemos servicios integrales de diseño y fabricación para clínicas dentales."
          image="/lab_bg.png"
          align="right"
          ctaText="VER LAB"
          onCtaClick={() => setIsLabModalOpen(true)}
        />
      </div>

      <div className="section-reveal" style={{ opacity: 0 }}>
        <Section
          id="novedades"
          title="Novedades"
          description="Mantente al día con las últimas noticias y avances tecnológicos en el mundo de la odontología digital."
          image="/PLANET.mp4"
          align="left"
          ctaText="LEER MÁS"
          onCtaClick={() => setIsNewsModalOpen(true)}
        />
      </div>

      <NewsModal isOpen={isNewsModalOpen} onClose={() => setIsNewsModalOpen(false)} />
      <LibraryModal isOpen={isLibModalOpen} onClose={() => setIsLibModalOpen(false)} />
      <LabModal isOpen={isLabModalOpen} onClose={() => setIsLabModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <footer style={{ padding: '5rem 10%', borderTop: '1px solid hsl(var(--border))', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>
        <p>© 2026 SMILECAD LAB. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
