import { Routes, Route } from 'react-router-dom';
import AdministracaoRestaurante from './pages/Administracao/Restaurantes/AdministracaoRestaurante';
import FormularioRestaurante from './pages/Administracao/Restaurantes/FormularioRestaurante';
import Home from './pages/Home';
import VitrineRestaurantes from './pages/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurante />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
    </Routes>
  );
}

export default App;
