"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Textarea } from "@nextui-org/react";

interface CreateNoteProps {
  farmerId: string;
  payId: string;
  initialData: FarmerPayment[];
}

interface FarmerPayment {
  note: string | null;
}

const formSchema = z.object({
  note: z.string().min(3, {
    message: "Note must be at least 3 characters long",
  }),
});

export const Note = ({ farmerId, payId, initialData }: CreateNoteProps) => {
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
          notes: values.note,
        }
      );
      toast.success("Note Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating Note:", error);
      toast.error("Try Again !! Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-6 ">
      <div className="font-medium flex items-center justify-between">
        Any Note
        <div>
          {!initialData?.notes ? (
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
          ) : (
            <>
              <Button onClick={toggleEdit} color="primary" variant="flat">
                {isEditing ? (
                  <>Cancel</>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 " /> Edit
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <>
          {initialData?.notes ? (
            <p className="text-sm mt-2">{initialData.notes}</p>
          ) : (
            <p className="text-sm mt-2">Add note To Continue...</p>
          )}
        </>
      ) : null}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Textarea
            {...register("note")}
            type="text"
            size="sm"
            variant="flat"
            placeholder="Add something to remember "
            defaultValue={initialData.notes}
            color={formState.errors.note ? "danger" : "primary"}
            isInvalid={!!formState.errors.note}
            errorMessage={formState.errors.note?.message}
          />

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!initialData?.note ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
