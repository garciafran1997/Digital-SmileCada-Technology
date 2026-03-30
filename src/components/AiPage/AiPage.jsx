import React, { useState, useRef, useEffect } from 'react';
import './AiPage.css';
import { dentalDatabase } from './dentalDatabase';

const AiPage = ({ onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isShadeMode, setIsShadeMode] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const modeMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modeMenuRef.current && !modeMenuRef.current.contains(event.target)) {
        setShowModeMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  const dentalKeywords = [
    'diente', 'muela', 'implante', 'ortodoncia', 'smilecad', 'dental', 'dentista', 
    'carilla', 'corona', 'puente', 'bracket', 'cad', 'cam', 'smile', 'blanqueamiento',
    'encia', 'periodoncia', 'endodoncia', 'cirugia', 'estetica', 'tecnologia',
    'tecnico', 'laboratorio', 'protesis', 'digital', 'scanner', 'escaner',
    'denture', 'odontologia', 'pieza', 'bucal', 'boca', 'fresadora', 'impresora',
    'muñon', 'tallado', 'zirconio', 'color', 'vita', 'guia', 'shade', 'analiza'
  ];

  const [samplingPoint, setSamplingPoint] = useState(null);
  const [grayPoint, setGrayPoint] = useState(null);
  const [calibratingGray, setCalibratingGray] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSamplingPoint(null);
        setGrayPoint(null);
        setCalibratingGray(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width);
    const y = ((e.clientY - rect.top) / rect.height);
    
    if (calibratingGray) {
      setGrayPoint({ x, y });
      setCalibratingGray(false);
    } else {
      setSamplingPoint({ x, y });
    }
  };

  const analyzeColor = (dataUrl, toothCoords = null, grayCoords = null) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        let rCorrection = 1, gCorrection = 1, bCorrection = 1;

        // 1. Gray Card Normalization
        if (grayCoords) {
          const gSize = Math.max(10, Math.min(img.width, img.height) * 0.03);
          const gx = grayCoords.x * img.width - gSize/2;
          const gy = grayCoords.y * img.height - gSize/2;
          const gData = ctx.getImageData(gx, gy, gSize, gSize).data;
          
          let gr = 0, gg = 0, gb = 0;
          for (let i = 0; i < gData.length; i += 4) {
            gr += gData[i]; gg += gData[i+1]; gb += gData[i+2];
          }
          const gAvgR = gr / (gData.length / 4);
          const gAvgG = gg / (gData.length / 4);
          const gAvgB = gb / (gData.length / 4);
          
          // Neutral Gray Target (119 is approx 18% in sRGB with gamma 2.2)
          const target = (gAvgR + gAvgG + gAvgB) / 3;
          rCorrection = target / gAvgR;
          gCorrection = target / gAvgG;
          bCorrection = target / gAvgB;
        }

        // 2. Tooth Sampling
        const tSize = Math.max(5, Math.min(img.width, img.height) * 0.02);
        const tx = toothCoords ? toothCoords.x * img.width - tSize/2 : (img.width - tSize) / 2;
        const ty = toothCoords ? toothCoords.y * img.height - tSize/2 : (img.height - tSize) / 2;
        
        const tData = ctx.getImageData(tx, ty, tSize, tSize).data;
        
        let r = 0, g = 0, b = 0;
        let isClipped = false;

        for (let i = 0; i < tData.length; i += 4) {
          if (tData[i] >= 253 || tData[i+1] >= 253 || tData[i+2] >= 253) isClipped = true;
          // Apply correction
          r += tData[i] * rCorrection;
          g += tData[i+1] * gCorrection;
          b += tData[i+2] * bCorrection;
        }
        const count = tData.length / 4;
        const normR = Math.min(255, r / count);
        const normG = Math.min(255, g / count);
        const normB = Math.min(255, b / count);
        
        // 3. Convert sRGB to CIELAB
        const userLab = dentalDatabase.utils.srgb2lab(normR, normG, normB);
        
        // 4. Find closest VITA shade using CIEDE2000
        let closestShade = "A2";
        let minDeltaE = Infinity;
        
        Object.entries(dentalDatabase.knowledge.vitaguide.labValues).forEach(([shade, lab]) => {
          const dE = dentalDatabase.utils.deltaE2000(userLab, lab);
          if (dE < minDeltaE) {
            minDeltaE = dE;
            closestShade = shade;
          }
        });
        
        resolve({ shade: closestShade, deltaE: minDeltaE, isClipped, calibrated: !!grayCoords });
      };
      img.src = dataUrl;
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() && !selectedImage) return;

    const userMessage = { 
      text: inputValue, 
      sender: 'user',
      image: selectedImage,
      point: samplingPoint
    };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = inputValue.toLowerCase();
    const isDental = dentalKeywords.some(keyword => lowerInput.includes(keyword)) || selectedImage;

    if (selectedImage) {
      setIsAnalyzing(true);
      const { shade, deltaE, isClipped, calibrated } = await analyzeColor(selectedImage, samplingPoint, grayPoint);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        const report = dentalDatabase.shadeAnalysis.generateReport(shade, deltaE);
        
        const response = `**[REPORTE COLORIMÉTRICO PROFESIONAL PANTHOX]**\n\n` +
          `✅ **Normalización**: ${calibrated ? 'ACTIVA (Referencia Gris 18%)' : 'Modo Estándar'}\n` +
          `${isClipped ? `⚠️ **ALERTA**: Clipping detectado. Evite brillos directos.\n` : ''}` +
          `🎯 **Delta E (ΔE 2000)**: **${report.metrics.deltaE}**\n` +
          `📊 **Indice de Confianza**: ${report.metrics.confidence}\n\n` +
          `**EQUIVALENCIAS CLÍNICAS**\n` +
          `• **VITA 3D-Master**: ${report.vita3DMaster}\n` +
          `• **VITA Classical**: ${report.vitaClassical}\n` +
          `• **Chromascop**: ${report.chromascop}\n\n` +
          `**DESGLOSE TÉCNICO**\n` +
          `1. **Cervical**: ${report.zones.cervical.shade}\n` +
          `2. **Cuerpo (Body)**: ${report.zones.body.shade}\n\n` +
          `**NOTAS**: ${report.clinicalNote}`;

        setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
        setSelectedImage(null);
        setSamplingPoint(null);
        setGrayPoint(null);
        setInputValue('');
        setIsShadeMode(false);
      }, 2500);
      return;
    }

    // Existing text-only logic...
    setTimeout(() => {
      let response = "";
      
      if (isDental) {
        // Search in protocols
        const foundProtocolKey = Object.keys(dentalDatabase.protocols).find(key => lowerInput.includes(key));
        const foundHardwareKey = Object.keys(dentalDatabase.hardware).find(key => lowerInput.includes(key.substring(0, key.length - 1)) || lowerInput.includes(key));

        if (lowerInput.includes('hola')) {
          response = "¡Hola! Soy PanthoX. Puedo asesorarte sobre odontología digital o **analizar el color dental de tus fotos** según la guía VITA. ¿Qué necesitas hoy?";
        } else if (foundProtocolKey && (lowerInput.includes('protocolo') || lowerInput.includes('pasos'))) {
          const proto = dentalDatabase.protocols[foundProtocolKey];
          response = `**${proto.title}**\n\n${proto.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n${proto.description || ""}`;
        } else if (foundHardwareKey) {
          const hw = dentalDatabase.hardware[foundHardwareKey];
          response = `En cuanto a **${foundHardwareKey}**, trabajamos con sistemas líderes como: ${hw.items.join(', ')}.\n\n${hw.description}`;
        } else if (lowerInput.includes('material')) {
          response = `La elección del material es crítica: ${dentalDatabase.knowledge.materiales}`;
        } else if (lowerInput.includes('color') || lowerInput.includes('vita')) {
          response = "Para identificar un color, por favor **sube una fotografía clara** de la pieza dental junto a una pestaña de la guía VITA si es posible. Analizaré el valor, croma y matiz instantáneamente.";
        } else if (lowerInput.includes('muñon') || lowerInput.includes('tallado')) {
          response = `Sobre el tallado de muñones: ${dentalDatabase.knowledge.tallado} Además, seguimos este protocolo:\n\n${dentalDatabase.protocols.coronas.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
        } else if (lowerInput.includes('smilecad')) {
          response = dentalDatabase.knowledge.smilecad;
        } else {
          response = dentalDatabase.genericResponses.senseCommon + " " + dentalDatabase.genericResponses.noFound;
        }
      } else {
        response = "Solo estoy diseñado para el sector dental. Fuera de lo dental no responderé nada.";
      }

      const aiMessage = { text: response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);

    setInputValue('');
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    setSelectedImage(null);
  };

  return (
    <div className="ai-page-container">
      <header className="ai-header">
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          VOLVER
        </button>
        
        {messages.length > 0 && (
          <button className="new-chat-button" onClick={handleNewChat}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            NUEVO CHAT
          </button>
        )}
      </header>

      <main className="ai-content">
        <div className={`brand-container ${messages.length > 0 ? 'minimized' : ''}`}>
          <video 
            src="/IA.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="brand-video"
          />
        </div>

        {messages.length > 0 && (
          <div className="chat-history">
            {messages.map((msg, index) => (
              <div key={index} className={`message-bubble ${msg.sender}`}>
                {msg.image && <img src={msg.image} alt="Upload" className="message-image" />}
                {msg.text && <p>{msg.text}</p>}
              </div>
            ))}
            {isAnalyzing && (
              <div className="message-bubble ai analyzing">
                <div className="scanner-line"></div>
                <p>Realizando mapeo zonal y detección de propiedades ópticas (Opalescencia, Fluorescencia, Mamelones)...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className={`ai-input-wrapper ${messages.length > 0 ? 'chatting' : ''}`}>
          {selectedImage && (
            <div className="image-preview-container interactive">
              <div className="preview-header">
                <div className="preview-instruction">
                  {!grayPoint && !calibratingGray ? "📍 1. Calibrar Tarjeta Gris (Opcional)" : 
                   calibratingGray ? "🔘 Toca el área gris neutra" :
                   !samplingPoint ? "🦷 2. Toca el diente para medir" : "✅ Preparado para procesar"}
                </div>
                {!grayPoint && (
                  <button 
                    className={`calibrate-btn ${calibratingGray ? 'active' : ''}`}
                    onClick={() => setCalibratingGray(!calibratingGray)}
                  >
                    {calibratingGray ? "CANCELAR" : "CALIBRAR GRIS"}
                  </button>
                )}
              </div>

              <div className="interactive-preview-wrapper" onClick={handleImageClick}>
                <img src={selectedImage} alt="Preview" className="image-preview large" />
                
                {grayPoint && (
                  <div 
                    className="sampling-pointer gray-pointer"
                    style={{ left: `${grayPoint.x * 100}%`, top: `${grayPoint.y * 100}%` }}
                  >
                    <div className="pointer-crosshair"></div>
                  </div>
                )}

                {samplingPoint && (
                  <div 
                    className="sampling-pointer"
                    style={{ left: `${samplingPoint.x * 100}%`, top: `${samplingPoint.y * 100}%` }}
                  >
                    <div className="pointer-crosshair"></div>
                    <div className="pointer-ripple"></div>
                  </div>
                )}
              </div>
              <button className="remove-image" onClick={() => {
                setSelectedImage(null);
                setSamplingPoint(null);
                setGrayPoint(null);
                setCalibratingGray(false);
              }}>×</button>
            </div>
          )}
          
          <form className="ai-input-container" onSubmit={handleSendMessage}>
            <div className="mode-selector-wrapper" ref={modeMenuRef}>
              <button 
                type="button" 
                className={`mode-selector-trigger ${isShadeMode ? 'shade-mode' : ''}`}
                onClick={() => setShowModeMenu(!showModeMenu)}
              >
                {isShadeMode ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="2"/>
                    <path d="M12 2v8M12 14v8M10.41 6.59L12 5l1.59 1.59M13.59 17.41L12 19l-1.59-1.59"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                )}
                <svg className={`chevron ${showModeMenu ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {showModeMenu && (
                <div className="mode-dropdown-menu">
                  <button 
                    type="button" 
                    className={`menu-item ${!isShadeMode ? 'active' : ''}`}
                    onClick={() => {
                      setIsShadeMode(false);
                      setShowModeMenu(false);
                    }}
                  >
                    <div className="menu-item-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </div>
                    <div className="menu-item-content">
                      <span className="menu-item-title">Escribir cualquier cosa</span>
                      <span className="menu-item-desc">Chat general impulsado por IA</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    className={`menu-item ${isShadeMode ? 'active' : ''}`}
                    onClick={() => {
                      setIsShadeMode(true);
                      setShowModeMenu(false);
                      fileInputRef.current.click();
                    }}
                  >
                    <div className="menu-item-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="2"/>
                        <path d="M12 2v8M12 14v8M10.41 6.59L12 5l1.59 1.59M13.59 17.41L12 19l-1.59-1.59"/>
                      </svg>
                    </div>
                    <div className="menu-item-content">
                      <span className="menu-item-title">Identificar color del diente</span>
                      <span className="menu-item-desc">Análisis colorimétrico avanzado</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button 
              type="button" 
              className="quick-upload-btn" 
              onClick={() => fileInputRef.current.click()}
              title="Subir imagen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>
            
            
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden-file-input" 
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <input 
              type="text" 
              placeholder="¿Qué quieres saber?" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="ai-input"
            />
            <button type="submit" className="ai-send-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AiPage;
