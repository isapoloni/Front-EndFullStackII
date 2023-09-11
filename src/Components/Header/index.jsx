// import Container from "react-bootstrap/Container";
// import { Nav, Navbar } from "react-bootstrap";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { Link, NavLink } from "react-router-dom";
// import "./styled.css";
// import Logo from "../../assets/logo-igreja.png";
// import { LinkContainer } from 'react-router-bootstrap';

// export default function Header() {
//   const repoName = "Front-EndFullStackII"; 

//   return (
//     <>
//       {[false].map((expand) => (
//         <Navbar
//           key={expand}
//           bg="dark"
//           variant="dark"
//           expand={expand}
//           className="mb-3 p-3"
//         >
//           <Container fluid>
//             <Navbar.Brand>
//               <Link
//                 style={{
//                   textDecoration: "none",
//                   color: "white",
//                   cursor: "default",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginLeft: "10px",
//                   }}
//                 >
//                   <img src={Logo} alt="" width={65} height={75} />
//                   <h1
//                     style={{
//                       marginLeft: "15px",
//                       fontSize: "45px",
//                     }}
//                   >
//                     GIFSyS
//                   </h1>
//                 </div>
//               </Link>
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-${expand}`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//               placement="end"
//             >
//               <Offcanvas.Header closeButton>
//                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
//                   <h2>Menu</h2>
//                 </Offcanvas.Title>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Navbar.Collapse id="basic-navbar-nav">
//                   <Nav
//                     className="justify-content-end flex-grow-1 pe-3"
//                     id="sidebar"
//                   >
//                     <LinkContainer to={`/${repoName}/Home`}>Home</LinkContainer>
//                     <LinkContainer to={`/${repoName}/CadastroProduto`}> Cadastro Produto</LinkContainer>
//                     <LinkContainer to={`/${repoName}/CadastroCategoria`}> Cadastro Categoria</LinkContainer>
//                     <LinkContainer to={`/${repoName}/Buscar`}> Buscar</LinkContainer>
//                     {/* <NavLink id="navlink" to={`/${repoName}/Home`}>
//                       Home
//                     </NavLink>
//                     <hr />
//                     <NavLink id="navlink" to={`/${repoName}/CadastroProduto`}>
//                       Cadastro Produto
//                     </NavLink>
//                     <hr />
//                     <NavLink id="navlink" to={`/${repoName}/CadastroCategoria`}>
//                       Cadastro Categoria
//                     </NavLink>
//                     <hr />
//                     <NavLink id="navlink" to={`/${repoName}/Buscar`}>
//                       Buscar
//                     </NavLink>
//                     <hr /> */}
//                   </Nav>
//                 </Navbar.Collapse>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//           </Container>
//         </Navbar>
//       ))}
//     </>
//   );
// }


import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Menu(props) {
  const repoName = "Front-EndFullStackII"; 

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='mt-0 mb-5'>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Formulários" id="collapsible-nav-dropdown">
              <LinkContainer to={`/${repoName}/Home`}><NavDropdown.Item>Home</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to={`/${repoName}/CadastroProduto`}><NavDropdown.Item> Cadastro Produto</NavDropdown.Item></LinkContainer>
              <LinkContainer to={`/${repoName}/CadastroCategoria`}><NavDropdown.Item> Cadastro Categoria</NavDropdown.Item></LinkContainer>              
              <LinkContainer to={`/${repoName}/Buscar`}><NavDropdown.Item> Buscar</NavDropdown.Item></LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
