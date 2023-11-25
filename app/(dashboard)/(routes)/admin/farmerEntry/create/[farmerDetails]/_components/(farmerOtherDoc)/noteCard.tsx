"use client";
import {
  Button,
  Input,
  Textarea,
  Divider,
  Link,
  Chip,
} from "@nextui-org/react";
import { Pencil, X, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod";

interface noteCardProps {
  farmerId: string;
  initialData: string;
}

const formSchema = z.object({
  note: z.string().min(1, {
    message: "write something && required minimum of 1 character",
  }),
  someUrl: z.string().refine(
    (url) => {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlRegex.test(url);
    },
    {
      message: "Invalid URL format. Please enter a valid URL.",
    }
  ),
});

export const NoteCard = ({ farmerId, initialData }: noteCardProps) => {
  const router = useRouter();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const startEditing = (noteId: string) => {
    setEditingNoteId(noteId);
  };

  const stopEditing = () => {
    setEditingNoteId(null);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatedNote = {
        noteId: farmerId,
        id: editingNoteId, // the id of the note being edited
        notes: values.note,
        someUrl: values.someUrl,
      };

      // const response = await axios.put(
      //   `/api/farmers/${farmerId}/farmerNotes/${editingNoteId}`,
      //   updatedNote
      // );

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Notes", status: "success" };
        },
        {
          loading: "Updating Notes...",
          success: (data) => `${data.name} Updated Successfully`,
          error: "Error Updating Notes",
        }
      );

      stopEditing();
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/farmers/${farmerId}/farmerNotes/${id}`);
      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Notes", status: "success" };
        },
        {
          loading: "Deleting Notes...",
          success: (data) => `${data.name} Deleted Successfully`,
          error: "Error Deleting Notes",
        }
      );

      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="">
      <Divider className="my-4" />
      {initialData.farmerNotes.length === 0 && <p>No data available.</p>}

      {initialData.farmerNotes.map((note, index) => (
        <div key={index}>
          <div className="font-medium flex items-center justify-between border p-2 my-2 rounded-md border-primary-100">
            <div className="flex flex-col gap-1 justify-center mx-1">
              <p className="text-base ">{note.notes}</p>
              {note.someUrl ? (
                <Chip size="sm" color="warning" variant="flat">
                  <Link
                    size="sm"
                    target="_blank"
                    showAnchorIcon
                    href={note.someUrl}
                    color="warning"
                  >
                    Doc
                  </Link>
                </Chip>
              ) : null}
            </div>

            {/* Button Edit && Delete */}
            <div className="flex gap-2">
              <Button
                isIconOnly
                onClick={() =>
                  editingNoteId === note.id
                    ? stopEditing()
                    : startEditing(note.id)
                }
                color="primary"
                variant="flat"
              >
                {editingNoteId === note.id ? (
                  <X className="h-4 w-4 " />
                ) : (
                  <Pencil className="h-4 w-4 " />
                )}
              </Button>
              <Button
                isIconOnly
                onClick={() => handleDelete(note.id, note.notes, note.someUrl)}
                color="danger"
                variant="flat"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {editingNoteId === note.id && (
            <form onSubmit={handleSubmit(onSubmit)} className="my-3 ">
              <div className="flex flex-col sm:flex-row sm:gap-y-2 gap-2 justify-between w-full">
                <div className=" flex flex-col w-full gap-1 ">
                  <Textarea
                    {...register("note")}
                    type="text"
                    size="sm"
                    isRequired
                    variant="flat"
                    defaultValue={initialData.farmerNotes[index].notes}
                    color={formState.errors.note ? "danger" : "primary"}
                    isInvalid={!!formState.errors.note}
                    errorMessage={formState.errors.note?.message}
                  />
                </div>
                <div className=" flex flex-col  w-full gap-1 ">
                  <h3>Link or Url</h3>
                  <Input
                    {...register("someUrl")}
                    type="text"
                    size="sm"
                    isRequired
                    variant="flat"
                    defaultValue={initialData.farmerNotes[index].someUrl}
                    color={formState.errors.someUrl ? "danger" : "primary"}
                    isInvalid={!!formState.errors.someUrl}
                    errorMessage={formState.errors.someUrl?.message}
                  />
                </div>
              </div>
              <Button
                type="submit"
                color="primary"
                variant="flat"
                className="mt-4"
              >
                Add
              </Button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};
