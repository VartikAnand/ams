import React from "react";

const statusOptions = [
  { name: "Pending", uid: false },
  { name: "Given", uid: true },
];

const columns = [
  { name: "Amount", uid: "amount", sortable: true },
  { name: "Type", uid: "paymentType", sortable: true },
  { name: "For", uid: "ForToName", sortable: true },

  { name: "Table", uid: "paymentFromTo", sortable: true },
  { name: "Name", uid: "paymentTo", sortable: true },

  { name: "Mode", uid: "paymentMode", sortable: true },
  { name: "PayID", uid: "paymentModeId" },
  { name: "Other Info", uid: "paymentModeInfo" },

  { name: "Date", uid: "createdAt", sortable: true },
];

export { statusOptions, columns };
