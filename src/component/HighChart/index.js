import React, { useContext } from "react";
import EmployeeCountGraph from "./EmployeeCountGraph";
 import EmployeeJobLevelGraph from "./EmployeeJobLevelGraph";
import { EmployeeConsumer } from "../../context/EmployeeContext";
const Index = () => {
  const { data } = useContext(EmployeeConsumer);
  return (
    <div className="row">
      <EmployeeCountGraph resourceData={data} />
      <EmployeeJobLevelGraph resourceData={data} />
    </div>
  );
};
export default Index;
