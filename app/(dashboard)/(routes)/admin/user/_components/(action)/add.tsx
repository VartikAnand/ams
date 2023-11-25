"use client";
import React from "react";
import { toast } from "sonner";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateUser from "./../../create/page";
interface userDataProps {
  userData: string;
}

export const Add = ({ userData }: userDataProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="flat" isIconOnly color="primary">
        <Plus />
      </Button>

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
                <div className="mx-2">Add User</div>
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
    </>
  );
};
