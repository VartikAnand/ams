"use client";
import React from "react";
import { Trash } from "lucide-react";
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

interface DeleteProps {
  salId: string;
  empId: string;
}

export const Delete = ({ salId, empId }: DeleteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const handleOpen = () => {
    onOpen();
  };
  const handleDelete = async (salId: string) => {
    try {
      `/api/salary/${empId}/employeePayment/${salId}`;
      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Land & Farmer Detail's", status: "success" };
        },
        {
          loading: "Deleting Complete Data...",
          success: (data) => `${data.name} Deleted Successfully`,
          error: "Error in  Deleting ",
        }
      );

      router.push("/admin/salary");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button
          isIconOnly
          variant="flat"
          color="danger"
          onPress={() => handleOpen()}
        >
          <Trash />
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
                  your record and remove your data from our servers.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onClick={() => handleDelete(salId)}>
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
