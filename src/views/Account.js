import React, { useEffect } from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import DataHeader from "components/Headers/DataHeader.js"
import { accountSelector, fetchAccounts, setSelectedAccount } from 'slices/account'
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";
import WarningCard from "components/WarningCard/WarningCard.js";
import { Table } from "reactstrap";

const Account = () => {
  const { accounts, loading, hasErrors, isEmpty } = useSelector(accountSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  useEffect(() => {
    dispatch(fetchAccounts(history))
  }, [dispatch, history]);
  const headers = ["ID", "Nombre", "Número", "Sucursal", "Moneda", "Balance", "Acciones"]
  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText="Cargando cuentas"/>)
    if (hasErrors) return (<WarningCard warningImage="error" warningText="Hubo un error al obtener las cuentas"/>)
    if (isEmpty) return (<WarningCard warningImage="nodata" warningText="No se encontraron cuentas"/>)
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
            {accounts.map((account, key) =>
              <tr key={key}>
                <td className="text-center">{account.id}</td>
                <td className="text-center">{account.name}</td>
                <td className="text-center">{account.number}</td>
                <td className="text-center">{account.branch}</td>
                <td className="text-center">{account.currency}</td>
                <td className="text-center">{account.balance}</td>
                <td className="text-center">
                  <Link to={`/main/cuentas/${account.id}`} onClick={() => dispatch(setSelectedAccount(account))}>
                    <i className="fas fa-eye text-info"/>
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
              <DataHeader headerText="Cuentas" />
              {renderItems()}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
