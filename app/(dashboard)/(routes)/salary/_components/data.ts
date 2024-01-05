import React from "react";

const statusOptions = [
  { name: "Ongoing", uid: false },
  { name: "Completed", uid: true },
];

const columns = [
  { name: "Department", uid: "department", sortable: true },
  { name: "Full Name", uid: "fullName", sortable: true },

  { name: "Base Salary", uid: "baseSalary", sortable: true },
  { name: "Payroll Period", uid: "payrollType", sortable: true },

  { name: "First Name", uid: "firstName" },
  { name: "Last Name", uid: "lastName" },
  { name: "Contact No.", uid: "phoneNumber" },
  { name: "Address", uid: "address" },
  { name: "City", uid: "city", sortable: true },
  { name: "State", uid: "state", sortable: true },
  { name: "Pincode", uid: "pinCode" },
  { name: "Aadhaar No.", uid: "aadharNumber" },
  { name: "Doc Url", uid: " docsProoURL" },
  { name: "Joining Date", uid: "join", sortable: true },
];

export { statusOptions, columns };
