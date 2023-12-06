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

interface CreateCashProps {
  farmerId: string;
  payId: string;
  initialData: FarmerPayment[];
}

interface FarmerPayment {
  Cash: string | null;
}

const formSchema = z.object({
  Cash: z.string().min(3, {
    message: "Cash must be at least 3 characters long",
  }),
});

export const Cash = ({ farmerId, payId, initialData }: CreateCashProps) => {
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
      console.log(values);

      await axios.patch(
        `/api/salary/${farmerId}/employeePayment/${initialData.salId}`,
        {
          paymentType: "Credit",
          paymentMode: "Cash",
          paymentModeId: "Hand To Hand",
          paymentModeInfo: values.Cash,
        }
      );
      toast.success("Cash payment method has been added successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating adding cash method:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="my-3">
        <h3 className="text-lg">Person Name</h3>
        <p
          className="text-xs text-default-400
        "
        >
          Enter the person name whom money is handed
        </p>
        <Input
          {...register("Cash")}
          type="text"
          size="xs"
          variant="flat"
          placeholder="Cash Given To person name "
          color={formState.errors.Cash ? "danger" : "primary"}
          isInvalid={!!formState.errors.Cash}
          errorMessage={formState.errors.Cash?.message}
          className="my-3"
        />

        <Button type="submit" color="primary" variant="flat" className="mt-4">
          Add
        </Button>
      </form>
    </div>
  );
};
