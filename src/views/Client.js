import React, { useEffect } from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import DataHeader from "components/Headers/DataHeader.js"
import { clientSelector, fetchClients } from 'slices/client'
import { useHistory } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";
import WarningCard from "components/WarningCard/WarningCard.js";
import { Table } from "reactstrap";

const Client = () => {
  const { clients, loading, hasErrors, isEmpty } = useSelector(clientSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  useEffect(() => {
    dispatch(fetchClients(history))
  }, [dispatch, history]);
  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText="Cargando clientes"/>)
    if (hasErrors) return (<WarningCard warningImage="error" warningText="Hubo un error al obtener los clientes"/>)
    if (isEmpty) return (<WarningCard warningImage="nodata" warningText="No se encontraron clientes"/>)
    return(
      <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th className="text-center" scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(clients).map((client, key) =>
              <tr key={key}>
                <td className="text-center">{client[1]}</td>
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
              <DataHeader headerText="Clientes" />
              {renderItems()}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Client;
