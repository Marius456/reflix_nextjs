import Link from "next/link";
import { Button, Navbar as NavbarBs } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import styles from './styles/Navbar.module.css'
import { useEffect, useState } from "react";

export function Navbar() {
    const [data, setData] = useState("");

    useEffect(() => {
        setData(localStorage.getItem("auth") || "");
    }, []);

    return (
        <NavbarBs sticky="top" className="bg-dark shadow-sm">
            <Container>
                <Nav className="me-right">
                    <Nav.Link as={Link} href="/">
                        <img src="../../logo.png" alt="Logo" className={styles.logo} />
                    </Nav.Link>
                </Nav>
                <Nav className="me-left">
                    <Nav.Link as={Link} href="/movies" className="text-white">
                        All movies
                    </Nav.Link>
                    <Nav.Link as={Link} href="/categories" className="text-white">
                        Categories
                    </Nav.Link>
                    {(data) && (
                        <Nav.Link as={Link} href="/library" className="text-white">
                            Library
                        </Nav.Link>
                    )}
                    {(!data) ? (
                        <Button className="btn-success" onClick={() => { window.location.href = "login" }}>
                            Login
                        </Button>
                    ) : (
                        <Button className="btn-danger" onClick={() => { localStorage.removeItem("auth"); window.location.reload(); }}>
                            Logout
                        </Button>
                    )}
                </Nav>
            </Container>
        </NavbarBs>
    );
}