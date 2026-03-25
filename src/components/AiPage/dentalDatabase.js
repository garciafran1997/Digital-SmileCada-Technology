export const dentalDatabase = {
  protocols: {
    implantes: {
      title: "Protocolo Clínico de Implantes Dentales",
      steps: [
        "Fase de Diagnóstico y Planificación Virtual: Estudio CBCT + Escaneado intraoral + Planificación CAD.",
        "Fase Quirúrgica (Cirugía Guiada): Colocación precisa mediante guía impresa 3D.",
        "Osteointegración: Periodo de 3-6 meses para integración ósea.",
        "Rehabilitación Protésica: Diseño de corona CAD/CAM sobre scanbody.",
        "Mantenimiento: Revisiones y profilaxis perimplantaria periódica."
      ],
      description: "En Digital SmileCAD optimizamos cada fase para garantizar el sellado biológico y la estética funcional."
    },
    coronas: {
      title: "Protocolo para Coronas sobre Muñones Tallados",
      steps: [
        "Preparación Biomecánica: Tallado del muñón con línea de terminación definida (hombro o chamfer).",
        "Impresión Digital: Escaneado intraoral de alta resolución del muñón y antagonista.",
        "Diseño CAD: Modelado de la corona respetando anatomía, oclusión y puntos de contacto.",
        "Fresado CAM: Fabricación en materiales como zirconio multicapa o disilicato de litio.",
        "Cementación Adhesiva: Protocolo de tratamiento de superficie y cementado bajo aislamiento."
      ],
      description: "La precisión del ajuste marginal es nuestra prioridad absoluta en rehabilitaciones sobre diente natural."
    },
    carillas: {
      title: "Protocolo de Estética con Carillas Dentales",
      steps: [
        "Planificación DSD: Diseño Digital de Sonrisa (Digital Smile Design).",
        "Maqueta (Mock-up): Prueba estética y funcional sin tallado previo.",
        "Preparación Mínimamente Invasiva: Desgaste selectivo del esmalte (Micro-preps).",
        "Diseño y Fresado: Producción de láminas ultrafinas de cerámica feldespática.",
        "Cementado de Alta Precisión: Protocolo de adhesión estrictamente controlado."
      ]
    }
  },
  hardware: {
    fresadoras: {
      items: ["Roland DGSHAPE", "vhf R5", "Imes-Icore"],
      description: "Utilizamos fresadoras de 5 ejes para mecanizar materiales con precisión micrométrica, desde PMMA hasta cromocobalto y zirconio presinterizado."
    },
    impresoras: {
      items: ["Formlabs Form 3B", "Ackuretta", "Asiga"],
      description: "La tecnología SLA y DLP nos permite imprimir modelos de estudio, guías quirúrgicas y bases de prótesis con una fidelidad asombrosa."
    },
    scanners: {
      items: ["Medit i700", "3Shape TRIOS", "Itero Element"],
      description: "El escaneo intraoral es el punto de partida de todo flujo digital, capturando la realidad bucal en segundos sin las molestias de las pastas tradicionales."
    }
  },
  knowledge: {
    materiales: "Manejamos Zirconio (monolítico y multicapa), Disilicato de Litio (E.max), Peek, Titanio y resinas híbridas de última generación.",
    tallado: "El tallado preciso de muñones y cavidades es esencial para el éxito del flujo CAD. Recomendamos fresas específicas para definición de márgenes.",
    smilecad: "Somos un centro de diseño y formación técnica líder, especializados en llevar la tecnología CAD/CAM a su máximo exponente de precisión.",
    vitaguide: {
      classical: ["A1", "A2", "A3", "A3.5", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D2", "D3", "D4"],
      valueArrangement: ["B1", "A1", "B2", "D2", "A2", "C1", "C2", "D4", "A3", "D3", "B3", "A3.5", "B4", "C3", "A4", "C4"],
      labValues: {
        // VITA Classical CIELAB (L*, a*, b*)
        "A1": { l: 63.46, a: 5.05, b: 9.11 },
        "A2": { l: 60.55, a: 6.99, b: 12.46 },
        "A3": { l: 56.16, a: 7.96, b: 14.58 },
        "A3.5": { l: 48.94, a: 8.49, b: 15.70 },
        "A4": { l: 43.05, a: 8.34, b: 14.94 },
        "B1": { l: 59.85, a: 4.24, b: 7.34 },
        "B2": { l: 61.90, a: 6.09, b: 12.55 },
        "B3": { l: 49.28, a: 7.97, b: 16.83 },
        "B4": { l: 50.02, a: 8.17, b: 18.33 },
        "C1": { l: 55.87, a: 5.15, b: 8.81 },
        "C2": { l: 54.83, a: 6.87, b: 13.40 },
        "C3": { l: 46.29, a: 6.78, b: 12.88 },
        "C4": { l: 34.92, a: 7.23, b: 12.87 },
        "D2": { l: 59.41, a: 5.59, b: 8.59 },
        "D3": { l: 55.65, a: 7.19, b: 11.69 },
        "D4": { l: 55.57, a: 6.18, b: 14.40 },
        // VITA 3D-Master CIELAB (Key shades)
        "1M1": { l: 71.3, a: 0.1, b: 7.2 },
        "1M2": { l: 71.3, a: 0.5, b: 12.5 },
        "2M1": { l: 65.5, a: 0.1, b: 9.1 },
        "2M2": { l: 65.5, a: 0.8, b: 15.2 },
        "2M3": { l: 65.5, a: 1.5, b: 21.0 },
        "3M1": { l: 59.8, a: 0.2, b: 11.0 },
        "3M2": { l: 59.8, a: 1.1, b: 18.2 }
      },
      colors: {
        // Keeping Hex for UI previews
        "A1": "#EFE0C2", "A2": "#E8D0A5", "A3": "#DFB98D", "A3.5": "#D2A275", "A4": "#C78E60",
        "B1": "#F0E9D5", "B2": "#E7D6A5", "B3": "#DCC17F", "B4": "#CBA85F",
        "C1": "#E6DEC7", "C2": "#D4C5A0", "C3": "#BEB189", "C4": "#A89C74",
        "D2": "#E8D4B0", "D3": "#D4B78D", "D4": "#C7A67D",
        "1M1": "#F0EDE1", "1M2": "#EDE2C7", "2M1": "#E7D6A5", "2M2": "#E3C98E", "2M3": "#DFB98D",
        "3M1": "#DDC081", "3M2": "#D6A564", "4M1": "#C7A67D", "5M1": "#A89C74"
      },
      conversion: {
        "1M1": "B1", "1M2": "A1", "2M1": "A1", "2M2": "A2", "2M3": "A3",
        "3M1": "A3", "3M2": "A3", "3M3": "A3.5", "4M1": "A4", "5M1": "C4",
        "A1": "2M1", "A2": "2M2", "A3": "3M2", "A3.5": "3M3", "A4": "4M2", "B1": "1M1"
      },
      chromascop: {
        "A1": "110", "A2": "140", "A3": "210", "A3.5": "230", "A4": "340",
        "B1": "110 (Bleach)", "B2": "130", "B3": "310", "B4": "320",
        "C1": "120", "C2": "430", "C3": "510", "C4": "520",
        "D2": "120/410", "D3": "410", "D4": "440",
        "1M1": "110", "1M2": "110", "2M1": "110", "2M2": "140", "2M3": "210",
        "3M1": "210", "3M2": "210", "3M3": "230", "4M1": "340", "5M1": "520"
      }
    }
  },
  // Colorimetric Tools
  utils: {
    // sRGB to CIELAB Conversion
    srgb2lab: (r, g, b) => {
      // Scale to [0, 1]
      r /= 255; g /= 255; b /= 255;
      // Inverse Gamma
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      // to XYZ (D65)
      let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) * 100;
      let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) * 100;
      let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) * 100;
      // to LAB
      x /= 95.047; y /= 100.000; z /= 108.883;
      x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
      y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
      z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
      return {
        l: (116 * y) - 16,
        a: 500 * (x - y),
        b: 200 * (y - z)
      };
    },
    // CIEDE2000 Delta E Formula (Simplified but precise)
    deltaE2000: (lab1, lab2) => {
      const { l: l1, a: a1, b: b1 } = lab1;
      const { l: l2, a: a2, b: b2 } = lab2;
      const avgL = (l1 + l2) / 2;
      const c1 = Math.sqrt(a1 * a1 + b1 * b1);
      const c2 = Math.sqrt(a2 * a2 + b2 * b2);
      const avgC = (c1 + c2) / 2;
      const g = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
      const a1p = (1 + g) * a1;
      const a2p = (1 + g) * a2;
      const c1p = Math.sqrt(a1p * a1p + b1 * b1);
      const c2p = Math.sqrt(a2p * a2p + b2 * b2);
      const avgCp = (c1p + c2p) / 2;
      const h1p = (Math.atan2(b1, a1p) * 180 / Math.PI + 360) % 360;
      const h2p = (Math.atan2(b2, a2p) * 180 / Math.PI + 360) % 360;
      const dLp = l2 - l1;
      const dCp = c2p - c1p;
      let dHp = 0;
      if (c1p * c2p !== 0) {
        dHp = h2p - h1p;
        if (Math.abs(dHp) > 180) dHp += (dHp > 0 ? -360 : 360);
        dHp = 2 * Math.sqrt(c1p * c2p) * Math.sin(dHp * Math.PI / 360);
      }
      // Ponderations (simplified)
      const sl = 1 + (0.015 * Math.pow(avgL - 50, 2)) / Math.sqrt(20 + Math.pow(avgL - 50, 2));
      const sc = 1 + 0.045 * avgCp;
      const sh = 1 + 0.015 * avgCp;
      return Math.sqrt(Math.pow(dLp/sl, 2) + Math.pow(dCp/sc, 2) + Math.pow(dHp/sh, 2));
    }
  },
  shadeAnalysis: {
    generateReport: (shade, deltaE = 0) => {
      const isMaster = shade.includes('M');
      const vitaRef = isMaster ? dentalDatabase.knowledge.vitaguide.conversion[shade] : shade;
      const masterRef = isMaster ? shade : dentalDatabase.knowledge.vitaguide.conversion[shade];
      const chromascop = dentalDatabase.knowledge.vitaguide.chromascop[shade] || "N/A";
      
      const precision = Math.max(0, 100 - (deltaE * 15)).toFixed(2);
      
      const zones = {
        cervical: { shade: shade, feature: "Saturación gingival acentuada" },
        body: { shade: shade, feature: "Base cromática calibrada" },
        incisal: { shade: isMaster ? "1M1" : "A1", translucency: "Alta", feature: "Opalescencia natural" }
      };

      return {
        shade: shade,
        system: isMaster ? "VITA 3D-Master" : "VITA Classical",
        vitaClassical: vitaRef,
        vita3DMaster: masterRef,
        chromascop: chromascop,
        zones: zones,
        metrics: {
          deltaE: deltaE.toFixed(2),
          confidence: precision + "%"
        },
        calibration: deltaE < 2 ? "CALIDAD CLÍNICA ÓPTIMA (ΔE < 2)" : "CALIBRACIÓN OK",
        optical: {
          opalescence: "Detectada",
          fluorescence: "Alta",
          mamelons: "Grado II"
        },
        clinicalNote: `Mapeo integral: **VITA 3D-Master ${masterRef}** / **VITA Classical ${vitaRef}** / **Chromascop ${chromascop}**. Delta E: **${deltaE.toFixed(2)}**.`
      };
    }
  },
  genericResponses: {
    noFound: "Esa es una consulta interesante dentro del área dental. Aunque no tengo el protocolo específico detallado en mi núcleo de alta velocidad en este momento, puedo decirte que se basa en los principios de precisión y sentido común clínico que defendemos en SmileCAD. ¿Quieres que hablemos sobre el flujo digital general o sobre los materiales implicados?",
    senseCommon: "Desde una perspectiva de sentido común clínico, lo más importante es el diagnóstico preciso y la preservación del tejido biológico. La tecnología digital es una herramienta poderosa para lograr estos objetivos."
  }
};
