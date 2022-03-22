import React from "react";
import { Link } from "react-router-dom";
import { NavbarBrand, Navbar, Container } from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="prometeo_logo" src={require("assets/img/prometeo_logo.png")} />
          </NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
