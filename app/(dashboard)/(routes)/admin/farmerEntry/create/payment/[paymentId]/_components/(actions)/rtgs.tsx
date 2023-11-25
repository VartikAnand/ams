"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Textarea, Input } from "@nextui-org/react";

interface CreateRTGSProps {
  farmerId: string;
  payId: string;
  initialData: FarmerPayment[];
}

interface FarmerPayment {
  RTGS: string | null;
}

const formSchema = z.object({
  RTGSBank: z.string().min(3, {
    message: "Bank Name is required",
  }),
  RTGSId: z.string().min(3, {
    message: "RTGS Number is required",
  }),
});

export const RTGS = ({ farmerId, payId, initialData }: CreateRTGSProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/farmers/${farmerId}/farmerPayment/${initialData.payId}`,
        {
          paymentType: "Debit",
          paymentMode: "RTGS",
          paymentModeId: values.RTGSId,
          paymentModeInfo: values.RTGSBank,
          isPaymentAdded: true,
        }
      );
      toast.success("RTGS payment method has been added successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating adding RTGS method:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="my-3">
        <h3 className="text-lg">RTGS Info</h3>
        <p
          className="text-xs text-default-400
        "
        >
          Enter the RTGS information such as RTGSNo. & Bank Name
        </p>
        <Input
          {...register("RTGSId")}
          type="number"
          size="xs"
          variant="flat"
          placeholder="RTGS Number "
          color={formState.errors.RTGSId ? "danger" : "primary"}
          isInvalid={!!formState.errors.RTGSId}
          errorMessage={formState.errors.RTGSId?.message}
          className="my-3"
        />

        <Input
          {...register("RTGSBank")}
          type="text"
          size="xs"
          variant="flat"
          placeholder="Bank Name"
          color={formState.errors.RTGSBank ? "danger" : "primary"}
          isInvalid={!!formState.errors.RTGSBank}
          errorMessage={formState.errors.RTGSBank?.message}
          className="my-3"
        />
        <Button type="submit" color="primary" variant="flat" className="mt-4">
          Add
        </Button>
      </form>
    </div>
  );
};
