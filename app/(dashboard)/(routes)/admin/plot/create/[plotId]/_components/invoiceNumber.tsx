import React from "react";

export const InvoiceNumber = ({ initialData }) => {
  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Invoice Number
      </div>
      <p className="text-sm mt-2">{initialData?.salesInvoiceNumber}</p>
    </div>
  );
};
