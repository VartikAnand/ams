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

interface User {
  firstName: string | null;
  lastName: string | null;
}

interface CreatePaymentBy {
  farmerUser: User[];
  initialData: string;
  farmerId: string;
}

interface Selection {
  id: string;
  name: string;
}

export const CreatePaymentBy = ({
  farmerUser,
  farmerId,
  initialData,
}: CreatePaymentBy) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState<Selection>(new Set([]));
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const usersArray = Array.isArray(farmerUser) ? farmerUser : [];

  const handleOpen = () => {
    onOpen();
  };

  const onSubmit = async () => {
    try {
      await axios.patch(
        `/api/farmers/${farmerId}/farmerPayment/${initialData.payId}`,
        {
          userUuid: value.currentKey,
        }
      );
      toast.success("userUuid Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating userUuid:", error);
      toast.error("Something went wrong");
    }
  };

  const foundUser = farmerUser.find(
    (user) => user.uuid === initialData?.userUuid
  );
  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Payment By
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
          {initialData?.userUuid ? (
            <p className="text-sm mt-2">
              {foundUser.firstName} {foundUser.lastName}
            </p>
          ) : (
            <p className="text-sm mt-2">Add userUuid To Continue...</p>
          )}
        </>
      ) : null}

      {isEditing && (
        <div className="my-2">
          <Select
            variant="faded"
            color="primary"
            size="sm"
            label="Select Payment Made By..."
            selectedKeys={value}
            onSelectionChange={setValue}
          >
            {usersArray.map((user) => (
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
