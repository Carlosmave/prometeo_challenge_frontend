import React from "react";
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Navbar, Nav, Container, Media } from "reactstrap";
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { logOut } from 'slices/login'

const MainNavbar = () => {
  const dispatch = useDispatch()
  let history = useHistory();
  const logOutFunction = () => {
    dispatch(logOut(history))
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <div></div>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="..." src={require("assets/img/user-default.jpg").default}/>
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {JSON.parse(localStorage.getItem('userName'))}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">¡Bienvenido!</h6>
                </DropdownItem>
                <DropdownItem style={{cursor: 'pointer'}} onClick={() => logOutFunction()}>
                  <i className="fa-solid fa-power-off text-red" />
                  <span>Cerrar sesión</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
