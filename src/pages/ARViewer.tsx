import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ThreeScene from '../components/ThreeScene'; 
import ARScene from '../components/ARScene'; 

const ARContainer = styled.div<{ $isARMode: boolean }>`
  height: 80vh; 
  width: 100%;
  border-radius: 8px;
  overflow: hidden; 

  & button {
    position: absolute; 
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: ${props => props.$isARMode ? '#CC0000' : '#007bff'};
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    z-index: 10; 
  }

  & canvas {
      width: 100% !important;
      height: 100% !important;
  }
`;

const ModeToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid ${props => props.$active ? '#007bff' : '#ccc'};
  background-color: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : '#1c1c1c'};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
`;

const ARViewer: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isARMode, setIsARMode] = useState(false); 

  const modelMap: { [key: string]: string } = {
    '1': 'chair.glb',
    '2': 'plant.glb',
    '3': 'sofa.glb',
  };
  
  const modelToLoad = modelMap[productId || ''] || 'default.glb';

  return (
    <div>
      <h2>Visualizador de Produto</h2>
      
      <ModeToggle>
        <ToggleButton $active={!isARMode} onClick={() => setIsARMode(false)}>
          <span role="img" aria-label="3D">🧊</span> Visualização 3D
        </ToggleButton>
        <ToggleButton $active={isARMode} onClick={() => setIsARMode(true)}>
          <span role="img" aria-label="AR">✨</span> Iniciar AR
        </ToggleButton>
      </ModeToggle>

      <ARContainer $isARMode={isARMode}>
        {isARMode ? (
          <ARScene modelName={modelToLoad} />
        ) : (
          <ThreeScene modelName={modelToLoad} />
        )}
      </ARContainer>

      <div style={{ marginTop: '20px' }}>
        <h3>Configurador (Cores/Materiais)</h3>
        {!isARMode ? (
          <p>UI para customização em tempo real virá aqui (ex: cor vermelha, material metal).</p>
        ) : (
          <p>Saia do modo AR para configurar o produto.</p>
        )}
      </div>
    </div>
  );
};

export default ARViewer;