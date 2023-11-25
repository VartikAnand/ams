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

interface TitleFormProps {
  initialData: {
    landTitle: string;
  };
  farmerId: {
    farmerId: string;
  };
}

const formSchema = z.object({
  landTitle: z.string().min(3, {
    message: "Land title must be at least 3 characters long",
  }),
});

export const TitleForm = ({ farmerId, initialData }: TitleFormProps) => {
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
      await axios.patch(`/api/farmers/${farmerId}`, {
        landTitle: values.landTitle,
      });
      toast.success("Land Title Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating land title:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Land Title
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

      {!isEditing && <p className="text-sm mt-2">{initialData.landTitle}</p>}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("landTitle")}
            type="text"
            // label="Land Title"
            size="sm"
            variant="flat"
            defaultValue={initialData.landTitle}
            color={formState.errors.landTitle ? "danger" : "primary"}
            isInvalid={!!formState.errors.landTitle}
            errorMessage={formState.errors.landTitle?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
