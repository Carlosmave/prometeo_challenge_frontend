import React from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import DataHeader from "components/Headers/DataHeader.js"

const Home = () => {
  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8"/>
      <Container className="pb-5 mt--8" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <DataHeader headerText="Home" />
              <Col className="mb-5 mb-xl-0 pt-5 pb-5" xl="12">
                <img alt="..." className="rounded mx-auto d-block" src={require("assets/img/prometeo_logo.png").default} style={{width: "200px"}} />
                <div className=" text-center mt-2 mb-3 pt-4">
                  Bienvenido {JSON.parse(localStorage.getItem('userName'))}, seleccione una opción para comenzar.
                </div>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
