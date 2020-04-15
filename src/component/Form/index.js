/* eslint-disable react/forbid-prop-types */
import React from "react";
// import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "25ch"
//     }
//   }
// }));

const index = ({ children, fields, ...props }) => {
  console.warn(props);
//   const classes = useStyles();
  return (
    <Formik
      initialValues={fields.reduce((p, c) => ({ ...p, [c.name]: c.value }), {})}
      {...props}
    >
      {() => (
        <Form >
          {fields.map(x => (
            <Field key={x.name} {...x} />
          ))}
          {children}
        </Form>
      )}
    </Formik>
  );
};




export default index;
