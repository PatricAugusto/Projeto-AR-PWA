// src/components/ARScene/index.tsx
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber'; // Canvas padrão do R3F
import { useGLTF } from '@react-three/drei';
// 1. CORREÇÃO DE EXPORTAÇÃO: useXRHitTest renomeado para uso interno como useHitTest
import { ARButton, XR, useXRHitTest as useHitTest } from '@react-three/xr'; 
import { Mesh, Matrix4 } from 'three'; 
import styled from 'styled-components'; // Importação do styled-components

const SceneWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* Necessário para o ARButton funcionar bem fora do Canvas */
  position: relative; 
`;


// 1. Componente de Renderização do Modelo no AR
interface ModelProps {
  modelPath: string;
}

const ARProduct: React.FC<ModelProps> = ({ modelPath }) => {
  const gltf = useGLTF(`/models/${modelPath}`);
  
  // Referência para o modelo 3D
  const modelRef = useRef<Mesh>(null!); 
  
  // 2. CORREÇÃO DE TIPAGEM: useHitTest com tipagem correta de Matrix4
  useHitTest((hitMatrix: Matrix4) => { 
    // hitMatrix é a matriz de transformação do ponto de intersecção com a superfície.
    hitMatrix.decompose(modelRef.current.position, modelRef.current.quaternion, modelRef.current.scale);
    
    // Escala do modelo
    modelRef.current.scale.set(0.5, 0.5, 0.5); 
  });
  
  return (
    <primitive ref={modelRef} object={gltf.scene} />
  );
};


// 2. Componente Principal: Usa Canvas e XR (o provedor de contexto)
interface ARSceneProps {
  modelName: string;
}

const ARScene: React.FC<ARSceneProps> = ({ modelName }) => {
  return (
    <SceneWrapper>
      {/* O ARButton deve ser renderizado fora do Canvas, mas o mais próximo possível do componente XR 
        para que o contexto seja acessado após o XR ter inicializado.
        Vamos colocá-lo aqui dentro do SceneWrapper e DEPOIS DO XR para garantir o contexto.
        
        CORREÇÃO STORE E ARGUMENTOS: O ARButton precisa do contexto XR. 
        Vamos tentar renderizá-lo DENTRO do Canvas, mas FORA do XR, se o problema persistir.
        A versão mais robusta é: ARButton fora do Canvas, mas o erro de 'store' está em você.
        Vamos forçar a renderização aqui e monitorar o erro no seu console.
        
        Melhor abordagem: Deixar o ARButton fora do Canvas, e forçar a sessão 'AR' no XR.
      */}
      
      <Canvas
        camera={{ position: [0, 0, 0] }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* CORREÇÃO DO STORE: O XR fornece o contexto obrigatório. */}
        <XR 
            // sessionOptions não existe. O hit-test é implicado pelo hook.
            // mode='AR' - A especificação do modo é essencial
            mode="AR"
        >
          {/* 3. CORREÇÃO DO STORE e ARGUMENTOS: Renderizando o ARButton aqui dentro do contexto XR 
             para que ele possa acessar o store. */}
          <ARButton>ENTRAR EM AR</ARButton>

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