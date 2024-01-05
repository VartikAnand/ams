"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input, Link } from "@nextui-org/react";

interface DocUrlFormProps {
  initialData: {
    docUrl: string;
  };
  plotId: {
    plotId: string;
  };
}

const formSchema = z.object({
  docUrl: z.string().min(1, {
    message: "Paste Document URL",
  }),
});

export const DocUrlForm = ({ plotId, initialData }: DocUrlFormProps) => {
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
        `/api/plotSale/${plotId}/plotPayment/${initialData.payId}`,
        {
          notes: values.docUrl,
        }
      );
      toast.success(" Customer Document Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating  Customer Document :", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 overflow-hidden ">
      <div className="font-medium flex items-center justify-between">
        Notes
        <div>
          {!initialData?.customerIdProofUrl ? (
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
              <Button
                isIconOnly
                onClick={toggleEdit}
                color="primary"
                variant="flat"
              >
                {isEditing ? (
                  <X className="h-4 w-4 " />
                ) : (
                  <>
                    <Pencil className="h-4 w-4 " />
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <p className="text-sm mt-2 overflow-auto">
          {initialData.notes &&
            (initialData.notes.startsWith("https://") ||
            initialData.notes.startsWith("http://") ||
            initialData.notes.startsWith("www.") ? (
              <Link href={initialData.notes} color="warning" underline="always">
                {initialData.notes}
              </Link>
            ) : (
              initialData.notes || "No Document Found"
            ))}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("docUrl")}
            type="text"
            size="sm"
            variant="flat"
            placeholder="Write any important information"
            defaultValue={initialData.notes}
            color={formState.errors.docUrl ? "danger" : "primary"}
            isInvalid={!!formState.errors.docUrl}
            errorMessage={formState.errors.docUrl?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
