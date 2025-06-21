import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure
} from "@chakra-ui/react";

const DisclaimerModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  useEffect(() => {
    const seen = localStorage.getItem("disclaimerAcknowledged");
    if (!seen) {
      onOpen();
    } else {
      setAcknowledged(true);
    }
  }, [onOpen]);

  const handleAcknowledge = () => {
    localStorage.setItem("disclaimerAcknowledged", "true");
    setAcknowledged(true);
    onClose();
  };

  if (acknowledged) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleAcknowledge} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to OSS Contribution Helper</ModalHeader>
        <ModalBody>
  <Text mb={3}>
    GitHub issues shown here are curated for <strong>first-time contributors</strong>.
  </Text>
  <Text mb={2}>
    Please communicate <strong>politely and respectfully</strong> when interacting on issues.
  </Text>
  <Text mb={2}>
    Always confirm with the issue creator before starting to work on an issue.
  </Text>
  <Text>
    If any requirement or technical detail is unclear, make sure to clarify it with the issue creator before proceeding. Clear understanding leads to better contributions.
  </Text>
</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAcknowledge}>
            I Understand
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DisclaimerModal;
