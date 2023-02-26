import { FC } from 'react';
import { useAppDispatch } from '../../app/store';
import { Flex, FormControl, FormLabel, Input, Tooltip, useClipboard } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useToggle } from '../../hooks/useToggle';
import { deletePartnerApiKey } from '../../pages/AddPartner/partnerSlice';
import { CopyIcon } from '../Icons/CopyIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/Deletecon';
import { ApiKey } from '../../shared/models/apiKey';

interface ApiKeyProps {
  placeholder?: string;
  value: ApiKey;
  partnerId: string;
  label?: string;
  hasDelete?: boolean;
  hasEdit?: boolean;
  openEditModal: (apiKey: ApiKey) => void;
  colorScheme?: string;
}

export const ApiKeyClipBoard: FC<ApiKeyProps> = ({
  value: apiKey,
  label,
  placeholder,
  hasDelete = false,
  hasEdit = false,
  partnerId,
  openEditModal,
  colorScheme,
  ...restProps
}) => {
  const dispatch = useAppDispatch();
  const { hasCopied, onCopy } = useClipboard(apiKey.key);
  const { t } = useTranslation();
  const { isOpen, close, open } = useToggle(hasCopied);

  const onDelete = () => {
    dispatch(deletePartnerApiKey({ partnerId, apiKeyId: apiKey.id }));
  };

  const onHandleCopy = () => {
    open();
    onCopy();
    setTimeout(() => close(), 600);
  };

  const onEdit = (apiKey: ApiKey) => () => {
    openEditModal(apiKey);
  };

  return (
    <FormControl mb={2} {...restProps}>
      <Flex alignItems="center">
        <FormControl mr="1rem">
          <FormLabel>Name</FormLabel>
          <Input value={apiKey.name} isDisabled isReadOnly placeholder={placeholder} />
        </FormControl>
        <FormControl mr="1rem">
          <FormLabel>Key</FormLabel>
          <Input value={apiKey.key} isDisabled isReadOnly placeholder={placeholder} />
        </FormControl>

        <Flex mt="1.75rem">
          <Tooltip placement="top" isOpen={isOpen} label={t('component.clipboard.copied')}>
            <div>
              <CopyIcon color={colorScheme} boxSize="1.25em" m="0 0.25rem" onClick={onHandleCopy} />
            </div>
          </Tooltip>

          {hasEdit && <EditIcon color={colorScheme} boxSize="1.5em" m="0 0.25rem" onClick={onEdit(apiKey)} />}
          {hasDelete && <DeleteIcon color={colorScheme} boxSize="1.5em" m="0 0.25rem" onClick={onDelete} />}
        </Flex>
      </Flex>
    </FormControl>
  );
};
