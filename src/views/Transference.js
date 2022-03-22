import React, { useEffect, useRef } from 'react'
import { Card, CardBody, FormGroup, TabContent, Container, Row, Col, TabPane, Form, Label, CardFooter, Button } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import { transferenceSelector, setFormData, fetchTransfererenceData, submitTransferenceForm, setAccountErrorDisplay, setInitialData } from 'slices/transference'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import DataHeader from "components/Headers/DataHeader.js"
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";
import Dropdown from "components/FormElements/Dropdown.js"
import InputField from "components/FormElements/InputField.js"

const Transference = () => {
  const { formData, loading, accounts, transferDestinations, currencies, accountErrorDisplay } = useSelector(transferenceSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  const { handleSubmit, errors, control, reset } = useForm({defaultValues: formData});
  const onSubmit = data => {
    if (data.originAccount.id === data.destinationAccount.id){
      dispatch(setAccountErrorDisplay("block"))
    } else {
      dispatch(setAccountErrorDisplay("none"))
      dispatch(submitTransferenceForm(data, history))
    }
  };
  useEffect(() => {
    dispatch(setInitialData())
    reset({});
    dispatch(fetchTransfererenceData(history))
  }, [dispatch, reset, history]);
  const formRef = useRef(null);
  const onFinishButtonClick = () => {
    formRef.current.dispatchEvent(new Event('submit', {'bubbles': true, 'cancelable': true}))
  };
  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText="Cargando datos para transferencias"/>)
    return (
      <TabContent>
        <TabPane>
        <Form innerRef={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Row className="align-items-center mb-4">
            <div className="col">
              <h3 className="mb-0">Datos para la transferencia</h3>
            </div>
          </Row>
          <Row form>
            <Col lg="4">
              <FormGroup>
                <Label className="form-control-label">Cuenta de origen *</Label>
                <Dropdown name="originAccount" control={control} required={true} dispatchFunction={setFormData} placeholder="Seleccione"
                options={accounts} disabled={false} errors={errors} errorMessage="⚠ Debe seleccionar una cuenta de origen" label="name" value="number" />
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label className="form-control-label">Institución de destino *</Label>
                <Dropdown name="destinationInstitution" control={control} required={true} dispatchFunction={setFormData} placeholder="Seleccione"
                options={transferDestinations} disabled={false} errors={errors} errorMessage="⚠ Debe seleccionar una institución de destino"
                label="name" value="id" />
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label className="form-control-label">Cuenta de destino *</Label>
                <Dropdown name="destinationAccount" control={control} required={true} dispatchFunction={setFormData} placeholder="Seleccione"
                options={accounts} disabled={false} errors={errors} errorMessage="⚠ Debe seleccionar una cuenta de destino" label="name" value="number" />
              </FormGroup>
            </Col>
          </Row>
          <p className="pl-4 pr-4" style={{color: "#bf1650", display:accountErrorDisplay}}>⚠ Las cuentas de origen y de destino deben ser distintas</p>
          <Row form>
            <Col lg="6">
              <FormGroup>
                <Label className="form-control-label">Moneda *</Label>
                <Dropdown name="currency" control={control} required={true} dispatchFunction={setFormData} placeholder="Seleccione"
                options={currencies} disabled={false} errors={errors} errorMessage="⚠ Debe seleccionar una moneda" label="name" value="code" />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <Label className="form-control-label">Cantidad *</Label>
                <InputField name="amount" control={control} required={true} dispatchFunction={setFormData} type="number"
                placeholder="Cantidad" disabled={false} errors={errors}
                errorMessage="⚠ Debe ingresar una cantidad" />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col lg="6">
              <FormGroup>
                <Label className="form-control-label">Concepto *</Label>
                <InputField name="concept" control={control} required={true} dispatchFunction={setFormData} type="text"
                placeholder="Concepto" disabled={false} errors={errors}
                errorMessage="⚠ Debe ingresar un concepto" />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <Label className="form-control-label">Nombre del destinatario</Label>
                <InputField name="destinationOwnerName" control={control} required={false} dispatchFunction={setFormData} type="text"
                placeholder="Nombre del destinatario" disabled={false} errors={errors}
                errorMessage="⚠ Debe ingresar un nombre del destinatario" />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        </TabPane>
      </TabContent>
    )
  }
  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8"/>
      <Container className="pb-5 mt--8" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <DataHeader headerText="Transferencias" />
              <CardBody>
                {renderItems()}
              </CardBody>
              <CardFooter className="card-footer">
                <div style={{ float: "right" }}>
                  <Button className="bg-danger" style={{color:"white"}} onClick={() => onFinishButtonClick()} >
                   Realizar transferencia
                  </Button>
                </div>
                <div className="clearfix" />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Transference;
