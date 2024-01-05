"use client";
import React, { useState } from "react";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CreateUser from "./../../../../../user/create/page";

import {
  Modal,
  Select,
  SelectItem,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

const formSchema = z.object({
  userUuid: z.string().min(3, {
    message: "userUuid must be at least 3 characters long",
  }),

  paymentMadeBy: z.string(),
});

interface SalaryFormProps {
  initialData: string;
  salId: string;
  empId: string;
  userData: string;
}
export const PlotPayMadeBy = ({
  initialData,
  plotId,
  salId,
  userData,
}: SalaryFormProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState<Selection>(new Set([]));
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const handleOpen = () => {
    onOpen();
  };

  const onSubmit = async () => {
    try {
      await axios.patch(
        `/api/plotSale/${plotId}/plotPayment/${initialData.payId}`,
        {
          userUuid: value.currentKey,
          isPaymentAdded: true,
        }
      );
      toast.success("Payment Made By Added");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        <span className="flex">
          Payment Received By<p className="text-danger">*</p>
        </span>
        <div>
          {!initialData?.userUuid ? (
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

      {!isEditing ? (
        <>
          {initialData?.userUuid ? (
            <p className="text-sm mt-2">{initialData?.paymentRecivedBy} </p>
          ) : (
            <p className="text-sm mt-2">Add userUuid To Continue...</p>
          )}
        </>
      ) : null}

      {isEditing && (
        <>
          {!initialData.userUuid ? (
            <>
              {" "}
              <div className="my-2">
                <Select
                  variant="faded"
                  color="primary"
                  size="sm"
                  label="Select Payment Made By..."
                  selectedKeys={value}
                  onSelectionChange={setValue}
                >
                  {userData.map((user) => (
                    <SelectItem
                      color="primary"
                      variant="bordered"
                      key={user.uuid}
                      value={user.uuid}
                      // defaultSelectedKeys={}
                    >
                      {`${user.firstName || ""} ${user.lastName || ""}`}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  type="submit"
                  onClick={onSubmit}
                  color="primary"
                  variant="flat"
                  className="mt-4"
                >
                  Add
                </Button>
              </div>
            </>
          ) : (
            <div className="bg-danger bg-opacity-10 shadow-md w-full h-10 my-2 rounded-md items-center flex justify-center align-middle">
              <p className="text-danger text-xs text-center">
                This addition is irreversible.
              </p>
            </div>
          )}
        </>
      )}

      <div className="w-full flex justify-end items-end ">
        <p
          onClick={handleOpen}
          className="cursor-pointer text-xs font-normal  hover:text-primary"
        >
          Create a User
        </p>
        <Modal
          hideCloseButton
          backdrop="blur"
          placement="center"
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col p-6 m-0 ">
                  <div className="mx-2">Create User</div>
                </ModalHeader>
                <ModalBody className="p-2">
                  <CreateUser />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
