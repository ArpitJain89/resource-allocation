
import React, { useContext } from "react";
import EmployeeCountGraph from "./EmployeeCountGraph";
import EmployeeJobLevelGraph from "./EmployeeJobLevelGraph";
import { EmployeeConsumer } from "../context/EmployeeContext";

  const HighChart = () => {
    const { theme } = useContext(EmployeeConsumer);
    return (
      <div className="row">
        <EmployeeCountGraph resourceData={theme} />
        <EmployeeJobLevelGraph resourceData={theme} />
      </div>
    );
  };
export default HighChart;