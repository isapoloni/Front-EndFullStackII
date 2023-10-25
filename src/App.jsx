import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CadProdutos from "./Pages/CadProdutos/TelaCadProdutos";
import CadCategoria from "./Pages/CadCategoria/TelaCadCategoria";
// import TelaBarraBusca from "./Pages/Busca/TelaBarraBusca";
import TelaDoacao from "./Pages/Doacao/TelaDoacao";

function App() {
  const repoName = "Front-EndFullStackII";
  
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path={`/${repoName}`} element={<Login />} />
          <Route path={`/${repoName}/Home`} element={<Home />} />
          <Route path={`/${repoName}/CadastroProduto`} element={<CadProdutos />} />
          <Route path={`/${repoName}/CadastroCategoria`} element={<CadCategoria/>} />
          {/* <Route path={`/${repoName}/Buscar`} element={<TelaBarraBusca/>} /> */}
          <Route path={`/${repoName}/Doacao`} element={<TelaDoacao/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
