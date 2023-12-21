import React from "react";
import { db } from "@/lib/db";
import { CreateSell } from "./_components/createSell";
import { Tractor, LandPlot } from "lucide-react";
import { Button } from "@nextui-org/react";
import { InvoiceNumber } from "./_components/invoiceNumber";
import { PlotNumberForm } from "./_components/plotNumber";
import { PlotPriceForm } from "./_components/plotPrice";
import { CustomerNameForm } from "./_components/(customerDetails)/customerName";
import { AddressForm } from "./_components/(customerDetails)/addressForm";
import { PhoneNumberForm } from "./_components/(customerDetails)/phoneNumberForm";
import { DocUrlForm } from "./_components/docUrl";
import { PlotDelete } from "./_components/delete";
import { Save } from "./_components/save";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const PlotId = async ({ params }: { params: { plotId: string } }) => {
  const plot = await db.plotSale.findUnique({
    where: {
      saleId: params.plotId,
    },
  });

  if (!plot) {
    return redirect("/admin");
  }

  const land = await db.farmer.findUnique({
    where: {
      id: plot.farmerLandId,
    },
  });
  if (!land) {
    return toast.info("No Land Data Found");
  }
  const requiredFields = [
    plot.plotNumber,
    plot.salesInvoiceNumber,
    plot.plotPrice,
    plot.customerName,
    plot.custommerAddress,
    plot.custommerPhoneNumber,
    plot.customerIdProofUrl,
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
          <div className="flex flex-row gap-y-2 gap-2">
            {completionText === totalFields ? (
              <Button
                isDisabled
                variant="ghost"
                color="primary"
                aria-label="save"
              >
                Save
              </Button>
            ) : (
              <>
                <Save initialData={plot} saleId={plot.saleId} landData={land} />
              </>
            )}
          </div>
          <PlotDelete empId={plot.saleId} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
          <InvoiceNumber initialData={plot} />
          {/* PlotNumber Form */}
          <PlotNumberForm initialData={plot} saleId={plot.saleId} />

          {/* Plot Price */}

          <PlotPriceForm initialData={plot} saleId={plot.saleId} />
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
          <CustomerNameForm initialData={plot} saleId={plot.saleId} />

          <AddressForm initialData={plot} farmerId={plot.saleId} />
          <PhoneNumberForm initialData={plot} farmerId={plot.saleId} />
        </div>
      </div>
      <div>
        <DocUrlForm initialData={plot} saleId={plot.saleId} />
      </div>
    </div>
  );
};

export default PlotId;
