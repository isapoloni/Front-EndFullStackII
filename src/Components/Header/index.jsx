

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
