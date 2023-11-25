import React from "react";

const statusOptions = [
  { name: "Pending", uid: false },
  { name: "Given", uid: true },
];

const columns = [
  { name: "Paid Amount", uid: "paidAmount", sortable: true },
  { name: "Particular", uid: "particular" },
  { name: "Name", uid: "paymentGivenBy", sortable: true },

  { name: "Mode", uid: "paymentMode", sortable: true },
  { name: "PayID", uid: "paymentModeId" },
  { name: "Other Info", uid: "paymentModeInfo" },

  { name: "Date", uid: "createdAt", sortable: true },
  { name: "Status", uid: "isPaymentAdded", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export { statusOptions, columns };
