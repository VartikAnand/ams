"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, FilePlus2, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input, Textarea } from "@nextui-org/react";
import { NoteCard } from "./noteCard";
interface createDocProps {
  farmerId: string;
  initialData: string;
}
const formSchema = z.object({
  note: z.string().min(1, {
    message: "write something && required minimum of 1 character",
  }),
  someUrl: z.string().refine(
    (url) => {
      if (url.trim() === "") {
        return true;
      }

      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlRegex.test(url);
    },
    {
      message: "Invalid URL format. Please enter a valid URL.",
    }
  ),
});
const CreateDoc = ({ farmerId, initialData }: createDocProps) => {
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
      await axios.post(`/api/farmers/${farmerId}/farmerNotes`, {
        notes: values.note,
        someUrl: values.someUrl || "",
        farmerId,
      });

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Notes", status: "success" };
        },
        {
          loading: "Adding Notes...",
          success: (data) => `${data.name} Added Successfully`,
          error: "Error Adding Notes",
        }
      );

      router.refresh();
      toggleEdit();
      // window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      toast.error(" Try Again !! Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Add Notes
        <Button isIconOnly onClick={toggleEdit} color="primary" variant="flat">
          {isEditing ? (
            <>
              <X className="h-4 w-4 " />
            </>
          ) : (
            <>
              <FilePlus2 className="h-4 w-4 " />
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3 ">
          <div className="flex flex-col sm:flex-row sm:gap-y-2 gap-2 justify-between w-full">
            <div className=" flex flex-col w-full gap-1 ">
              <Textarea
                {...register("note")}
                type="text"
                size="sm"
                isRequired
                variant="flat"
                placeholder={"Write here..."}
                color={formState.errors.note ? "danger" : "primary"}
                isInvalid={!!formState.errors.note}
                errorMessage={formState.errors.note?.message}
              />
              <div className=" flex flex-col  w-full gap-1 ">
                <h3>Link or Url</h3>
                <Input
                  {...register("someUrl")}
                  type="text"
                  size="sm"
                  variant="flat"
                  placeholder={"http://abc.com"}
                  color={formState.errors.someUrl ? "danger" : "primary"}
                  isInvalid={!!formState.errors.someUrl}
                  errorMessage={formState.errors.someUrl?.message}
                />
              </div>
            </div>
          </div>
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Add
          </Button>
        </form>
      )}
      <div className="my-2">
        <NoteCard farmerId={initialData.id} initialData={initialData} />
      </div>
    </div>
  );
};

export default CreateDoc;
