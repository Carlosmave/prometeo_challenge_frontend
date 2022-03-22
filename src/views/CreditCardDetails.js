import React, { useEffect } from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import { useSelector } from 'react-redux'
import DataHeader from "components/Headers/DataHeader.js"
import CreditCardFilters from "components/Filters/CreditCardFilters.js"
import { creditCardSelector } from 'slices/creditCard'
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";
import WarningCard from "components/WarningCard/WarningCard.js";
import { Table } from "reactstrap";

const CreditCardDetails = () => {
  const { selectedCreditCard, loading, hasErrors, isEmpty, movements } = useSelector(creditCardSelector)
  let history = useHistory();
  const { id } = useParams()
  useEffect(() => {
    if (id !== selectedCreditCard.id) {
      history.push("/main/tarjetas-de-credito");
    }
  }, [history, id, selectedCreditCard.id]);
  const headers = ["ID", "Nombre", "Número", "Fecha de cierre", "Fecha de vencimiento", "Balance local", "Balance ($)"]
  const headersDetails = ["ID", "Referencia", "Fecha", "Detalle", "Débito", "Crédito", "Data extra"]
  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText="Cargando movimientos de la tarjeta de crédito"/>)
    if (hasErrors) return (<WarningCard warningImage="error" warningText="Hubo un error al obtener los movimientos de la tarjeta de crédito"/>)
    if (isEmpty) return (<WarningCard warningImage="nodata" warningText="No se encontraron movimientos para esta tarjeta de crédito en el rango seleccionado"/>)
    return(
      <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {headersDetails.map((headerDetail, key) =>
                <th className="text-center" scope="col" key={key}>{headerDetail}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, key) =>
              <tr key={key}>
                <td className="text-center">{movement.id}</td>
                <td className="text-center">{movement.reference}</td>
                <td className="text-center">{movement.date}</td>
                <td className="text-center">{movement.detail}</td>
                <td className="text-center">{movement.debit}</td>
                <td className="text-center">{movement.credit}</td>
                <td className="text-center">{movement.extraData}</td>
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
              <DataHeader headerText="Detalles de la tarjeta de crédito" />
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {headers.map((header, key) =>
                      <th className="text-center" scope="col" key={key}>{header}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">{selectedCreditCard.id}</td>
                    <td className="text-center">{selectedCreditCard.name}</td>
                    <td className="text-center">{selectedCreditCard.number}</td>
                    <td className="text-center">{selectedCreditCard.closeDate}</td>
                    <td className="text-center">{selectedCreditCard.dueDate}</td>
                    <td className="text-center">{selectedCreditCard.balanceLocal}</td>
                    <td className="text-center">{selectedCreditCard.balanceDollar}</td>
                  </tr>
                </tbody>
              </Table>
              <DataHeader headerText="Movimientos" />
              <CreditCardFilters/>
              {renderItems()}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreditCardDetails;
