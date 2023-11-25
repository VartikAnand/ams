import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";

import { LandPlot, Tractor, Trash } from "lucide-react";

import { TitleForm } from "./_components/titleForm";
import { LocationForm } from "./_components/addressForm";
import { KhasraNumberForm } from "./_components/khasraNumberForm";
import { TotalAreaForm } from "./_components/totalAreaForm";
import { PerSqCostForm } from "./_components/perSqCost";
import { TotalLandCostForm } from "./_components/totalLandCostForm";
import { FarmerDetailPage } from "./_components/farmerDetail";
import { DeleteFarmer } from "./_components/deleteFarmer";

const FarmerDetails = async ({
  params,
}: {
  params: { farmerDetails: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  // Fetching Farmer Data from server

  const farmer = await db.farmer.findUnique({
    where: {
      id: params.farmerDetails,
    },
    include: {
      farmerDetails: true,
      farmerNotes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!farmer) {
    return redirect("/dashboard");
  }

  const requiredFields = [
    farmer.khasraNumber,
    farmer.landTitle,
    farmer.landLocation,
    farmer.totalArea,
    farmer.perSqCost,
    farmer.totalLandCost,
    farmer.farmerDetails?.id,
    farmer.farmerDetails?.fName,
    farmer.farmerDetails?.lName,
    farmer.farmerDetails?.address,
    farmer.farmerDetails?.city,
    farmer.farmerDetails?.state,
    farmer.farmerDetails?.pinCode,
    farmer.farmerDetails?.phoneNumber,
    farmer.farmerDetails?.aadharNumber,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      {/* Land Details Field */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Land Details Field&apos;s</h1>
          <span className="text-sm text-slate-500">
            Complete all fields {completionText}
          </span>
        </div>
        <div className="flex flex-row gap-y-2 gap-2">
          <Button variant="ghost" color="primary" aria-label="save">
            Save
          </Button>
          {/* DELETE FARMER  */}
          <DeleteFarmer farmerId={farmer.id} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          {/* Customize Land Details */}
          <div className="flex items-center gap-x-2">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              aria-label="Take a photo"
            >
              <LandPlot className="text-primary" />
            </Button>
            <h2 className="text-xl">Customize Land Details</h2>
          </div>
          {/* Land Kashara Number */}
          <KhasraNumberForm initialData={farmer} farmerId={farmer.id} />
          {/* Land Total Area Form */}
          <TotalAreaForm initialData={farmer} farmerId={farmer.id} />

          {/* Land Per Sq Cost */}
          <PerSqCostForm initialData={farmer} farmerId={farmer.id} />
          {/* Total Land Cost */}

          <TotalLandCostForm initialData={farmer} farmerId={farmer.id} />
          {/* Land Title Form */}
          <TitleForm initialData={farmer} farmerId={farmer.id} />
          {/* Land Location Form */}
          <LocationForm initialData={farmer} farmerId={farmer.id} />
        </div>
        <div>
          {/* Add Farmer Details */}
          <div className="flex items-center gap-x-2">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              aria-label="Take a photo"
            >
              <Tractor className="text-primary" />
            </Button>
            <h2 className="text-xl">Add Farmer Details</h2>
          </div>

          <FarmerDetailPage initialData={farmer} farmerId={farmer.id} />
        </div>
      </div>
    </div>
  );
};

export default FarmerDetails;
