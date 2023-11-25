"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  userName: z
    .string()
    .min(4, {
      message: "User Name must be at least 4 characters long",
    })
    .regex(/^[\w-]+$/, {
      message: "Username can only contain letters, numbers, '_', or '-'",
    }),
  phoneNumber: z.string().min(10, {
    message: "Phone Number must be at least 10 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const CreateUser = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit, register, reset, formState } = form;

  const { isSubmitting, isValid, dirtyFields } = formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/user", values);

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "User Details", status: "success" };
        },
        {
          loading: "Creating User...",
          success: (data) => `${data.name} Created Successfully`,
          error: "Error in Creating User",
        }
      );
      router.refresh();
      reset();
    } catch (err) {
      if (err) {
        // console.log("LOG :::", err.response);
      }
      // console.error(err);
      toast.error("Try Again! Something went wrong");
    }
  };

  return (
    <div className="w-full  mx-auto flex md:items-center md:justify-center h-full p-6">
      <form
        className="flex flex-col gap-2  w-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center w-full mx-auto gap-4 justify-between">
          <div className="flex flex-col ">
            <h1 className="text-lg">First Name</h1>
            <Input
              {...register("firstName")}
              type="text"
              size="xs"
              placeholder="First Name"
              variant="flat"
              isRequired
              color={formState.errors.firstName ? "danger" : "primary"}
              isInvalid={!!formState.errors.firstName}
              errorMessage={formState.errors.firstName?.message}
            />
          </div>
          <div className="flex flex-col ">
            <h1 className="text-lg">Last Name</h1>
            <Input
              {...register("lastName")}
              type="text"
              size="xs"
              placeholder="Last Name"
              variant="flat"
              isRequired
              color={formState.errors.lastName ? "danger" : "primary"}
              isInvalid={!!formState.errors.lastName}
              errorMessage={formState.errors.lastName?.message}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-lg">Password</h1>
          <Input
            {...register("password")}
            type="text"
            size="xs"
            placeholder="Password"
            variant="flat"
            isRequired
            color={formState.errors.password ? "danger" : "primary"}
            isInvalid={!!formState.errors.password}
            errorMessage={formState.errors.password?.message}
          />
        </div>

        <div className="flex flex-col gap-2  ">
          <h1 className="text-lg">User Name</h1>
          <Input
            {...register("userName")}
            type="text"
            size="xs"
            placeholder="User Name"
            variant="flat"
            isRequired
            color={formState.errors.userName ? "danger" : "primary"}
            isInvalid={!!formState.errors.userName}
            errorMessage={formState.errors.userName?.message}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-lg">Phone Number</h1>
          <Input
            {...register("phoneNumber")}
            type="tel"
            size="xs"
            placeholder="Phone Number"
            variant="flat"
            isRequired
            color={formState.errors.phoneNumber ? "danger" : "primary"}
            isInvalid={!!formState.errors.phoneNumber}
            errorMessage={formState.errors.phoneNumber?.message}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Email</h1>
          <Input
            {...register("email")}
            type="email"
            size="sm"
            placeholder="Email"
            variant="flat"
            isRequired
            color={formState.errors.email ? "danger" : "primary"}
            isInvalid={!!formState.errors.email}
            errorMessage={formState.errors.email?.message}
          />
        </div>

        <div className="flex gap-x-2 lg:justify-end lg:items-end justify-center items-center lg:py-5 py-2 ">
          <Button
            variant="shadow"
            color="primary"
            className="cursor-pointer w-full"
            type="submit"
            // isDisabled={
            //   !isValid || !Object.keys(dirtyFields).length || isSubmitting
            // }
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
