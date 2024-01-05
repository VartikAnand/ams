import React from "react";

const statusOptions = [
  { name: "Pending", uid: false },
  { name: "Given", uid: true },
];

const columns = [
  { name: "Total Amount", uid: "tottalAmount", sortable: true },

  { name: "Paid Amount", uid: "paidAmount", sortable: true },

  { name: "Left Amount", uid: "leftAmount", sortable: true },
  { name: "Particular", uid: " particular" },
  { name: "Notes", uid: "notes" },

  { name: "Payment Received", uid: "paymentRecivedBy", sortable: true },

  { name: "Status", uid: "isPaymentAdded", sortable: true },
  { name: "Mode", uid: "paymentMode", sortable: true },
  { name: "PayID", uid: "paymentModeId" },
  { name: "Other Info", uid: "paymentModeInfo" },

  { name: "Date", uid: "createdAt", sortable: true },
];

export { statusOptions, columns };
