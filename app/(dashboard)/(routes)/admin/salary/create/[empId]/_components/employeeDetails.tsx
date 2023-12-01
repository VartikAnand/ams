"use client";
import { useState } from "react";
import { Divider, Button } from "@nextui-org/react";
import { AlertTriangle, StickyNote } from "lucide-react";
import { CreateEmpDetailForm } from "./(employeeDetails)/createEmpDetailForm";
import { AddressForm } from "./(employeeDetails)/addressForm";

interface EmployeeDetailsPageFormProps {
  initialData: string;
  empId: {
    empId: string;
  };
}

export const EmployeeDetailsPage = ({
  empId,
  initialData,
}: EmployeeDetailsPageFormProps) => {
  const [isFarmerDetails, setIsFarmerDetails] = useState(
    initialData.employeeDetails || null
  );

  return (
    <div>
      <CreateEmpDetailForm empId={initialData.id} initialData={initialData} />

      {!isFarmerDetails ? (
        <>
          <Divider className="my-4" />

          <div className="mt-6 border border-warning  rounded-md p-4 bg-warning-600/10 bg-opacity-80 ">
            <p className=" lg:text-sm text-xs text-warning flex gap-2 items-center justify-center">
              <AlertTriangle />
              Enter the Employee&apos;s Name to add other details & continue.
            </p>
          </div>
        </>
      ) : (
        <div>
          <AddressForm empId={initialData.empId} initialData={initialData} />
          {/* phoneNumber fORM */}
          {/* <PhoneNumberForm
            farmerId={initialData.id}
            initialData={initialData}
          /> */}
          {/* Aadhaar Number Form */}
          {/* <AadhaarNumberForm
            farmerId={initialData.id}
            initialData={initialData}
          /> */}
          {/* /other notes section */}

          <div className="flex items-center gap-x-2 my-3">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              aria-label="notes"
            >
              <StickyNote className="text-primary" />
            </Button>
            <h2 className="text-xl">Other Notes</h2>
          </div>
        </div>
      )}
    </div>
  );
};
