import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { creditCardSelector, setFormData, setDateErrorDisplay, fetchMovements, setInitialData } from 'slices/creditCard'
import { Button, Row, Col, Form, FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
import InputField from "components/FormElements/InputField.js"
import Dropdown from "components/FormElements/Dropdown.js"
import { useForm } from "react-hook-form";

const CreditCardFilters = () => {
  const { formData, dateErrorDisplay, selectedCreditCard, currencies } = useSelector(creditCardSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  const { handleSubmit, errors, control, reset } = useForm({defaultValues: formData});
  useEffect(() => {
    dispatch(setInitialData())
    reset({});
  }, [dispatch, reset]);
  const onSubmit = data => {
    if (data.startDate>data.endDate){
      dispatch(setDateErrorDisplay("block"))
    } else {
      dispatch(setDateErrorDisplay("none"))
      dispatch(fetchMovements(selectedCreditCard, data, history))
    }
  };
  return (
    <Form role="form" onSubmit={handleSubmit(onSubmit)}>
      <Row className="mt-3 mb-2 pl-4 pr-4">
        <Col lg="3">
          <FormGroup>
            <label className="form-control-label">Fecha de inicio *</label>
            <InputField name="startDate" control={control} required={true} dispatchFunction={setFormData} type="date"
            placeholder="Fecha de inicio" disabled={false} errors={errors}
            errorMessage="⚠ Debe ingresar una fecha de inicio" />
          </FormGroup>
        </Col>
        <Col lg="3">
          <FormGroup>
            <label className="form-control-label">Fecha de fin *</label>
            <InputField name="endDate" control={control} required={true} dispatchFunction={setFormData} type="date"
            placeholder="Fecha de fin" disabled={false} errors={errors}
            errorMessage="⚠ Debe ingresar una fecha de fin" />
          </FormGroup>
        </Col>
        <Col lg="3">
          <FormGroup>
            <label className="form-control-label">Moneda *</label>
            <Dropdown name="currency" control={control} required={true} dispatchFunction={setFormData} placeholder="Seleccione"
            options={currencies} disabled={false} errors={errors} errorMessage="⚠ Debe seleccionar una moneda" label="name" value="code" />
          </FormGroup>
        </Col>
        <Col lg="3">
          <FormGroup>
            <label className="form-control-label">{'\u00A0'}</label>
            <div className="text-center">
              <Button className="bg-danger" type="submit" style={{color:"white"}}>
                Buscar
              </Button>
            </div>
          </FormGroup>
        </Col>
      </Row>
      <p className="pl-4 pr-4" style={{color: "#bf1650", display:dateErrorDisplay}}>⚠ La fecha de inicio debe ser menor a la fecha de fin</p>
    </Form>
  );
}

export default CreditCardFilters;
