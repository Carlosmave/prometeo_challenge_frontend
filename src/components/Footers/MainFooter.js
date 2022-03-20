import React from "react";
import { Row, Col } from "reactstrap";

const MainFooter = () => {
  return (
    <footer className="footer" style={{backgroundColor: "transparent", position: "absolute", bottom: "10px", height: "0", width: "92%"}}>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="12">
          <div className="copyright text-center text-xl-left text-white">
            © {new Date().getFullYear()}
            <span className="font-weight-bold ml-1">
              Prometeo
            </span>
          </div>
        </Col>
      </Row>
    </footer>
  );
}

export default MainFooter;
