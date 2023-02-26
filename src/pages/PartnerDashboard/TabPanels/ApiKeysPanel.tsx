import { Alert, Button, Flex, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React, { FC, useCallback, useRef, useState } from 'react';
import { Clipboard } from '../../../components/Clipboard/Clipboard';
import { ApiKeyClipBoard } from '../../../components/Clipboard/ApiKeyClipBoard';
import { ApiKey } from '../../../shared/models/apiKey';
import { PlusIcon } from '../../../components/Icons';
import { useAppDispatch } from '../../../app/store';
import { addPartnerApiKey, updatePartnerApiKey } from '../../AddPartner/partnerSlice';
import { Modal } from '../../../components/Modal/Modal';

interface ApiKeysPanelProps {
  partnerId: string;
  apiKeys?: ApiKey[];
}

enum MODAL_TYPE {
  SAVE = 'SAVE',
  EDIT = 'EDIT',
}

export const ApiKeysPanel: FC<ApiKeysPanelProps> = ({ partnerId, apiKeys }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const initialRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const apiKeyId = useRef<number | undefined>(undefined);
  const openModal = useRef<MODAL_TYPE>(MODAL_TYPE.SAVE);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openEditModal = useCallback(
    (apiKey) => {
      apiKeyId.current = apiKey.id;
      setName(apiKey.name);
      openModal.current = MODAL_TYPE.EDIT;
      onOpen();
    },
    [onOpen],
  );

  const openCreateModal = useCallback(() => {
    openModal.current = MODAL_TYPE.SAVE;
    onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    setName('');
    onClose();
  }, [onClose]);

  const createApiKey = useCallback(() => {
    const name = initialRef.current?.value;
    if (name) {
      dispatch(addPartnerApiKey({ partnerId, name }));
    }
    handleClose();
  }, [dispatch, handleClose, partnerId]);

  const editApiKey = useCallback(() => {
    const name = initialRef.current?.value;
    if (name && apiKeyId.current) {
      dispatch(updatePartnerApiKey({ partnerId, apiKeyId: apiKeyId.current, name }));
    }
    handleClose();
  }, [dispatch, apiKeyId, partnerId, handleClose]);

  const handleChange = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);

  const isSaveModal = openModal.current === MODAL_TYPE.SAVE;

  return (
    <>
      <Alert pr="4.5rem" mb="1rem" borderRadius="lg">
        {t('page.partner.dashboard.api.info')}
      </Alert>
      <Clipboard colorScheme="green" value={partnerId} label={t('page.partner.dashboard.api.partner.label')} />
      {!!apiKeys?.length && (
        <Flex direction="column" mt="2rem">
          <FormLabel>{t('page.partner.dashboard.api.key.label')}</FormLabel>
          {apiKeys.map((apiKey) => (
            <ApiKeyClipBoard
              hasDelete
              hasEdit
              openEditModal={openEditModal}
              key={apiKey.key}
              value={apiKey}
              partnerId={partnerId}
              colorScheme="green"
            />
          ))}
        </Flex>
      )}
      <Flex mt="2rem" justifyContent="flex-end">
        <Button onClick={openCreateModal} leftIcon={<PlusIcon />} variant="outline" aria-label="create api key">
          {t('page.partner.dashboard.api.key.create')}
        </Button>
      </Flex>
      <Modal
        modalHeader={t(
          isSaveModal
            ? 'page.partner.dashboard.api.key.create.modal.header'
            : 'page.partner.dashboard.api.key.edit.modal.header',
        )}
        onClose={handleClose}
        isOpen={isOpen}
        initialRef={initialRef}
        onSave={isSaveModal ? createApiKey : editApiKey}
      >
        <FormControl>
          <FormLabel>{t('page.partner.dashboard.api.key.modal.input.label')}</FormLabel>
          <Input
            ref={initialRef}
            value={name}
            onChange={handleChange}
            placeholder={t('page.partner.dashboard.api.key.modal.input.placeholder')}
          />
        </FormControl>
      </Modal>
    </>
  );
};
