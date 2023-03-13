import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { content } from "./Services/Config";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../logo.svg';

const Header = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user-details'));
    const [showEmployeeTab, setShowEmployeeTab] = useState(false);

    // Handle logout
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    useEffect(() => {
        if (!localStorage.getItem('user-token') || localStorage.getItem('user-token') === 'undefined') {
            navigate('/login');
        }

        if (userData && userData.type === content.ADMIN) {
            setShowEmployeeTab(true);
        }
    }, []);

    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/dashboard')}>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Assignment
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        {showEmployeeTab ? (
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => navigate('/employee-list')}>Employees</Nav.Link>
                            </Nav>
                        ) : ('')}
                        <Navbar.Text>
                            <a className="active-link" onClick={() => logout()}>Logout</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;