"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";

interface khasraNumberFormProps {
  initialData: {
    khasraNumber: string;
  };
  farmerId: {
    farmerId: string;
  };
}

const formSchema = z.object({
  khasraNumber: z.string().min(1, {
    message: "khasra Number must be at least 1 number long",
  }),
});

export const KhasraNumberForm = ({
  farmerId,
  initialData,
}: khasraNumberFormProps) => {
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
    const parsedKhasraNumber = parseInt(values.khasraNumber);

    try {
      await axios.patch(`/api/farmers/${farmerId}`, {
        khasraNumber: parsedKhasraNumber,
      });
      toast.success("Land khasraNumber Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating land khasraNumber:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        khasra Number
        <Button onClick={toggleEdit} color="primary" variant="flat">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 " /> Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-sm mt-2">{initialData.khasraNumber}</p>}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("khasraNumber")}
            type="text"
            size="sm"
            variant="flat"
            defaultValue={initialData.khasraNumber}
            color={formState.errors.khasraNumber ? "danger" : "primary"}
            isInvalid={!!formState.errors.khasraNumber}
            errorMessage={formState.errors.khasraNumber?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
