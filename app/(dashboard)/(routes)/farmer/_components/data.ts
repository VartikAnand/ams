import React from "react";

const statusOptions = [
  { name: "Ongoing", uid: false },
  { name: "Completed", uid: true },
];

const columns = [
  { name: "Khasra No.", uid: "khasraNumber", sortable: true },

  { name: "Land Title", uid: "landTitle", sortable: true },
  { name: "Land Location", uid: "landLocation" },
  { name: "Total Area", uid: "totalArea" },
  { name: "Per sq Cost", uid: "perSqCost" },
  { name: "Total Land Cost", uid: "totalLandCost" },
  { name: "Remaining Amount", uid: "remainingAmount", sortable: true },

  { name: "Date", uid: "createdAt" },
  { name: "Payment", uid: "isPayment", sortable: true },
];

export { statusOptions, columns };
