import React from "react";
import { Col, Spinner } from "reactstrap";

const LoadingSpinner = ({loadingText}) => {
  return (
    <Col className="mb-5 mb-xl-0 pt-5 pb-5" xl="12">
      <Spinner className="mx-auto d-block" color="danger" style={{ width: '200px', height: '200px', fontSize: "50px" }} />
      <div className="text-center mt-2 mb-3 pt-4">
        {loadingText}
      </div>
    </Col>
  );
}

export default LoadingSpinner;
