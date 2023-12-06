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

interface CreateUpiProps {
  farmerId: string;
  payId: string;
  initialData: FarmerPayment[];
}

interface FarmerPayment {
  Upi: string | null;
}

const formSchema = z.object({
  UpiBank: z.string().min(3, {
    message: "Bank Name is required",
  }),
  UpiId: z.string().min(3, {
    message: "Upi Number is required",
  }),
});

export const Upi = ({ farmerId, payId, initialData }: CreateUpiProps) => {
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
          paymentMode: "Upi",
          paymentModeId: values.UpiId,
          paymentModeInfo: values.UpiBank,
        }
      );
      toast.success("Upi payment method has been added successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating adding Upi method:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="my-3">
        <h3 className="text-lg">Upi Info</h3>
        <p
          className="text-xs text-default-400
        "
        >
          Enter the Upi information such as Upi Id. & Bank Name
        </p>
        <Input
          {...register("UpiId")}
          type="text"
          size="xs"
          variant="flat"
          placeholder="Upi Number "
          color={formState.errors.UpiId ? "danger" : "primary"}
          isInvalid={!!formState.errors.UpiId}
          errorMessage={formState.errors.UpiId?.message}
          className="my-3"
        />

        <Input
          {...register("UpiBank")}
          type="text"
          size="xs"
          variant="flat"
          placeholder="Bank Name"
          color={formState.errors.UpiBank ? "danger" : "primary"}
          isInvalid={!!formState.errors.UpiBank}
          errorMessage={formState.errors.UpiBank?.message}
          className="my-3"
        />
        <Button type="submit" color="primary" variant="flat" className="mt-4">
          Add
        </Button>
      </form>
    </div>
  );
};
