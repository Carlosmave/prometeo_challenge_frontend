import React from "react";
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { Controller } from "react-hook-form";

const Dropdown = (formProps) => {
  const dispatch = useDispatch()
  return (
    <div>
      <Controller
       name={formProps.name}
       control={formProps.control}
       defaultValue={formProps.defaultValue ? formProps.defaultValue : ""}
       rules={{ required: formProps.required }}
       render={props => (
         <Select className="mt-1"
           onChange={(e) => {
             props.onChange(e)
             dispatch(formProps.dispatchFunction({key:props.name, value:e}));
           }}
           isClearable={true}
           getOptionLabel ={(option)=>option.name}
           getOptionValue ={(option)=>option.code}
           placeholder={formProps.placeholder}
           theme={theme => ({
             ...theme,
             colors: {
               ...theme.colors,
               primary: 'red',
               primary25: '#ff7f7f',
               primary50: 'red',
             },
           })}
           options={formProps.options}
           value={props.value ? props.value : ""}
           name={props.name}
           menuPortalTarget={document.querySelector('body')}
           isDisabled={formProps.disabled ? formProps.disabled : false}
         />
      )}
      />
      {formProps.errors[formProps.name] && <p style={{color: "#bf1650"}}>{formProps.errorMessage}</p>}
    </div>
  );
}

export default Dropdown;
