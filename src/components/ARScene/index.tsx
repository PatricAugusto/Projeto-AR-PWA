import React, { Suspense, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber'; 
import { useGLTF } from '@react-three/drei';
import { ARButton, XR, useXRHitTest as useHitTest } from '@react-three/xr'; 
import { Mesh, Matrix4 } from 'three'; 
import styled from 'styled-components'; 

const SceneWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative; 
`;

interface ModelProps { modelPath: string; }
const ARProduct: React.FC<ModelProps> = ({ modelPath }) => {
  const gltf = useGLTF(`/models/${modelPath}`);
  const modelRef = useRef<Mesh>(null!); 
  useHitTest((hitMatrix: Matrix4) => { 
    hitMatrix.decompose(modelRef.current.position, modelRef.current.quaternion, modelRef.current.scale);
    modelRef.current.scale.set(0.5, 0.5, 0.5); 
  });
  return (<primitive ref={modelRef} object={gltf.scene} />);
};

const ARButtonWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { store } = useThree(); 

    return (
        <ARButton 
            store={store} 
            mode="AR" 
        >
            {children}
        </ARButton>
    );
}
interface ARSceneProps {
  modelName: string;
}

const ARScene: React.FC<ARSceneProps> = ({ modelName }) => {
  return (
    <SceneWrapper>
      
      <Canvas
        camera={{ position: [0, 0, 0] }}
        style={{ width: '100%', height: '100%' }}
      >
        <XR>
          <ARButtonWrapper>
            ENTRAR EM AR
          </ARButtonWrapper>

          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            
            <ARProduct modelPath={modelName} />
          </Suspense>
        </XR>
      </Canvas>
    </SceneWrapper>
  );
};

export default ARScene;