import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ThreeScene from '../components/ThreeScene'; 
const ARContainer = styled.div`
  height: 80vh; 
  border-radius: 8px;
`;

const ARViewer: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const modelMap: { [key: string]: string } = {
    '1': 'chair.glb',
    '2': 'plant.glb',
    '3': 'sofa.glb',
  };
  
  const modelToLoad = modelMap[productId || ''] || 'default.glb';

  return (
    <div>
      <h2>Visualizador 3D do Produto</h2>
      <p>Produto ID: **{productId}** | Modelo: **{modelToLoad}**</p>
      
      <ARContainer>
        <ThreeScene modelName={modelToLoad} />
      </ARContainer>

      <div style={{ marginTop: '20px' }}>
        <h3>Configurador (Cores/Materiais)</h3>
        <p>UI minimalista para customização em tempo real virá aqui.</p>
      </div>
    </div>
  );
};

export default ARViewer;