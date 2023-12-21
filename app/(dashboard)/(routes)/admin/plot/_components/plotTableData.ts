import React from "react";

const statusOptions = [
  { name: "Pending", uid: false },
  { name: "Given", uid: true },
];

const columns = [
  { name: "Sno.", uid: "salesInvoiceNumber", sortable: true },

  { name: "Plot Number", uid: "plotNumber", sortable: true },
  { name: "Plot Price", uid: "plotPrice", sortable: true },
  { name: "Customer Name", uid: "customerName", sortable: true },
  { name: "Address", uid: "customerAddress", sortable: true },
  { name: "Contact No.", uid: "custommerPhoneNumber", sortable: true },
  { name: "Docs URL", uid: "customerIdProofUrl" },
  { name: "plot Sale Date", uid: "saleDate", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export { statusOptions, columns };
