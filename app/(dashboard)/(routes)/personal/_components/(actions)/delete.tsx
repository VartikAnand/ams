"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

interface DeletePaymentProps {
  userAccountId: string;
}

export const Delete = ({ userAccountId }: DeletePaymentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const handleOpen = () => {
    onOpen();
  };

  const handleDelete = async (userAccountId: string) => {
    try {
      await axios.delete(`/api/user/${userAccountId}`);
      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Payment", status: "success" };
        },
        {
          loading: "Deleting Payment Data...",
          success: (data) => `${data.name} Deleted Successfully`,
          error: "Error in  Deleting ",
        }
      );

      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button
          size="sm"
          className="p-1"
          isIconOnly
          variant="flat"
          color="danger"
          onPress={() => handleOpen()}
        >
          <Trash2 />
        </Button>
      </div>
      <Modal
        placement="center"
        hideCloseButton
        backdrop="blur"
        color="primary"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                color="primary"
                className="flex flex-col gap-1 text-base font-semibold"
              >
                Are you absolutely sure?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm font-normal ">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(userAccountId)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
