/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';

function Navbar({ isLoggedIn, onAuthClick }: { isLoggedIn: boolean, onAuthClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-black/95 backdrop-blur-md py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Smilecad Logo" className="h-16 md:h-32 object-contain" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-xs font-bold text-white uppercase tracking-[0.15em] hover:text-gray-400 transition-colors">Inicio</a>
            <a href="#nosotros" className="text-xs font-bold text-white uppercase tracking-[0.15em] hover:text-gray-400 transition-colors">Nosotros</a>
            <a href="#catalogo" className="text-xs font-bold text-white uppercase tracking-[0.15em] hover:text-gray-400 transition-colors">Catálogo</a>
            <a href="#contacto" className="text-xs font-bold text-white uppercase tracking-[0.15em] hover:text-gray-400 transition-colors">Contacto</a>
            <button
              onClick={onAuthClick}
              className="text-xs font-bold text-white uppercase tracking-[0.15em] hover:text-gray-400 transition-colors"
            >
              Enviar Trabajo
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-400">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-white/10 px-6 py-8 flex flex-col space-y-6">
          <a href="#inicio" onClick={() => setIsOpen(false)} className="text-sm font-bold text-white uppercase tracking-[0.15em]">Inicio</a>
          <a href="#nosotros" onClick={() => setIsOpen(false)} className="text-sm font-bold text-white uppercase tracking-[0.15em]">Nosotros</a>
          <a href="#catalogo" onClick={() => setIsOpen(false)} className="text-sm font-bold text-white uppercase tracking-[0.15em]">Catálogo</a>
          <a href="#contacto" onClick={() => setIsOpen(false)} className="text-sm font-bold text-white uppercase tracking-[0.15em]">Contacto</a>
          <button
            onClick={() => {
              setIsOpen(false);
              onAuthClick();
            }}
            className="text-sm font-bold text-white uppercase tracking-[0.15em] text-left"
          >
            Enviar Trabajo
          </button>
        </div>
      )}
    </nav>
  );
}

function FullScreenSection({ id, title, subtitle, image, video, containVideo = false, align = 'left', buttonText = "Saber más", onButtonClick }: any) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (video && videoElement) {
      // Force muted to ensure autoplay is allowed
      videoElement.defaultMuted = true;
      videoElement.muted = true;

      const playVideo = () => {
        videoElement.play().catch(error => {
          console.log("Autoplay failed, waiting for user interaction:", error);
        });
      };

      playVideo();

      // Mobile Safary/Chrome often need a user gesture to start even if muted
      const handleInteraction = () => {
        playVideo();
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('click', handleInteraction);
      };

      document.addEventListener('touchstart', handleInteraction);
      document.addEventListener('click', handleInteraction);

      return () => {
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('click', handleInteraction);
      };
    }
  }, [video]);

  return (
    <section id={id} className="relative min-h-screen md:h-screen flex items-end pt-24 pb-16 md:pt-0 md:pb-24 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        {video ? (
          <video
            ref={videoRef}
            src={video}
            autoPlay
            loop
            muted
            playsInline
            // @ts-ignore
            webkit-playsinline="true"
            preload="auto"
            className={`w-full h-full object-center opacity-70 ${containVideo ? 'object-contain scale-110 md:scale-125 xl:scale-150' : 'object-cover'}`}
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover md:object-contain object-center opacity-70 bg-black"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`max-w-3xl ${align === 'right' ? 'ml-auto text-right' : ''} ${align === 'center' ? 'mx-auto text-center' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-wide text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-base md:text-xl text-gray-300 mb-8 font-light max-w-2xl">
            {subtitle}
          </p>
          <button
            onClick={onButtonClick}
            className="border-2 border-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            {buttonText}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="bg-black py-16 md:py-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden border border-white/10 group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101738.54146039504!2d-3.679140924976451!3d37.1764860268579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fce4004018a3%3A0x7d934c9c1935c7e3!2sGranada%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1711200000000!5m2!1ses!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(110%) brightness(95%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-70 group-hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1 border border-white/20 rounded-full">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">ubicación</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white leading-tight">
              Granada, <br />
              <span className="text-gray-500">España</span>
            </h2>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Ubicación</p>
                <p className="text-white text-lg font-light tracking-wide">SmilCad Lab</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Tu <strong>laboratorio dental en Granada</strong> de referencia. Especialistas en prótesis dentales digitales con tecnología CAD/CAM avanzada, ofreciendo la máxima precisión y rapidez para clínicas dentales de toda España.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onPrivacyClick }: { onPrivacyClick: () => void }) {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-8">
          <li><a href="mailto:smilecadlab@gmail.com" className="hover:text-white transition-colors">smilecadlab@gmail.com</a></li>
          <li><a href="https://www.instagram.com/labsmilecad/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
          <li><button onClick={onPrivacyClick} className="hover:text-white transition-colors uppercase">Privacidad</button></li>
        </ul>
        <p className="text-gray-600 text-xs uppercase tracking-[0.15em]">
          © {new Date().getFullYear()} SMILECAD. GRANADA, ESPAÑA.
        </p>
      </div>
    </footer>
  );
}

type ToothConfig = {
  workType: 'pilar' | 'pontico' | 'ferula';
  pilarBase?: 'implantes' | 'munones';
  material?: 'metal' | 'zirconio';
  tipoImplante?: string;
};

