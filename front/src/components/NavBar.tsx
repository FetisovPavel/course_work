import React from "react";
import {useClient} from "../hooks/client";
import {Container, Dropdown, Nav, Navbar} from "react-bootstrap";

export const NavbarComponent: React.FC = () =>{
    const {user, navigate} = useClient()

    const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/clients/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user }),
            });
            if (response.ok) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCatalogClick = async () => {
        try {
            navigate('/catalog', { state: { user } });
        } catch (error) {
            console.error(error);
        }
    };

    const handleKugooHXPlus = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            navigate('/kugoohxplus', { state: { user } });
        } catch (error) {
            console.error(error);
        }
    }

    const handleToMainMenu = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            navigate('/main', { state: { user } });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand onClick={handleToMainMenu}>CarshBike</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="mr-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="navbarDropdown">
                                    Каталог
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="top-menu">
                                    <Dropdown.Item onClick={handleKugooHXPlus}>Kugoo HX plus</Dropdown.Item>
                                    <Dropdown.Item href="kugooM4pro.html">Kugoo M4 pro</Dropdown.Item>
                                    <Dropdown.Item href="kugooS3.html">Kugoo S3</Dropdown.Item>
                                    <Dropdown.Item href="xiaomiHIMOc20.html">Xiaomi HIMO C20</Dropdown.Item>
                                    <Dropdown.Item href="xiaomiQicycle.html">Xiaomi Qicycle</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleCatalogClick}>Показать все</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Nav.Link className="nav-link top-menu" href="#">
                                Контакты
                            </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            {user ? (
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        {user}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleLogout}>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Nav.Item>
                                    <Nav.Link className="nav-link" href="/">
                                        Login
                                    </Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}