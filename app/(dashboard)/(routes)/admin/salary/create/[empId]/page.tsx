import React from "react";

const EmpId = async ({ params }: { params: { empId: string } }) => {
  return <div>{params.empId}</div>;
};

export default EmpId;
