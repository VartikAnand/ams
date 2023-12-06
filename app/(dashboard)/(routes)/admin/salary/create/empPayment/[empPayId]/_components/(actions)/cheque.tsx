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

interface CreateChequeProps {
  farmerId: string;
  payId: string;
  initialData: FarmerPayment[];
}

interface FarmerPayment {
  Cheque: string | null;
}

const formSchema = z.object({
  ChequeBank: z.string().min(3, {
    message: "Bank Name is required",
  }),
  ChequeId: z.string().min(3, {
    message: "Cheque Number is required",
  }),
});

export const Cheque = ({ farmerId, payId, initialData }: CreateChequeProps) => {
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
        `/api/salary/${farmerId}/employeePayment/${initialData.salId}`,
        {
          paymentType: "Credit",
          paymentMode: "Cheque",
          paymentModeId: values.ChequeId,
          paymentModeInfo: values.ChequeBank,
        }
      );
      toast.success("Cheque payment method has been added successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating adding Cheque method:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="my-3">
        <h3 className="text-lg">Cheque Info</h3>
        <p
          className="text-xs text-default-400
        "
        >
          Enter the cheque information such as ChequeNo. & Bank Name
        </p>
        <Input
          {...register("ChequeId")}
          type="number"
          size="xs"
          variant="flat"
          placeholder="Cheque Number "
          color={formState.errors.ChequeId ? "danger" : "primary"}
          isInvalid={!!formState.errors.ChequeId}
          errorMessage={formState.errors.ChequeId?.message}
          className="my-3"
        />

        <Input
          {...register("ChequeBank")}
          type="text"
          size="xs"
          variant="flat"
          placeholder="Bank Name"
          color={formState.errors.ChequeBank ? "danger" : "primary"}
          isInvalid={!!formState.errors.ChequeBank}
          errorMessage={formState.errors.ChequeBank?.message}
          className="my-3"
        />
        <Button type="submit" color="primary" variant="flat" className="mt-4">
          Add
        </Button>
      </form>
    </div>
  );
};
