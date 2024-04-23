import React, { useContext } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo_color_trimmed from "../assets/logo_color_trimmed.png";
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../App';

const NavBar = () => {
    const currentUser = useContext(CurrentUserContext);

    const loggedInMenu = (
        <>
            <Nav.Link as={NavLink} to="/places">
                Places
            </Nav.Link>
            <Nav.Link as={NavLink} to="/posts">
                Posts
            </Nav.Link>
            <Nav.Link as={NavLink} to="/logout">
                Logout
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile">
                { currentUser?.username }
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
                            height="45"
                        />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 text-center"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        { currentUser ? loggedInMenu : loggedOutMenu }
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