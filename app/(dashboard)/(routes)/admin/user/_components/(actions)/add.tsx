"use client";
import React from "react";
import CreateUser from "./../../create/page";
import { Plus } from "lucide-react";

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

export const Add = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="w-full flex justify-end items-end ">
      <Button
        isIconOnly
        variant="flat"
        color="primary"
        aria-label="cancel"
        onClick={handleOpen}
      >
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
  );
};
