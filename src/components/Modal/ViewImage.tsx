import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Text,
  Box,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="900px" maxH="600px">
        <ModalBody p="0">
          <Image src={imgUrl} fit="cover" h="600px" />
        </ModalBody>

        <ModalFooter
          justifyContent="flex-start"
          bgColor="pGray.800"
          p="0.5rem"
          borderBottomLeftRadius="6px"
          borderBottomRightRadius="6px"
        >
          <Link href={imgUrl} about="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
