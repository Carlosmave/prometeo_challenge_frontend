import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import MainNavbar from "components/Navbars/MainNavbar.js";
import MainFooter from "components/Footers/MainFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import sidebarRoutes from "sidebarRoutes.js";

const MainLayout = ({ location }) =>{
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/main") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  }
  return (
    <>
      <Sidebar routes={sidebarRoutes} logo={{ innerLink: "/main/home", imgSrc: require("assets/img/prometeo_logo.png").default,
      imgAlt: "prometeo_logo" }} />
      <div className="main-content bg-danger" style={{minHeight:"100vh"}}>
        <MainNavbar/>
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/main/home" />
        </Switch>
        <Container style={{paddingTop: "30px"}} fluid>
          <MainFooter />
        </Container>
      </div>
    </>
  );
}

export default MainLayout;
