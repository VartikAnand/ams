import React from "react";
import DropDownForm from "./_components/dropDownForm";
import { db } from "@/lib/db";

const CreatePlot = async () => {
  const farmer = await db.farmer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex items-center justify-center h-full">
      <DropDownForm initialData={farmer} />
    </div>
  );
};

export default CreatePlot;
