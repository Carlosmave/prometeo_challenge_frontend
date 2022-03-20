import React from "react";
import { Input } from "reactstrap";
import { useDispatch } from 'react-redux'
import { Controller } from "react-hook-form";

const InputField = (formProps) => {
  const dispatch = useDispatch()
  return (
    <div>
      <Controller
       name={formProps.name}
       control={formProps.control}
       defaultValue={formProps.defaultValue ? formProps.defaultValue : ""}
       rules={{ required: formProps.required }}
       render={props => (
         <Input
           onChange={(e) => {
             props.onChange(e)
           }}
           onBlur={() => {
             props.onBlur()
             dispatch(formProps.dispatchFunction({key:props.name, value:props.value}));
           }}
           type={formProps.type}
           value={props.value ? props.value : ""}
           name={props.name}
           placeholder={formProps.placeholder ? formProps.placeholder : ""}
           disabled={formProps.disabled ? formProps.disabled : false}
         />
      )}
      />
      {formProps.errors[formProps.name] && <p style={{color: "#bf1650"}}>{formProps.errorMessage}</p>}
    </div>
  );
}

export default InputField;
