import classes from "./style/navbar.module.css";
import "./style/nav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";
function NavBar() {
  return (
    <>
      <Navbar expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/newShift" className={classes.brand}>
            Shift Manager <FiClock />
          </Navbar.Brand>
          <Navbar.Toggle
            className={classes.hamburger}
            aria-controls={`offcanvasNavbar-expand-lg`}
          />
          <Navbar.Offcanvas
            className={classes.expend}
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header className={classes.closeButton} closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Shift Manager
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end nav flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/newShift" className={classes.navLinks}>
                  New Shift
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/allShifts"
                  className={classes.navLinks}
                >
                  My Shifts
                </Nav.Link>
                <Nav.Link as={Link} to="/settings" className={classes.navLinks}>
                  Settings
                </Nav.Link>
                <NavDropdown
                  className={classes.navLinks}
                  title="User"
                  id={`offcanvasNavbarDropdown-expand-lg `}
                >
                  <NavDropdown.Item as={Link} to="/register">
                    signUp
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/">
                    log in
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
