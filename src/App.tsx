import { Routes, Route } from 'react-router-dom';
import AdministracaoRestaurante from './pages/Administracao/Restaurantes/AdministracaoRestaurante';
import FormularioRestaurante from './pages/Administracao/Restaurantes/FormularioRestaurante';
import Home from './pages/Home';
import VitrineRestaurantes from './pages/VitrineRestaurantes';
import PaginaBaseAdm from './pages/Administracao/PaginaBaseAdm';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<PaginaBaseAdm />}>
        <Route path="restaurantes" element={<AdministracaoRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
      </Route>

    </Routes>
  );
}

export default App;
