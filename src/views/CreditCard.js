import React, { useEffect } from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import DataHeader from "components/Headers/DataHeader.js"
import { creditCardSelector, fetchCreditCards, setSelectedCreditCard } from 'slices/creditCard'
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";
import WarningCard from "components/WarningCard/WarningCard.js";
import { Table } from "reactstrap";

const CreditCard = () => {
  const { creditCards, loading, hasErrors, isEmpty } = useSelector(creditCardSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  useEffect(() => {
    dispatch(fetchCreditCards(history))
  }, [dispatch, history]);
  const headers = ["ID", "Nombre", "Número", "Fecha de cierre", "Fecha de vencimiento", "Balance local", "Balance ($)", "Acciones"]
  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText="Cargando tarjetas de crédito"/>)
    if (hasErrors) return (<WarningCard warningImage="error" warningText="Hubo un error al obtener las tarjetas de crédito"/>)
    if (isEmpty) return (<WarningCard warningImage="nodata" warningText="No se encontraron tarjetas de crédito"/>)
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
            {creditCards.map((creditCard, key) =>
              <tr key={key}>
                <td className="text-center">{creditCard.id}</td>
                <td className="text-center">{creditCard.name}</td>
                <td className="text-center">{creditCard.number}</td>
                <td className="text-center">{creditCard.closeDate}</td>
                <td className="text-center">{creditCard.dueDate}</td>
                <td className="text-center">{creditCard.balanceLocal}</td>
                <td className="text-center">{creditCard.balanceDollar}</td>
                <td className="text-center">
                  <Link to={`/main/tarjetas-de-credito/${creditCard.id}`} onClick={() => dispatch(setSelectedCreditCard(creditCard))}>
                    <i className="fas fa-eye text-info mr-3"/>
                  </Link>
                </td>
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
              <DataHeader headerText="Tarjetas de crédito" />
              {renderItems()}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreditCard;
