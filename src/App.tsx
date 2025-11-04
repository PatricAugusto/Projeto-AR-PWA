import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ARViewer from './pages/ARViewer';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/ar/:productId" element={<ARViewer />} />

          <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;