function STLViewer({ file }: { file: File }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target?.result as ArrayBuffer;
      const loader = new STLLoader();
      const geom = loader.parse(contents);
      geom.computeVertexNormals();
      setGeometry(geom);
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  if (!geometry) return <div className="flex items-center justify-center h-full text-xs text-gray-500">Cargando 3D...</div>;

  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 50 }} className="w-full h-full cursor-move">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Stage environment="city" intensity={0.5}>
        <mesh geometry={geometry}>
          <meshStandardMaterial color="#e5e7eb" roughness={0.3} metalness={0.1} />
        </mesh>
      </Stage>
      <OrbitControls makeDefault />
    </Canvas>
  );
}

function DragDropZone({ label, accept = ".stl", onFiles }: { label: string, accept?: string, onFiles: (files: FileList) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const isSTL = file?.name.toLowerCase().endsWith('.stl');

  const handleFile = (f: File) => {
    setFile(f);
    // Create a DataTransfer object to pass a FileList
    const dt = new DataTransfer();
    dt.items.add(f);
    onFiles(dt.files);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    const dt = new DataTransfer();
    onFiles(dt.files);
  };

  return (
    <div
      className={`relative border-2 border-dashed p-2 text-center transition-colors h-48 flex flex-col items-center justify-center ${isDragging ? 'border-white bg-white/10' : 'border-white/20 hover:border-white/50'}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
    >
      {!file && (
        <input
          type="file"
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />
      )}

      {file ? (
        <div className="w-full h-full flex flex-col relative z-20">
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1 right-1 z-30 bg-black/80 text-white p-1 rounded hover:bg-red-500 transition-colors"
            title="Eliminar archivo"
          >
            <X size={14} />
          </button>
          {isSTL ? (
            <div className="flex-1 w-full relative bg-black/50 rounded overflow-hidden">
              <STLViewer file={file} />
              <div className="absolute bottom-1 left-1 bg-black/80 px-2 py-1 text-[8px] text-white rounded pointer-events-none">3D Interactivo</div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-white font-mono break-all px-4">{file.name}</p>
            </div>
          )}
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">{label}</p>
        </div>
      ) : (
        <div className="pointer-events-none">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</p>
          <p className="text-[10px] text-gray-500">Arrastra tu archivo {accept} o haz clic</p>
        </div>
      )}
    </div>
  );
}

function ToothGrid({
  teethConfig,
  activeTooth,
  onToothClick
}: {
  teethConfig: Record<number, ToothConfig>,
  activeTooth: number | null,
  onToothClick: (t: number) => void
}) {
  const upperRight = [18, 17, 16, 15, 14, 13, 12, 11];
  const upperLeft = [21, 22, 23, 24, 25, 26, 27, 28];
  const lowerRight = [48, 47, 46, 45, 44, 43, 42, 41];
  const lowerLeft = [31, 32, 33, 34, 35, 36, 37, 38];

  const renderTooth = (t: number) => {
    const config = teethConfig[t];
    const isActive = activeTooth === t;

    let colorClass = 'bg-black text-gray-400 border-white/20 hover:border-white/50';
    if (config) {
      if (config.workType === 'pilar') colorClass = 'bg-yellow-500 text-black border-yellow-500';
      else if (config.workType === 'pontico') colorClass = 'bg-red-500 text-white border-red-500';
      else if (config.workType === 'ferula') colorClass = 'bg-blue-500 text-white border-blue-500';
    }

    return (
      <button
        key={t}
        type="button"
        onClick={() => onToothClick(t)}
        className={`min-w-[32px] h-10 flex items-center justify-center text-xs font-mono border transition-all ${colorClass} ${isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110 z-10' : ''}`}
      >
        {t}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 my-6 overflow-x-auto pb-4 w-full">
      <div className="flex space-x-2 min-w-max">
        <div className="flex space-x-1 pr-2 border-r border-white/20">{upperRight.map(renderTooth)}</div>
        <div className="flex space-x-1 pl-2">{upperLeft.map(renderTooth)}</div>
      </div>
      <div className="flex space-x-2 min-w-max">
        <div className="flex space-x-1 pr-2 border-r border-white/20">{lowerRight.map(renderTooth)}</div>
        <div className="flex space-x-1 pl-2">{lowerLeft.map(renderTooth)}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isSendingCatalogEmail, setIsSendingCatalogEmail] = useState(false);
  const [catalogEmailStatus, setCatalogEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalView, setContactModalView] = useState<'options' | 'emailForm'>('options');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [workModalView, setWorkModalView] = useState<'main' | 'zirconio' | 'ibar' | 'zirconio-munones' | 'splintbrux' | 'prueba-fri'>('main');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSendWorkModalOpen, setIsSendWorkModalOpen] = useState(false);
  const [isSendWorkOptionsOpen, setIsSendWorkOptionsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<'medit' | 'shining' | null>(null);

  const [teethConfig, setTeethConfig] = useState<Record<number, ToothConfig>>({});
  const [activeTooth, setActiveTooth] = useState<number | null>(null);
  const [stls, setStls] = useState<{ superior?: string, inferior?: string, oclusion?: string, scanbodies?: string, foto?: string }>({});

  const handleToothClick = (t: number) => {
    if (teethConfig[t]) {
      if (activeTooth === t) {
        // Deselect and remove
        const newConfig = { ...teethConfig };
        delete newConfig[t];
        setTeethConfig(newConfig);
        setActiveTooth(null);
      } else {
        // Just set as active
        setActiveTooth(t);
      }
    } else {
      // Add and set active
      setTeethConfig({
        ...teethConfig,
        [t]: { workType: 'pilar', pilarBase: 'munones', material: 'zirconio' }
      });
      setActiveTooth(t);
    }
  };

  const updateActiveTooth = (updates: Partial<ToothConfig>) => {
    if (activeTooth === null) return;
    setTeethConfig({
      ...teethConfig,
      [activeTooth]: { ...teethConfig[activeTooth], ...updates }
    });
  };

  const handleCatalogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSendingCatalogEmail(true);
    setCatalogEmailStatus('idle');

    try {
      // NOTE: Using the same Service ID and Public Key. 
      // The Template ID can be the same if it simply maps to {{message}}, 
      // but ideally the user might want a separate template. We'll use the same one for now
      // and map the form inputs to match what the template expects.

      const formData = new FormData(e.currentTarget);
      const clinica = formData.get('clinica');
      const localidad = formData.get('localidad');
      const email = formData.get('email');
      const telefono = formData.get('telefono');

      // We bundle everything into a single "message" so the existing template works out of the box
      const bundledMessage = `
Solicitud de catálogo desde la web:
- Clínica: ${clinica}
- Localidad: ${localidad}
- Teléfono: ${telefono}
- Email dado para contactar: ${email}
      `.trim();

      // Create a hidden form or simply pass a record with the expected template params
      await emailjs.send(
        'service_zejjuxe', // Service ID
        'template_v6rgz0c', // Template ID
        {
          email: email, // Correo del remitente (se inyectará en Reply-To si se configuró así)
          message: bundledMessage // El cuerpo de la información
        },
        'v-P-T2Anln1robHSj' // Public Key
      );

      setCatalogEmailStatus('success');

      setTimeout(() => {
        setIsCatalogModalOpen(false);
        setTimeout(() => setCatalogEmailStatus('idle'), 300);
      }, 2000);

    } catch (error) {
      console.error('Error al solicitar catálogo:', error);
      setCatalogEmailStatus('error');
    } finally {
      setIsSendingCatalogEmail(false);
    }
  };

  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black">
      <Navbar
        isLoggedIn={isLoggedIn}
        onAuthClick={() => {
          setIsSendWorkOptionsOpen(true);
        }}
      />

      {/* Send Work Options Modal */}
      {isSendWorkOptionsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 p-5 sm:p-8 max-w-xl w-full relative my-auto max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsSendWorkOptionsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-white mb-2 text-center">
              Enviar Trabajo
            </h3>
            <p className="text-gray-400 text-xs text-center uppercase tracking-widest mb-8">
              Selecciona tu método de envío preferido
            </p>

            <div className="space-y-8">
              {/* Option 1: Portal SmileCad Lab */}
              <div className="border border-white/10 p-6 rounded-lg bg-white/5 hover:border-white/20 transition-all duration-300">
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
                  Enviar trabajo por:
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-lg font-bold text-white uppercase tracking-wider font-display">
                    SmileCad Lab
                  </div>
                  <button
                    onClick={() => {
                      window.open('https://smilecad-lab-transfercad.vercel.app/', '_blank');
                    }}
                    className="bg-white text-black font-bold uppercase tracking-[0.15em] text-xs py-3 px-6 hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Entrar al Portal</span>
                    <span className="text-[10px]">▶</span>
                  </button>
                </div>
              </div>

              {/* Separator / o también enviar por */}
              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <span className="relative px-4 bg-[#111] text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                  O también enviar por:
                </span>
              </div>

              {/* Option 2: Escáneres intraorales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Medit */}
                <div className="border border-white/10 p-6 rounded-lg bg-white/5 flex flex-col items-center text-center hover:border-white/20 transition-all duration-300">
                  {/* Medit Logo */}
                  <div className="h-24 flex flex-col items-center justify-center gap-2 mb-4 w-full">
                    <img src="/medit-logo.jpg" alt="Medit Icon" className="h-12 w-12 object-contain rounded-md" />
                    <img src="/medit-text.png" alt="Medit Text" className="h-5 object-contain" />
                  </div>
                  
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">ID / Usuario:</span>
                  <div className="bg-black/50 border border-white/5 rounded px-3 py-1.5 font-mono text-xs text-white break-all mb-4 w-full select-all">
                    smilecadlab@gmail.com
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('smilecadlab@gmail.com');
                      setCopiedText('medit');
                      setTimeout(() => setCopiedText(null), 2000);
                    }}
                    className="w-full border border-white/10 hover:border-white/30 text-white font-bold uppercase tracking-[0.1em] text-[10px] py-2 px-4 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedText === 'medit' ? (
                      <span className="text-green-400">✓ ¡Copiado!</span>
                    ) : (
                      <span>Copiar ID</span>
                    )}
                  </button>
                </div>

                {/* Shining 3D */}
                <div className="border border-white/10 p-6 rounded-lg bg-white/5 flex flex-col items-center text-center hover:border-white/20 transition-all duration-300">
                  {/* Shining 3D Logo */}
                  <div className="h-24 flex flex-col items-center justify-center gap-2 mb-4 w-full">
                    <img src="/shining-logo.png" alt="Shining 3D Icon" className="h-14 w-14 object-contain" />
                    <img src="/shining-text.png" alt="Shining 3D Text" className="h-5 object-contain" />
                  </div>

                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">ID / Usuario:</span>
                  <div className="bg-black/50 border border-white/5 rounded px-3 py-1.5 font-mono text-xs text-white break-all mb-4 w-full select-all">
                    smilecadlab@gmail.com
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('smilecadlab@gmail.com');
                      setCopiedText('shining');
                      setTimeout(() => setCopiedText(null), 2000);
                    }}
                    className="w-full border border-white/10 hover:border-white/30 text-white font-bold uppercase tracking-[0.1em] text-[10px] py-2 px-4 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedText === 'shining' ? (
                      <span className="text-green-400">✓ ¡Copiado!</span>
                    ) : (
                      <span>Copiar ID</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom info link */}
            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-gray-500 text-xs font-light">
                ¿Necesitas ayuda para conectar tu escáner?
                <br />
                <a
                  href="https://wa.me/34633801055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-1.5 mt-2 transition-colors"
                >
                  <MessageCircle size={12} className="text-[#25D366]" />
                  Contactar por WhatsApp
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 p-5 sm:p-8 max-w-md w-full relative my-auto max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex space-x-4 mb-8 border-b border-white/10 pb-2">
              <button
                onClick={() => setAuthMode('login')}
                className={`text-sm font-bold uppercase tracking-wider pb-2 ${authMode === 'login' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`text-sm font-bold uppercase tracking-wider pb-2 ${authMode === 'register' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Crear Cuenta
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setIsAuthModalOpen(false);
                setIsSendWorkModalOpen(true);
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Email</label>
                  <input required type="email" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Contraseña</label>
                  <input required type="password" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" />
                </div>
                <button type="submit" className="w-full mt-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs py-4 hover:bg-gray-200 transition-colors">
                  Entrar
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const clinica = formData.get('clinica');
                const email = formData.get('email');

                const subject = encodeURIComponent('Nuevo Registro de Clínica - ' + clinica);
                const body = encodeURIComponent(`Se ha registrado una nueva clínica.\n\nClínica: ${clinica}\nEmail: ${email}`);
                window.location.href = `mailto:smilecadlab@gmail.com?subject=${subject}&body=${body}`;

                setIsLoggedIn(true);
                setIsAuthModalOpen(false);
                setIsSendWorkModalOpen(true);
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Nombre de la Clínica</label>
                  <input required name="clinica" type="text" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Email</label>
                  <input required name="email" type="email" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Contraseña</label>
                  <input required type="password" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" />
                </div>
                <button type="submit" className="w-full mt-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs py-4 hover:bg-gray-200 transition-colors">
                  Registrarse
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Send Work Modal */}
      {isSendWorkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 p-5 sm:p-8 max-w-2xl w-full relative my-auto max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsSendWorkModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-white mb-6">
              Enviar Nuevo Trabajo
            </h3>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const paciente = formData.get('paciente');
              const color = formData.get('color');
              const notas = formData.get('notas');

              const subject = encodeURIComponent('Nuevo Trabajo - Paciente: ' + paciente);
              let bodyText = `Detalles del trabajo para el paciente: ${paciente}\n\n`;

              const selectedTeeth = Object.keys(teethConfig).map(Number).sort();
              bodyText += `- Dientes seleccionados: ${selectedTeeth.length > 0 ? selectedTeeth.join(', ') : 'Ninguno'}\n\n`;

              if (selectedTeeth.length > 0) {
                bodyText += `Configuración por diente:\n`;
                selectedTeeth.forEach(t => {
                  const c = teethConfig[t];
                  bodyText += `Diente ${t}: ${c.workType.toUpperCase()}`;
                  if (c.workType === 'pilar') bodyText += ` (Sobre ${c.pilarBase})`;
                  if (c.workType !== 'ferula') bodyText += ` - ${c.material?.toUpperCase()}`;
                  if (c.workType === 'pilar' && c.pilarBase === 'implantes') bodyText += ` - Implante: ${c.tipoImplante || 'No especificado'}`;
                  bodyText += `\n`;
                });
                bodyText += `\n`;
              }

              if (notas) {
                bodyText += `Notas del trabajo:\n${notas}\n\n`;
              }

              bodyText += `- Color: ${color}\n\n`;
              bodyText += `Archivos preparados:\n`;
              bodyText += `- Superior: ${stls.superior || 'No adjuntado'}\n`;
              bodyText += `- Inferior: ${stls.inferior || 'No adjuntado'}\n`;
              bodyText += `- Oclusión: ${stls.oclusion || 'No adjuntado'}\n`;

              const hasImplants = Object.values(teethConfig).some((c: ToothConfig) => c.workType === 'pilar' && c.pilarBase === 'implantes');
              if (hasImplants) {
                bodyText += `- Scanbodies: ${stls.scanbodies || 'No adjuntado'}\n`;
              }
              bodyText += `- Foto del paciente: ${stls.foto || 'No adjuntada'}\n`;

              bodyText += `\nPor favor, asegúrate de adjuntar estos archivos en este correo antes de enviarlo.`;

              const body = encodeURIComponent(bodyText);
              window.location.href = `mailto:smilecadlab@gmail.com?subject=${subject}&body=${body}`;
              setIsSendWorkModalOpen(false);
            }} className="space-y-6">

              {/* Paciente */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Nombre del Paciente</label>
                <input required name="paciente" type="text" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" />
              </div>

              {/* Selección Visual de Dientes */}
              <div className="border-y border-white/10 py-4">
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2 text-center">Selección de Dientes</label>
                <div className="flex justify-center space-x-4 mb-4 text-[10px] uppercase tracking-wider">
                  <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 inline-block mr-2"></span>Pilar</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-red-500 inline-block mr-2"></span>Póntico</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 inline-block mr-2"></span>Férula</span>
                </div>
                <ToothGrid teethConfig={teethConfig} activeTooth={activeTooth} onToothClick={handleToothClick} />
              </div>

              {/* Lógica de Salto (Configuración de Dientes) */}
              {activeTooth !== null && teethConfig[activeTooth] && (
                <div className="bg-white/5 p-4 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-white mb-4">Configurando diente: {activeTooth}</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Tipo de Trabajo</label>
                      <div className="flex space-x-2">
                        {['pilar', 'pontico', 'ferula'].map(t => (
                          <button
                            key={t} type="button"
                            onClick={() => updateActiveTooth({ workType: t as any })}
                            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${teethConfig[activeTooth].workType === t ? 'bg-white text-black border-white' : 'bg-black text-gray-400 border-white/20 hover:border-white/50'}`}
                          >
                            {t === 'ferula' ? 'Férula' : t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {teethConfig[activeTooth].workType === 'pilar' && (
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Base del Pilar</label>
                        <div className="flex space-x-2">
                          {['implantes', 'munones'].map(b => (
                            <button
                              key={b} type="button"
                              onClick={() => updateActiveTooth({ pilarBase: b as any })}
                              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${teethConfig[activeTooth].pilarBase === b ? 'bg-white text-black border-white' : 'bg-black text-gray-400 border-white/20 hover:border-white/50'}`}
                            >
                              Sobre {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {teethConfig[activeTooth].workType !== 'ferula' && (
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Material</label>
                        <div className="flex space-x-2">
                          {['metal', 'zirconio'].map(m => (
                            <button
                              key={m} type="button"
                              onClick={() => updateActiveTooth({ material: m as any })}
                              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${teethConfig[activeTooth].material === m ? 'bg-white text-black border-white' : 'bg-black text-gray-400 border-white/20 hover:border-white/50'}`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {teethConfig[activeTooth].workType === 'pilar' && teethConfig[activeTooth].pilarBase === 'implantes' && (
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Tipo de Implante / Marca</label>
                        <input
                          required
                          type="text"
                          value={teethConfig[activeTooth].tipoImplante || ''}
                          onChange={(e) => updateActiveTooth({ tipoImplante: e.target.value })}
                          className="w-full bg-black border border-white/20 px-4 py-2 text-white focus:outline-none focus:border-white transition-colors text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Color del Diente y Notas */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Color del Diente</label>
                  <input required name="color" type="text" placeholder="Ej: A1, A2, B1..." className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Notas de Trabajo (Opcional)</label>
                  <textarea name="notas" rows={3} placeholder="Escribe aquí cualquier detalle adicional..." className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"></textarea>
                </div>
              </div>

              {/* Archivos STL y Fotos (Drag & Drop) */}
              <div className="border-t border-white/10 pt-4">
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-4 text-center">Archivos y Fotos</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DragDropZone label="Superior" onFiles={(f) => setStls(s => ({ ...s, superior: f[0].name }))} />
                  <DragDropZone label="Inferior" onFiles={(f) => setStls(s => ({ ...s, inferior: f[0].name }))} />
                  <DragDropZone label="Oclusión" onFiles={(f) => setStls(s => ({ ...s, oclusion: f[0].name }))} />
                  {Object.values(teethConfig).some((c: ToothConfig) => c.workType === 'pilar' && c.pilarBase === 'implantes') && (
                    <div className="md:col-span-3">
                      <DragDropZone label="Scanbodies" onFiles={(f) => setStls(s => ({ ...s, scanbodies: f[0].name }))} />
                    </div>
                  )}
                  <div className="md:col-span-3">
                    <DragDropZone label="Foto del Paciente (Opcional)" accept="image/*" onFiles={(f) => setStls(s => ({ ...s, foto: f[0].name }))} />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs py-4 hover:bg-gray-200 transition-colors">
                Preparar Envío
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Catalog Modal */}
      {isCatalogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 p-5 sm:p-8 max-w-md w-full relative my-auto max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsCatalogModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-white mb-6">
              Solicitar Catálogo
            </h3>
            <form onSubmit={handleCatalogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">
                  Nombre de la Clínica
                </label>
                <input
                  required
                  name="clinica"
                  type="text"
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">
                  Localidad
                </label>
                <input
                  required
                  name="localidad"
                  type="text"
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">
                  Email
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">
                  Teléfono
                </label>
                <input
                  required
                  name="telefono"
                  type="tel"
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {catalogEmailStatus === 'success' && (
                <div className="text-green-400 text-xs font-bold text-center uppercase tracking-widest mt-2">
                  ¡Solicitud enviada con éxito!
                </div>
              )}
              {catalogEmailStatus === 'error' && (
                <div className="text-red-400 text-xs text-center mt-2">
                  Hubo un problema. Por favor intenta más tarde o contáctanos por WhatsApp.
                </div>
              )}

              <button
                type="submit"
                disabled={isSendingCatalogEmail || catalogEmailStatus === 'success'}
                className={`w-full mt-6 font-bold uppercase tracking-[0.2em] text-xs py-4 transition-colors ${isSendingCatalogEmail || catalogEmailStatus === 'success' ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'
                  }`}
              >
                {isSendingCatalogEmail ? 'Enviando...' : catalogEmailStatus === 'success' ? 'Enviado' : 'Enviar Solicitud'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 p-5 sm:p-8 max-w-md w-full relative my-auto max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setIsContactModalOpen(false);
                setTimeout(() => setContactModalView('options'), 300);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {contactModalView === 'options' ? (
              <>
                <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-white mb-6 text-center">
                  Opciones de Contacto
                </h3>
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => setContactModalView('emailForm')}
                    className="flex items-center justify-center space-x-3 bg-white text-black font-bold uppercase tracking-[0.1em] text-xs py-4 hover:bg-gray-200 transition-colors w-full"
                  >
                    <Mail size={18} />
                    <span>Enviar Correo</span>
                  </button>
                  <a
                    href="tel:+34633801055"
                    className="flex items-center justify-center space-x-3 bg-white text-black font-bold uppercase tracking-[0.1em] text-xs py-4 hover:bg-gray-200 transition-colors"
                  >
                    <Phone size={18} />
                    <span>Llamar (633 801 055)</span>
                  </a>
                  <a
                    href="https://wa.me/34633801055"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-[#25D366] text-white font-bold uppercase tracking-[0.1em] text-xs py-4 hover:bg-[#20b858] transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => setContactModalView('options')}
                    className="text-gray-400 hover:text-white text-xs uppercase tracking-widest flex items-center"
                  >
                    <span className="mr-2">◀</span> Volver
                  </button>
                  <h3 className="text-xl font-display font-bold uppercase tracking-wide text-white ml-auto mr-auto">
                    Enviar Mensaje
                  </h3>
                  <div className="w-16"></div>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();

                  // Reset status and start loading
                  setIsSendingEmail(true);
                  setEmailStatus('idle');

                  try {
                    // Send using EmailJS with the user's public key
                    // Note: We need the Service ID and Template ID to make this actually work
                    await emailjs.sendForm(
                      'service_zejjuxe', // Service ID
                      'template_v6rgz0c', // Template ID
                      e.currentTarget,
                      'v-P-T2Anln1robHSj' // Public Key
                    );

                    setEmailStatus('success');

                    // Close the modal after 2 seconds on success
                    setTimeout(() => {
                      setIsContactModalOpen(false);
                      setTimeout(() => {
                        setContactModalView('options');
                        setEmailStatus('idle');
                      }, 300);
                    }, 2000);

                  } catch (error) {
                    console.error('Error al enviar el correo:', error);
                    setEmailStatus('error');
                  } finally {
                    setIsSendingEmail(false);
                  }

                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Tu Email</label>
                    <input required name="email" type="email" placeholder="ejemplo@correo.com" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">Mensaje</label>
                    <textarea required name="message" rows={4} placeholder="Escribe tu mensaje aquí..." className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"></textarea>
                  </div>

                  {emailStatus === 'success' && (
                    <div className="text-green-400 text-xs font-bold text-center uppercase tracking-widest mt-2">
                      ¡Mensaje enviado con éxito!
                    </div>
                  )}
                  {emailStatus === 'error' && (
                    <div className="text-red-400 text-xs text-center mt-2">
                      Hubo un problema. Por favor intenta más tarde o contáctanos por WhatsApp.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSendingEmail || emailStatus === 'success'}
                    className={`w-full mt-6 font-bold uppercase tracking-[0.2em] text-xs py-4 transition-colors ${isSendingEmail || emailStatus === 'success' ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'
                      }`}
                  >
                    {isSendingEmail ? 'Enviando...' : emailStatus === 'success' ? 'Enviado' : 'Enviar Correo'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Work Modal */}
      {isWorkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-[#111] border border-white/10 ${workModalView === 'main' ? 'p-8 max-w-2xl' : 'p-0 max-w-4xl md:overflow-hidden'} w-full relative max-h-[90vh] overflow-y-auto md:max-h-none`}
          >
            <button
              onClick={() => {
                setIsWorkModalOpen(false);
                setTimeout(() => setWorkModalView('main'), 300);
              }}
              className={`absolute top-4 right-4 z-50 transition-colors ${workModalView === 'main' ? 'text-gray-400 hover:text-white' : 'text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-md'}`}
            >
              <X size={24} />
            </button>

            {workModalView === 'main' ? (
              <>
                <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-white mb-6 text-center">
                  Nuestros Trabajos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setWorkModalView('splintbrux')}
                    className="group relative h-40 overflow-hidden border border-white/10 hover:border-white/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                    <img src="/splintbrux.jpg" alt="SplintBruX" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-500" />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 text-left">
                      <span className="text-white font-display font-bold uppercase tracking-[0.1em] text-sm mb-1 group-hover:-translate-y-1 transition-transform duration-300">SplintBruX</span>
                      <span className="text-gray-400 text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">Ver Detalles →</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setWorkModalView('prueba-fri')}
                    className="group relative h-40 overflow-hidden border border-white/10 hover:border-white/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                    <img src="/prueba-fri.jpg" alt="Prueba F.R.I" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-500" />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 text-left">
                      <span className="text-white font-display font-bold uppercase tracking-[0.1em] text-sm mb-1 group-hover:-translate-y-1 transition-transform duration-300">Prueba F.R.I</span>
                      <span className="text-gray-400 text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">Ver Detalles →</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setWorkModalView('ibar')}
                    className="group relative h-40 overflow-hidden border border-white/10 hover:border-white/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                    <img src="/ibar-photo.png" alt="iBar" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-500" />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 text-left">
                      <span className="text-white font-display font-bold uppercase tracking-[0.1em] text-sm mb-1 group-hover:-translate-y-1 transition-transform duration-300">iBar</span>
                      <span className="text-gray-400 text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">Ver Detalles →</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setWorkModalView('zirconio')}
                    className="group relative h-40 overflow-hidden border border-white/10 hover:border-white/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                    <img src="/zirconio-munon.jpg" alt="Zirconio" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-500" />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 text-left">
                      <span className="text-white font-display font-bold uppercase tracking-[0.1em] text-sm mb-1 group-hover:-translate-y-1 transition-transform duration-300">Zirconio</span>
                      <span className="text-gray-400 text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">Ver Detalles →</span>
                    </div>
                  </button>
                </div>
              </>
            ) : workModalView === 'zirconio' ? (
              <div className="flex flex-col md:flex-row md:h-[70vh] bg-black">
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-64 md:h-full shrink-0">
                  <img src="/zirconio-munon.jpg" alt="Zirconio" className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={() => setWorkModalView('main')} className="absolute top-4 left-4 bg-black/40 text-white/80 hover:text-white p-2 border border-white/10 rounded-full backdrop-blur-md hover:bg-black/60 transition-all flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest px-2 font-bold">◀ Volver</span>
                  </button>
                </div>
                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#111] border-l border-white/5">
                  <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-widest text-white mb-6">
                    Zirconio
                  </h3>
                  <div className="w-12 h-1 bg-white mb-6"></div>
                  <p className="text-gray-400 text-sm leading-relaxed tracking-wide mb-6">
                    Descubre la precisión y resistencia inigualable de nuestras estructuras. Diseñadas mediante CAD/CAM para garantizar un ajuste pasivo perfecto y una estética natural impecable.
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">Nivel de Translucidez</p>
                  <div className="w-full bg-white/10 h-1 mb-8">
                    <div className="bg-white h-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            ) : workModalView === 'ibar' ? (
              <div className="flex flex-col md:flex-row md:h-[70vh] bg-black">
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-64 md:h-full shrink-0">
                  <img src="/ibar-photo.png" alt="iBar" className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={() => setWorkModalView('main')} className="absolute top-4 left-4 bg-black/40 text-white/80 hover:text-white p-2 border border-white/10 rounded-full backdrop-blur-md hover:bg-black/60 transition-all flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest px-2 font-bold">◀ Volver</span>
                  </button>
                </div>
                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#111] border-l border-white/5">
                  <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-widest text-white mb-6">
                    iBar
                  </h3>
                  <div className="w-12 h-1 bg-white mb-6"></div>
                  <p className="text-gray-400 text-sm leading-relaxed tracking-wide mb-6">
                    La revolución en estructuras de barras. Ingeniería de precisión que ofrece una retención superior y una gran resistencia a nuestro zirconio.
                  </p>
                  <ul className="text-gray-500 text-xs tracking-wide space-y-2 mt-4">
                    <li className="flex items-center"><span className="w-1 h-1 bg-white rounded-full mr-2"></span> Mecanizado en Titanio</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white rounded-full mr-2"></span> Perfil higiénico optimizado</li>
                  </ul>
                </div>
              </div>
            ) : workModalView === 'splintbrux' ? (
              <div className="flex flex-col md:flex-row md:h-[70vh] bg-black">
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-64 md:h-full shrink-0">
                  <img src="/splintbrux.jpg" alt="SplintBruX" className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={() => setWorkModalView('main')} className="absolute top-4 left-4 bg-black/40 text-white/80 hover:text-white p-2 border border-white/10 rounded-full backdrop-blur-md hover:bg-black/60 transition-all flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest px-2 font-bold">◀ Volver</span>
                  </button>
                </div>
                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#111] border-l border-white/5">
                  <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-widest text-white mb-6">
                    SplintBruX
                  </h3>
                  <div className="w-12 h-1 bg-white mb-6"></div>
                  <p className="text-gray-400 text-sm leading-relaxed tracking-wide mb-6">
                    Férulas de descarga de última generación. Fabricadas con la resina más avanzada para ofrecer un confort superior, durabilidad extrema y una protección articular garantizada.
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">Resistencia a la Fractura</p>
                  <div className="w-full bg-white/10 h-1 mb-8">
                    <div className="bg-white h-full w-[95%]"></div>
                  </div>
                </div>
              </div>
            ) : workModalView === 'prueba-fri' ? (
              <div className="flex flex-col md:flex-row md:h-[70vh] bg-black">
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-64 md:h-full shrink-0">
                  <img src="/prueba-fri.jpg" alt="Prueba F.R.I" className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={() => setWorkModalView('main')} className="absolute top-4 left-4 bg-black/40 text-white/80 hover:text-white p-2 border border-white/10 rounded-full backdrop-blur-md hover:bg-black/60 transition-all flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest px-2 font-bold">◀ Volver</span>
                  </button>
                </div>
                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#111] border-l border-white/5">
                  <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-widest text-white mb-2 leading-tight">
                    Prueba<br />F.R.I.
                  </h3>
                  <div className="w-12 h-1 bg-white mb-6 mt-4"></div>
                  <p className="text-gray-400 text-sm leading-relaxed tracking-wide mb-6">
                    Innovación en pasividad. Permite visualizar el resultado de la pasividad de la estructura.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
                    <p className="text-gray-300 text-xs italic tracking-wide text-center">
                      "El paso inicial imprescindible para garantizar el ajuste perfecto en rehabilitaciones."
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      )}

      <main>
        <FullScreenSection
          id="inicio"
          title="Transforma tus ideas en realidad"
          subtitle="Laboratorio dental 100% digital en Granada. Precisión, rapidez y resultados excepcionales mediante tecnología CAD/CAM."
          video="/unete-revolucion.mp4"
          buttonText="Enviar Trabajo"
          onButtonClick={() => {
            setIsSendWorkOptionsOpen(true);
          }}
        />
        <FullScreenSection
          id="nosotros"
          title="Precisión Absoluta"
          subtitle="Resultados detallados y personalizados para cada paciente con un ajuste perfecto. Materiales de primera calidad."
          image="/precision-absoluta.png"
          buttonText="Ver Trabajos"
          onButtonClick={() => setIsWorkModalOpen(true)}
        />
        <FullScreenSection
          id="catalogo"
          title="Nuestro Catálogo"
          subtitle="Optimización de procesos mediante herramientas CAD/CAM de última generación. El futuro de la prótesis dental."
          video="/video-portada-sin-vuelta.mp4"
          containVideo={true}
          align="right"
          buttonText="Pedir Catálogo"
          onButtonClick={() => setIsCatalogModalOpen(true)}
        />
        <FullScreenSection
          id="contacto"
          title="Únete a la revolución"
          subtitle="Simplificamos el flujo de trabajo entre clínica y laboratorio. Envía tus escaneados intraorales y nosotros nos encargamos del resto."
          image="/contacto-bg.png"
          align="center"
          buttonText="Contactar Ahora"
          onButtonClick={() => setIsContactModalOpen(true)}
        />
        <MapSection />
      </main>
      <Footer onPrivacyClick={() => setIsPrivacyModalOpen(true)} />

      {/* Privacy Modal */}
      {
        isPrivacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto pt-20 pb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#111] border border-white/10 p-8 md:p-12 max-w-3xl w-full relative my-auto"
            >
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide text-white mb-6 text-center border-b border-white/20 pb-4">
                Protección de Datos del Paciente
              </h3>
              <div className="text-gray-300 text-sm md:text-base space-y-4 leading-relaxed max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                <p>
                  En SMILECAD, la privacidad y seguridad de la información médica de sus pacientes es nuestra máxima prioridad.
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider text-sm mt-6 mb-2">1. Confidencialidad Absoluta</h4>
                <p>
                  Todos los datos, escaneos intraorales, modelos 3D y especificaciones clínicas enviados a través de nuestra plataforma o cualquier otro medio son tratados bajo la más estricta confidencialidad médica.
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider text-sm mt-6 mb-2">2. Uso Exclusivo</h4>
                <p>
                  Los datos suministrados se utilizarán única y exclusivamente para el diseño, fabricación y entrega de la prótesis o dispositivo dental solicitado. Ningún dato será compartido, vendido o distribuido a terceros ajenos al proceso de fabricación específico de dicho trabajo.
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider text-sm mt-6 mb-2">3. Retención y Eliminación</h4>
                <p>
                  Los archivos clínicos y digitales asociados a los pacientes son resguardados en servidores seguros por el tiempo estrictamente necesario estipulado por las normativas de salud vigentes para garantizar trazabilidad y garantía del producto. Una vez transcurrido este plazo, los datos personales identificables son destruidos o anonimizados completamente.
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider text-sm mt-6 mb-2">4. Anonimización</h4>
                <p>
                  Recomendamos a todas las clínicas asociadas el envío de trabajos mediante identificadores numéricos o códigos de paciente internos, evitando siempre que sea posible compartir nombres completos o datos de identificación directa que no sean indispensables para la confección del trabajo.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 text-center">
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="bg-white text-black font-bold uppercase tracking-widest text-sm py-3 px-8 hover:bg-gray-200 transition-colors"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )
      }

    </div >
  );
}

