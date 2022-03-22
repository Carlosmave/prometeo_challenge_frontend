import React from "react";
import { Col } from "reactstrap";

const WarningCard = ({warningImage, warningText}) => {
  return (
    <Col className="mb-5 mb-xl-0 pt-5 pb-5" xl="12">
      <img alt="..." className="rounded mx-auto d-block" src={require("assets/img/"+warningImage+".png")} style={{width: "200px"}} />
      <div className=" text-center mt-2 mb-3 pt-4">
        {warningText}
      </div>
    </Col>
  );
}

export default WarningCard;
