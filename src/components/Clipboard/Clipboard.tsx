import { useClipboard, Input, Flex, FormLabel, FormControl, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CopyIcon } from '../Icons/CopyIcon';
import { useToggle } from '../../hooks/useToggle';

interface ClipboardProps {
  placeholder?: string;
  value: string;
  label?: string;
  hasDelete?: boolean;
  hasEdit?: boolean;
  key?: string;
  colorScheme?: string;
}

export const Clipboard: FC<ClipboardProps> = ({
  value,
  label,
  placeholder,
  hasDelete = false,
  hasEdit = false,
  key,
  colorScheme,
  ...restProps
}) => {
  const { hasCopied, onCopy } = useClipboard(value);
  const { t } = useTranslation();
  const { isOpen, close, open } = useToggle(hasCopied);

  const onHandleCopy = () => {
    open();
    onCopy();
    setTimeout(() => close(), 600);
  };

  return (
    <FormControl mb={2} key={key}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Flex alignItems="center">
        <Input mr="1em" value={value} isDisabled isReadOnly placeholder={placeholder} />
        <Tooltip placement="top" isOpen={isOpen} label={t('component.clipboard.copied')}>
          <div>
            <CopyIcon color={colorScheme} boxSize="1.25em" m="0 0.25em" onClick={onHandleCopy} />
          </div>
        </Tooltip>
      </Flex>
    </FormControl>
  );
};
