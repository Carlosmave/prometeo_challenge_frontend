import React, { useEffect } from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import { useSelector } from 'react-redux'
import DataHeader from "components/Headers/DataHeader.js"
import AccountFilters from "components/Filters/AccountFilters.js"
import { accountSelector } from 'slices/account'
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";
import WarningCard from "components/WarningCard/WarningCard.js";
import { Table } from "reactstrap";

const AccountDetails = () => {
  const { selectedAccount, loading, hasErrors, isEmpty, movements } = useSelector(accountSelector)
  let history = useHistory();
  const { id } = useParams()
  useEffect(() => {
    if (id !== selectedAccount.id) {
      history.push("/main/cuentas");
    }
  }, [history, id, selectedAccount.id]);
  const headers = ["ID", "Nombre", "Número", "Sucursal", "Moneda", "Balance"]
  const headersDetails = ["ID", "Referencia", "Fecha", "Detalle", "Débito", "Crédito", "Data extra"]
  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText="Cargando movimientos de la cuenta"/>)
    if (hasErrors) return (<WarningCard warningImage="error" warningText="Hubo un error al obtener los movimientos de la cuenta"/>)
    if (isEmpty) return (<WarningCard warningImage="nodata" warningText="No se encontraron movimientos para esta cuenta en el rango seleccionado"/>)
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
              <DataHeader headerText="Detalles de la cuenta" />
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
                    <td className="text-center">{selectedAccount.id}</td>
                    <td className="text-center">{selectedAccount.name}</td>
                    <td className="text-center">{selectedAccount.number}</td>
                    <td className="text-center">{selectedAccount.branch}</td>
                    <td className="text-center">{selectedAccount.currency}</td>
                    <td className="text-center">{selectedAccount.balance}</td>
                  </tr>
                </tbody>
              </Table>
              <DataHeader headerText="Movimientos" />
              <AccountFilters/>
              {renderItems()}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AccountDetails;
