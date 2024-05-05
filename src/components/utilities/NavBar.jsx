import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo_color_trimmed from "../../assets/logo_color_trimmed.png";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/NavBar.module.css';
import Avatar from "./Avatar";
import useClickOutsideToggle from "../../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../../utils/utils";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleLogout = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/');
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (error) {
            console.error('An error occurred:', error.response);
        }
    };

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
            <Nav.Link as={NavLink} to="/login" onClick={handleLogout}>
                Logout
            </Nav.Link>
            <Nav.Link as={NavLink} to={`/profiles/${currentUser?.profile_id}`}>
                <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} />
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
        <Navbar expanded={expanded} expand="lg" className="bg-body-tertiary">
            <Container fluid className="ms-5 me-5">
                <Nav.Link as={NavLink} exact to="/">
                    <Navbar.Brand>
                        <img
                            src={logo_color_trimmed}
                            alt="Positive Logo"
                            height="55"
                        />
                    </Navbar.Brand>
                </Nav.Link>
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="navbarScroll"
                />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0 text-center align-items-center">
                        {currentUser ? loggedInMenu : loggedOutMenu}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;