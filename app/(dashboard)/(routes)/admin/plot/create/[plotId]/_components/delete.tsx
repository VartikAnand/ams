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
  empId: string;
}

export const PlotDelete = ({ empId }: DeleteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const handleOpen = () => {
    onOpen();
  };
  const handleDelete = async (empId: string) => {
    try {
      console.log(empId);
      await toast.promise(
        async () => {
          try {
            await axios.delete(`/api/plotSale/${empId}`);
            return { name: "Plot Deleted", status: "success" };
          } catch (error) {
            toast.error("Something went wrong");
            throw new Error("Error in Deleting");
          }
          router.push("/admin/plot");
        },
        {
          loading: "Deleting Complete Data...",
          success: (data) => `Deleted Successfully`,
          error: (error) => `${error}`,
        }
      );
    } catch (error) {
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
          onClick={() => handleOpen()}
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
                  your data and remove from our servers.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="danger" onClick={() => handleDelete(empId)}>
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
