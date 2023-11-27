"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { Textarea } from "@nextui-org/react";
import Link from "next/link";
import { createFarmer } from "/utils/create.js";
const formSchema = z.object({
  khasraNumber: z.string().min(1, {
    message: "Kashar Number must be at least 10 characters long",
  }),

  landTitle: z.string().min(3, {
    message: "Land Title must be at least 10 characters long",
  }),
  landLocation: z.string().min(5, {
    message: "Land Location must be at least 10 characters long",
  }),

  totalArea: z.string().refine((value) => /^\d+(\.\d+)?$/.test(value), {
    message: "Please enter a valid number or decimal for Total Area",
  }),

  perSqCost: z.string().refine((value) => /^\d+(\.\d+)?$/.test(value), {
    message: "Please enter a valid number or decimal for Per Sq. m² Cost",
  }),
});

const CreateFarmer = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      khasraNumber: "",
      landTitle: "",
      landLocation: "",
      totalArea: "",
      perSqCost: "",
    },
  });

  const { handleSubmit, register, reset, formState } = form;

  const { isSubmitting, isValid, dirtyFields } = formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { landTitle, landLocation, khasraNumber, totalArea, perSqCost } =
        values;

      const response = await axios.post("/api/farmers", values);

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Land Detail's", status: "success" };
        },
        {
          loading: "Adding Land Detail ......",
          success: (data) => `${data.name} Added Fill Farmer Detail's`,

          error: "Error in  Adding Land Details",
        }
      );
      router.push(`/admin/farmerEntry/create/${response.data.id}`);

      reset();
    } catch {
      toast.error("Try Again! Something went wrong");
    }
  };

  return (
    <div className="lg:max-w-4xl md:w-full  mx-auto flex md:items-center md:justify-center h-full p-6">
      <form
        className="flex flex-col gap-2  w-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full ">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Kashar Number</h1>
            <p className="text-xs text-slate-600">
              Enter land kashar number such as &quot; 28 , 101 &quot; etc ...
            </p>
            <Input
              size="sm"
              {...register("khasraNumber")}
              type="number"
              label="Kashar Number"
              variant="flat"
              isRequired
              color={formState.errors.khasraNumber ? "danger" : "primary"}
              isInvalid={!!formState.errors.khasraNumber}
              errorMessage={formState.errors.khasraNumber?.message}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Land Title</h1>
            <p className="text-xs text-slate-600">
              Enter land title like &quot;Someone Lands&quot;
            </p>
            <Input
              {...register("landTitle")}
              type="text"
              size="sm"
              label="Land Title"
              variant="flat"
              isRequired
              color={formState.errors.landTitle ? "danger" : "primary"}
              isInvalid={!!formState.errors.landTitle}
              errorMessage={formState.errors.landTitle?.message}
            />
          </div>
        </div>

        <div className="my-2 flex flex-col gap-2">
          <h1 className="text-2xl">Land Location</h1>
          <p className="text-xs text-slate-600">
            Enter land location like &quot;Sans 142, Plot 10, District
            ABC.&quot;
          </p>
          <Textarea
            {...register("landLocation")}
            type="text"
            size="sm"
            isRequired
            label="Land Location"
            variant="flat"
            color={formState.errors.landLocation ? "danger" : "primary"}
            isInvalid={!!formState.errors.landLocation}
            errorMessage={formState.errors.landLocation?.message}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full ">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Total Area</h1>
            <p className="text-xs text-slate-600">
              Enter total area of land in Sq.&nbsp;m&sup2;
            </p>
            <Input
              {...register("totalArea")}
              type="text"
              size="sm"
              isRequired
              label="Total Area"
              variant="flat"
              color={formState.errors.totalArea ? "danger" : "primary"}
              isInvalid={!!formState.errors.totalArea}
              errorMessage={formState.errors.totalArea?.message}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Per Sq.&nbsp;m&sup2; Cost</h1>
            <p className="text-xs text-slate-600">
              Enter cost of land in Sq.&nbsp;m&sup2; such as &quot;1230 , 1200
              ...&quot;
            </p>
            <Input
              {...register("perSqCost")}
              type="text"
              label="Per Sq.&nbsp;m&sup2;"
              size="sm"
              isRequired
              variant="flat"
              color={formState.errors.perSqCost ? "danger" : "primary"}
              isInvalid={!!formState.errors.perSqCost}
              errorMessage={formState.errors.perSqCost?.message}
            />
          </div>
        </div>
        <div className="flex  gap-x-2 lg:justify-end lg:items-end justify-center items-center lg:py-5 py-2 ">
          <Link className="lg:w-28 w-full" href="/">
            <Button
              color="primary"
              className="lg:w-28 w-full"
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
          </Link>
          <Button
            variant="shadow"
            color="primary"
            className="cursor-pointer lg:w-28 w-full "
            type="submit"
            isDisabled={
              !isValid || !Object.keys(dirtyFields).length || isSubmitting
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateFarmer;
