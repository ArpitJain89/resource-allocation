import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
const resourceData = require("../assets/employees.json");

export const {
  Provider: EmployeeProvider,
  Consumer: EmployeeConsumer
} = createContext();

export const EmployeeContext = ({ children }) => {
  const [data, setData] = useState(resourceData);
  return (
    <EmployeeProvider
      value={{
        data,
        changeData: newTheme => setData(newTheme)
      }}
    >
      {children}
    </EmployeeProvider>
  );
};

EmployeeContext.propTypes = {
  children: PropTypes.element.isRequired
};

export default EmployeeContext;
