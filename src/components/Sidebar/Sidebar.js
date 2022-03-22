import React from 'react'
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { sidebarToggle, sidebarClose, sidebarSelector } from 'slices/sidebar'
import { useHistory } from "react-router-dom";
import { Collapse, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Media, NavbarBrand, Navbar, NavItem, NavLink, Nav,
Container, Row, Col } from "reactstrap";
import { logOut } from 'slices/login'

const Sidebar = ( {routes, logo} ) => {
  const { collapseOpen } = useSelector(sidebarSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  const logOutFunction = () => {
    dispatch(logOut(history))
  };
  const createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink to={prop.link} tag={NavLinkRRD} onClick={() => dispatch(sidebarClose())} activeClassName="active">
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
      <Container fluid>
        <button className="navbar-toggler" type="button" onClick={() => dispatch(sidebarToggle())}>
          <span className="navbar-toggler-icon" />
        </button>
        <NavbarBrand className="pt-0" to={logo.innerLink} tag={Link}>
          <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
        </NavbarBrand>
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="..." src={require("assets/img/user-default.jpg").default}/>
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">¡Bienvenido!</h6>
              </DropdownItem>
              <DropdownItem onClick={() => logOutFunction()}>
                <i className="fa-solid fa-power-off text-red" />
                <span>Cerrar sesión</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={() => dispatch(sidebarToggle())}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
