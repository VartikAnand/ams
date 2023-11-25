"use client";
import { useState } from "react";
import { CreateFarmerForm } from "./(farmerDetails)/CreateFarmerForm";
import { Divider, Button } from "@nextui-org/react";
import { AlertTriangle, StickyNote } from "lucide-react";
import { AddressForm } from "./(farmerDetails)/addressForm";
import { PhoneNumberForm } from "./(farmerDetails)/phoneNumberForm";
import { AadhaarNumberForm } from "./(farmerDetails)/aadhaarNumberForm";
import CreateDoc from "./(farmerOtherDoc)/createDoc";

interface farmerDetailPageFormProps {
  initialData: {
    khasraNumber: string;
  };
  farmerId: {
    farmerId: string;
  };
}

export const FarmerDetailPage = ({
  farmerId,
  initialData,
}: farmerDetailPageFormProps) => {
  const [isFarmerDetails, setIsFarmerDetails] = useState(
    initialData.farmerDetails || null
  );

  return (
    <div>
      <CreateFarmerForm farmerId={initialData.id} initialData={initialData} />

      {!isFarmerDetails ? (
        <>
          <Divider className="my-4" />

          <div className="mt-6 border border-warning  rounded-md p-4 bg-warning-600/10 bg-opacity-80 ">
            <p className=" lg:text-sm text-xs text-warning flex gap-2 items-center justify-center">
              <AlertTriangle />
              Enter the Farmer&apos;s Name to add other details & continue.
            </p>
          </div>
        </>
      ) : (
        <div>
          {/* Farmer address Form */}
          <AddressForm farmerId={initialData.id} initialData={initialData} />
          {/* phoneNumber fORM */}
          <PhoneNumberForm
            farmerId={initialData.id}
            initialData={initialData}
          />
          {/* Aadhaar Number Form */}
          <AadhaarNumberForm
            farmerId={initialData.id}
            initialData={initialData}
          />
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
          <CreateDoc farmerId={initialData.id} initialData={initialData} />
        </div>
      )}
    </div>
  );
};
