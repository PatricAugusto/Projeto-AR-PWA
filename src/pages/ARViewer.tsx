import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ARContainer = styled.div`
  height: 80vh; /* Altura que será preenchida pela cena 3D/AR */
  background-color: #e0e0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const ARViewer: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <h2>Visualizador de Realidade Aumentada</h2>
      <p>Você selecionou o Produto ID: **{productId}**</p>
      
      <ARContainer>
        <p style={{ color: '#555' }}>
          **<span role="img" aria-label="Camera">📸</span> Em breve: Integração WebXR/Three.js**
        </p>
      </ARContainer>

      <div style={{ marginTop: '20px' }}>
        <h3>Configurador (Cores/Materiais)</h3>
        <p>UI minimalista para customização em tempo real virá aqui.</p>
      </div>
    </div>
  );
};

export default ARViewer;