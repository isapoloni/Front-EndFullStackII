import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CadProdutos from "./Pages/CadProdutos/TelaCadProdutos";
import CadCategoria from "./Pages/CadCategoria/TelaCadCategoria";
import TelaBarraBusca from "./Pages/Busca/TelaBarraBusca";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CadastroProduto" element={<CadProdutos />} />
          <Route path="/CadastroCategoria" element={<CadCategoria/>} />
          <Route path="/Buscar" element={<TelaBarraBusca/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
