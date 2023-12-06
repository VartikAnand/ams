import React from "react";

const statusOptions = [
  { name: "Pending", uid: false },
  { name: "Given", uid: true },
];

const columns = [
  { name: "Base Salary", uid: "salary", sortable: true },
  { name: "Bonus", uid: "bonus", sortable: true },
  { name: "Bonus Date", uid: "bonusDate", sortable: true },
  { name: "Deduction", uid: "deduction", sortable: true },
  { name: "Deduction Date", uid: "deductionDate", sortable: true },
  { name: "Net Salary", uid: "netSalary", sortable: true },

  { name: "Name", uid: "paymentGivenBy", sortable: true },

  { name: "Mode", uid: "paymentMode", sortable: true },
  { name: "PayID", uid: "paymentModeId" },
  { name: "Other Info", uid: "paymentModeInfo" },

  { name: "Date", uid: "createdAt", sortable: true },
  { name: "Status", uid: "isPaymentAdded", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export { statusOptions, columns };
