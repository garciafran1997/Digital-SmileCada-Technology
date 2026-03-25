import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Center, ContactShadows, Environment } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function Model({ url }) {
  const geom = useLoader(STLLoader, url);
  return (
    <Center>
      <mesh geometry={geom} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#e8e5d8" 
          roughness={0.6} 
          metalness={0.2}
          flatShading={false}
        />
      </mesh>
    </Center>
  );
}

const StlViewer = ({ url }) => {
  return (
    <div className="stl-viewer-container">
      <Suspense fallback={<div className="stl-loader">Cargando modelo...</div>}>
        <Canvas shadows camera={{ position: [0, 0, 80], fov: 45 }}>
          <color attach="background" args={['#0a0a0a']} />
          <ambientLight intensity={0.5} />
          
          {/* Main directional light for high-contrast shadows */}
          <directionalLight 
            position={[50, 50, 50]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Rim light for edge definition */}
          <pointLight position={[-50, 0, -50]} intensity={1} color="#0066ff" />
          
          {/* Top light to define form */}
          <spotLight position={[0, 100, 0]} intensity={0.8} />

          <Model url={url} />
          
          <ContactShadows 
            position={[0, -25, 0]} 
            opacity={0.6} 
            scale={150} 
            blur={2} 
            far={50} 
          />
          
          <OrbitControls makeDefault minDistance={30} maxDistance={250} />
        </Canvas>
      </Suspense>
      <div className="stl-viewer-hint">Rotar: Click + Arrastrar • Zoom: Scroll</div>
    </div>
  );
};

export default StlViewer;
