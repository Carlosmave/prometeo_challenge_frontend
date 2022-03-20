import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import MainFooter from "components/Footers/MainFooter.js";
import routes from "routes.js";

const Auth = () => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            exact path={prop.layout + prop.path}
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
      <div className="main-content bg-danger" style={{minHeight:"100vh"}}>
        <AuthNavbar />
        <div className="header bg-transparent py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">¡Bienvenido al portal de Prometeo!</h1>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
        <Container style={{paddingTop: "30px"}} fluid>
          <MainFooter />
        </Container>
      </div>
    </>
  );
}

export default Auth;
