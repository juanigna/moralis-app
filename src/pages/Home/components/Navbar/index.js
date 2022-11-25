import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import WalletMetamask from '../WalletMetamask';


const NavBar = () => {
    return(
    <Navbar bg="dark" expand="lg" variant='dark'>
        <Container>
          <Navbar.Brand href="#home">Market Sentiment</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end w-100">
             <WalletMetamask />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar;