import { Routes, Route } from 'react-router-dom';

import AdministracaoRestaurante from './pages/Administracao/Restaurantes/AdministracaoRestaurante';

import FormularioRestaurante from './pages/Administracao/Restaurantes/FormularioRestaurante';

import Home from './pages/Home';

import VitrineRestaurantes from './pages/VitrineRestaurantes';

import PaginaBaseAdm from './pages/Administracao/PaginaBaseAdm';

import AdministracaoPratos from './pages/Administracao/Pratos/AdministracaoPratos';

import FormularioPratos from './pages/Administracao/Pratos/FormularioPratos';

function App() {

  return (
    <Routes>
      {/* Rotas gerais */}
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      {/* Padrão de rota e layout para setor ADM */}
      <Route path='/admin' element={<PaginaBaseAdm />}>
        {/* Rotas de ADM para Restaurante */}
        <Route path="restaurantes" element={<AdministracaoRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        {/* Rotas de ADM para Pratos */}
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPratos />} />
        <Route path="pratos/:id" element={<FormularioPratos />} />
      </Route>
    </Routes>
  );
}

export default App;
