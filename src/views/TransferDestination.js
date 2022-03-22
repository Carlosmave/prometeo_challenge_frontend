import React, { useEffect } from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import DataHeader from "components/Headers/DataHeader.js"
import { transferDestinationSelector, fetchTransferDestinations } from 'slices/transferDestination'
import { useHistory } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";
import WarningCard from "components/WarningCard/WarningCard.js";
import { Table } from "reactstrap";

const TransferDestination = () => {
  const { transferDestinations, loading, hasErrors, isEmpty } = useSelector(transferDestinationSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  useEffect(() => {
    dispatch(fetchTransferDestinations(history))
  }, [dispatch, history]);
  const headers = ["ID", "Nombre"]
  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText="Cargando instituciones para transferencias"/>)
    if (hasErrors) return (<WarningCard warningImage="error" warningText="Hubo un error al obtener las instituciones para transferencias"/>)
    if (isEmpty) return (<WarningCard warningImage="nodata" warningText="No se encontraron instituciones para transferencias"/>)
    return(
      <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {headers.map((header, key) =>
                <th className="text-center" scope="col" key={key}>{header}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {transferDestinations.map((transferDestination, key) =>
              <tr key={key}>
                <td className="text-center">{transferDestination.id}</td>
                <td className="text-center">{transferDestination.name}</td>
              </tr>
            )}
          </tbody>
        </Table>)
  }
  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8"/>
      <Container className="pb-5 mt--8" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <DataHeader headerText="Instituciones para transferencias" />
              {renderItems()}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TransferDestination;
