import React, { useContext } from "react";
// import moment from 'moment';
import PropTypes from "prop-types";
import ThemeConsumer from "../context/ThemeContext";
// import { LocaleContext } from "../../contex/LocaleContext";

const Index = ({ history }) => {


  console.warn("render");

  return (
    
     
      <ThemeConsumer>{value => <h3>{value.theme}</h3>}</ThemeConsumer>
     
   
  );
};


export default Index;
