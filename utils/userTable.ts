import React from "react";

const statusOptions = [
  { name: "Pending", uid: false },
  { name: "Given", uid: true },
];

const columns = [
  { name: "Full Name", uid: "fullName", sortable: true },
  { name: "User Name", uid: "userName", sortable: true },
  { name: "First Name", uid: "firstName", sortable: true },
  { name: "Last Name", uid: "lastName", sortable: true },
  { name: "Contact No.", uid: "phoneNumber", sortable: true },
  { name: "Email", uid: "email" },
  { name: "Created At", uid: "createdAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export { statusOptions, columns };
