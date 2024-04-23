import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo_color_trimmed from "../assets/logo_color_trimmed.png";
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    const currentUser = useCurrentUser();
    console.log('currentUser: ', currentUser);

    const loggedInMenu = (
        <>
            <Nav.Link
                as={NavLink}
                className={styles.navbarTextLinks}
                to="/places"
            >
                Places
            </Nav.Link>
            <Nav.Link as={NavLink} to="/posts">
                Posts
            </Nav.Link>
            <Nav.Link as={NavLink} to="/" onClick={() => {}}>
                Logout
            </Nav.Link>
            <Nav.Link as={NavLink} to={`/profiles/${currentUser?.profile_id}`}>
                <img
                    src={currentUser?.profile_image}
                    alt="Profile"
                    height="50"
                />
                {console.log(currentUser?.profile_id)}
            </Nav.Link>
        </>
    );

    const loggedOutMenu = (
        <>
            <Nav.Link as={NavLink} to="/login">
                Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
                About
            </Nav.Link>
        </>
    );

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid className="ms-5 me-5">
                <NavLink exact to="/">
                    <Navbar.Brand>
                        <img
                            src={logo_color_trimmed}
                            alt="Positive Logo"
                            height="55"
                        />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 text-center align-items-center"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        {currentUser ? loggedInMenu : loggedOutMenu}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar