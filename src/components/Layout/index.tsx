import React from 'react';
import styled from 'styled-components';

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 600px; /* Limite o container para uma experiência mobile */
  margin: 0 auto; /* Centraliza em telas maiores */
  background-color: white; /* Fundo do app, se o GlobalStyle for cinza */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sutil sombra para destacar */
`;

const Header = styled.header`
  padding: 15px 20px;
  background-color: #282c34; /* Cor escura para o topo */
  color: white;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.main`
  flex: 1; /* Ocupa o espaço restante entre o header e o footer */
  padding: 20px;
  overflow-y: auto; /* Permite scroll no conteúdo principal */
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppShell>
      <Header>
        WebAR Imóveis/E-commerce
      </Header>
      <MainContent>
        {children}
      </MainContent>
    </AppShell>
  );
};

export default Layout;