import React from "react";
import { CardHeader, Row } from "reactstrap";

const DataHeader = ({headerText}) => {
  return (
    <CardHeader className="border-0">
      <Row className="align-items-center">
        <div className="col">
          <h3 className="mb-0">{headerText}</h3>
        </div>
      </Row>
    </CardHeader>
  );
}
export default DataHeader;
