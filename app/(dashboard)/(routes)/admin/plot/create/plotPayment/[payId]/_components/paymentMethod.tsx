"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { Cash } from "./(actions)/cash";
import { Pencil, Plus, X } from "lucide-react";
import { Cheque } from "./(actions)/cheque";
import { Upi } from "./(actions)/upi";
import { RTGS } from "./(actions)/rtgs";

interface CreatePaymentMethodProps {
  initialData: string;
  payId: string;
  farmerId: string;
}

export const PaymentMethod = ({
  initialData,
  payId,
  farmerId,
}: CreatePaymentMethodProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>("Cash");

  const toggleEdit = () => setIsEditing((current) => !current);

  const renderSelectedText = () => {
    let selectedText = "Please select a Payment Method";

    if (paymentMethod) {
      selectedText = `You selected ${paymentMethod}`;
    }

    return selectedText;
  };

  return (
    <div className="mt-6 border rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        <span className="flex">
          PaymentMethod<p className="text-danger">*</p>
        </span>
        <div>
          <>
            {isEditing ? (
              <>
                <Button
                  isIconOnly
                  onClick={toggleEdit}
                  color="danger"
                  variant="flat"
                >
                  <X className="h-4 w-4 " />
                </Button>
              </>
            ) : (
              <>
                <Button
                  isIconOnly
                  onClick={toggleEdit}
                  color="primary"
                  variant="flat"
                >
                  <Plus className="h-4 w-4 " />
                </Button>
              </>
            )}
          </>
        </div>
      </div>

      {!isEditing && (
        <p className="text-base mt-2">
          {initialData.paymentMode || "Add PaymentMethod To Continue..."}
        </p>
      )}

      {isEditing && (
        <div>
          {/* Payment Method Selection */}

          {!initialData.paymentMode ? (
            <>
              <select
                className="w-full p-2  shadow-inner mt-2 rounded-md focus:outline-none focus:border-primary focus:text-primary focus:ring-primary focus:ring-1 focus:bg-default-200"
                value={paymentMethod || ""}
                onChange={(e) => setPaymentMethod(e.target.value || null)}
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="upi">UPI</option>
                <option value="rgts">RTGS</option>
              </select>
              {paymentMethod === "Cash" && (
                <Cash
                  farmerId={farmerId}
                  payId={payId}
                  initialData={initialData}
                />
              )}
              {paymentMethod === "cheque" && (
                <Cheque
                  farmerId={farmerId}
                  payId={payId}
                  initialData={initialData}
                />
              )}{" "}
              {paymentMethod === "upi" && (
                <Upi
                  farmerId={farmerId}
                  payId={payId}
                  initialData={initialData}
                />
              )}
              {paymentMethod === "rgts" && (
                <RTGS
                  farmerId={farmerId}
                  payId={payId}
                  initialData={initialData}
                />
              )}
            </>
          ) : (
            <div className="bg-danger bg-opacity-10 shadow-md w-full h-10 my-2 rounded-md items-center flex justify-center align-middle">
              <p className="text-danger text-xs text-center ">
                Already you have add payment method
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
