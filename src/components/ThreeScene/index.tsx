import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styled from 'styled-components';

const SceneWrapper = styled.div`
  width: 100%;
  height: 100%; 
`;

interface ModelProps {
  modelPath: string;
}

const ProductModel: React.FC<ModelProps> = ({ modelPath }) => {
  const gltf = useGLTF(`/models/${modelPath}`); 
  
  return <primitive object={gltf.scene} scale={[0.5, 0.5, 0.5]} />;
};

interface ThreeSceneProps {
  modelName: string; 
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ modelName }) => {
  return (
    <SceneWrapper>
      <Canvas 
        camera={{ position: [5, 5, 5], fov: 50 }} 
        flat 
      >
        <Suspense fallback={null}>
          
          <ambientLight intensity={0.5} /> 
          
          <directionalLight position={[10, 10, 5]} intensity={1} /> 

          <ProductModel modelPath={modelName} />

          <OrbitControls 
            enableDamping={true} 
            dampingFactor={0.05} 
          />

        </Suspense>
      </Canvas>
    </SceneWrapper>
  );
};

export default ThreeScene;