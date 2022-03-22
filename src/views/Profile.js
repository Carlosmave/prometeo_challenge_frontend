import React, { useEffect } from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import DataHeader from "components/Headers/DataHeader.js"
import { profileSelector, fetchProfile } from 'slices/profile'
import { useHistory } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";
import WarningCard from "components/WarningCard/WarningCard.js";
import { Table } from "reactstrap";

const Profile = () => {
  const { profile, loading, hasErrors } = useSelector(profileSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  useEffect(() => {
    dispatch(fetchProfile(history))
  }, [dispatch, history]);
  const headers = ["Nombre", "Documento", "Email"]
  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText="Cargando perfil"/>)
    if (hasErrors) return (<WarningCard warningImage="error" warningText="Hubo un error al obtener el perfil"/>)
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
            <tr>
              <td className="text-center">{profile.name}</td>
              <td className="text-center">{profile.document}</td>
              <td className="text-center">{profile.email}</td>
            </tr>
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
              <DataHeader headerText="Perfil" />
              {renderItems()}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
