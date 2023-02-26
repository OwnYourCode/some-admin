import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal as ChakraModal,
} from '@chakra-ui/react';
import { FC, MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  initialRef: MutableRefObject<HTMLInputElement | null>;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  modalHeader?: string;
}

export const Modal: FC<ModalProps> = ({ initialRef, modalHeader, isOpen, onClose, onSave, children }) => {
  const { t } = useTranslation();

  return (
    <ChakraModal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>

        <ModalFooter>
          <Button onClick={onSave} colorScheme="blue" mr={3}>
            {t('button.save')}
          </Button>
          <Button onClick={onClose}>{t('button.cancel')}</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
