import React from "react";


const TextInput = ({
  field,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <input
    {...props}
    id="outlined-basic"
    variant="outlined"
    error={!!touched[field.name] && !!errors[field.name]}
    helperText={touched[field.name] && errors[field.name]}
    {...field}
  />
);



export default TextInput;
