import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProductItem = styled(Link)`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-decoration: none;
  color: #1c1c1c;
  background-color: #f9f9f9;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Home: React.FC = () => {
  const products = [
    { id: '1', name: 'Cadeira Moderna', model: 'chair.glb' },
    { id: '2', name: 'Vaso de Plantas', model: 'plant.glb' },
    { id: '3', name: 'Sofá Modular', model: 'sofa.glb' },
  ];

  return (
    <div>
      <h2>Selecione um Produto</h2>
      <ProductList>
        {products.map(product => (
          <ProductItem key={product.id} to={`/ar/${product.id}`}>
            **{product.name}**
            <p style={{ fontSize: '0.8em', marginTop: '5px' }}>Clique para Visualizar em AR</p>
          </ProductItem>
        ))}
      </ProductList>
    </div>
  );
};

export default Home;