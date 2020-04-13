import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const {
  Provider: EmployeeProvider,
  Consumer: EmployeeConsumer
} = createContext();


const resourceData = require("../assets/employees.json");

export const EmployeeContext = ({ children }) => {
  const [theme, setTheme] = useState(resourceData);
  return (
    <EmployeeProvider
      value={{
        theme,
        changeTheme: newTheme => setTheme(newTheme)
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
