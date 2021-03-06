import React, { useEffect } from 'react'
import { Col, Form, FormGroup } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import { loginSelector, setFormData, submitLoginForm, fetchProviders, setInitialData } from 'slices/login'
import Dropdown from "components/FormElements/Dropdown.js"
import InputField from "components/FormElements/InputField.js"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import LoadingSpinner from "components/LoadingSpinners/LoadingSpinner.js";

const Login = () => {
  const { formData, providers, types, loading, typeDropdownDisabled } = useSelector(loginSelector)
  const dispatch = useDispatch()
  let history = useHistory();
  const { handleSubmit, errors, control, reset, setValue } = useForm({defaultValues: formData});
  const onSubmit = data => {
    dispatch(submitLoginForm(data, history))
  };
  useEffect(() => {
    dispatch(setInitialData())
    reset({});
    dispatch(fetchProviders())
  }, [dispatch, reset]);

  useEffect(() => {
    setValue('type', formData.type, { shouldValidate: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.provider]);

  const renderItems = () => {
    if (loading) return (<LoadingSpinner loadingText={"Cargando"}/>)
    return (
      <>
        <div className="text-center text-muted mb-4">
          <small>Ingrese sus credenciales</small>
        </div>
        <Form role="form" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <InputField name="username" control={control} required={true} dispatchFunction={setFormData} type="text"
            placeholder="Nombre de usuario" disabled={false} errors={errors}
            errorMessage="⚠ Debe ingresar su nombre de usuario" />
          </FormGroup>
          <FormGroup>
            <InputField name="password" control={control} required={true} dispatchFunction={setFormData} type="password"
            placeholder="Contraseña" disabled={false} errors={errors}
            errorMessage="⚠ Debe ingresar su contraseña" />
          </FormGroup>
          <FormGroup>
            <Dropdown name="provider" control={control} required={true} dispatchFunction={setFormData} placeholder="Seleccione un proveedor"
            options={providers} disabled={false} errors={errors} errorMessage="⚠ Debe seleccionar un proveedor" label="name" value="code" />
          </FormGroup>
          <FormGroup>
            <Dropdown name="type" control={control} required={false} dispatchFunction={setFormData} placeholder="Seleccione un tipo (opcional)"
            options={types} disabled={typeDropdownDisabled} errors={errors} errorMessage="⚠ Debe seleccionar un tipo" label="name" value="code" />
          </FormGroup>
          <div className="text-center">
            <Button className="my-4 bg-danger" type="submit" style={{color:"white"}}>
              Login
            </Button>
          </div>
        </Form>
      </>
    )
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            {renderItems()}
          </CardBody>
        </Card>
      </Col>
    </>
    );
}

export default Login;
