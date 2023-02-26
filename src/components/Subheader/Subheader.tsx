import { FC } from 'react';
import { Input, InputGroup, InputRightElement, Flex, useToken, Button } from '@chakra-ui/react';
import { SearchIcon, SyncIcon } from '../Icons';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../app/store';
import { syncPartners } from '../../pages/PartnerOverview/partnerOverviewSlice';

interface SubheaderProps {
  placeholder?: string;
}

export const Subheader: FC<SubheaderProps> = ({ placeholder }) => {
  const { t } = useTranslation();
  const [{ 300: black }] = useToken('colors', ['blackAlpha']);
  const dispatch = useAppDispatch();

  const runDataSync = () => {
    dispatch(syncPartners());
  };

  return (
    <Flex w="100%" justify="flex-end" my={6}>
      <InputGroup w="18rem" mr="1.5em">
        <Input h="2.25rem" placeholder={placeholder ? t(placeholder) : ''} />
        <InputRightElement h="2.25rem" borderLeft={`1.5px solid ${black}`} children={<SearchIcon />} />
      </InputGroup>
      <Button
        p="1em"
        h="2.25rem"
        size={'md'}
        leftIcon={<SyncIcon />}
        colorScheme="green"
        variant="outline"
        aria-label="run partners sync"
        onClick={runDataSync}
      >
        {t('button.sync')}
      </Button>
    </Flex>
  );
};
