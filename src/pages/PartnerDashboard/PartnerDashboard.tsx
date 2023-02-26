import { Heading, Flex, TabList, Tab, Tabs, TabPanels, TabPanel, Box, Checkbox, Tooltip } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { CurrentPhasePanel } from './TabPanels/CurrentPhasePanel';
import { PropertiesPanel } from './TabPanels/PropertiesPanel';
import { ContactsPanel } from './TabPanels/ContactsPanel';
import { MarketplacePanel } from './TabPanels/MarketplacePanel';
import { FormCard } from '../../components/Card/FormCard';
import { CheckIcon, CloseIcon } from '../../components/Icons';
import { ApiKeysPanel } from './TabPanels/ApiKeysPanel';
import { getPartner, getPartnerApiKeys } from '../AddPartner/partnerSlice';
import { useAppDispatch } from '../../app/store';
import { useParams } from 'react-router-dom';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useTranslation } from 'react-i18next';
import { PartnerContacts } from './PartnerContacts';
import { usePartner } from '../../hooks/usePartner';

export const PartnerDashboard: FC<{ isNdaSigned?: boolean }> = ({ isNdaSigned = true }) => {
  const dispatch = useAppDispatch();
  const { partnerId } = useParams<{ partnerId: string }>();
  const { t } = useTranslation();
  const partner = usePartner();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(getPartnerApiKeys(partnerId));
    dispatch(getPartner(partnerId));
  }, [dispatch, partnerId]);

  const apiKeys = useApiKeys();

  const handleTabsChange = (index: number) => {
    setIndex(index);
  };

  const goToContacts = () => {
    handleTabsChange(2);
  };

  if (!partner) {
    return null;
  }

  return (
    <Flex direction="column" mt={4}>
      <Box border="1px" borderColor="gray.200" m="auto" w="7xl" minW="lg" boxShadow="md" px="2rem">
        <Heading my={4} as="h3" size="lg" fontWeight="500">
          {partner?.name}
        </Heading>
      </Box>
      <Flex m="auto" w="7xl" mt={4}>
        <Flex direction="column" marginRight={6} w="3xl">
          <FormCard marginBottom={3} headerMessage={t('page.partner.dashboard.header.published')}>
            <Checkbox>Not published</Checkbox>
          </FormCard>
          <FormCard marginBottom={3} headerMessage={t('page.partner.dashboard.header.documents')}>
            <Flex direction="column">
              <Box>{isNdaSigned ? <CheckIcon /> : <CloseIcon />}&nbsp;Signed NDA</Box>
              <Box>{isNdaSigned ? <CheckIcon /> : <CloseIcon />}&nbsp;Technical Questionnaire</Box>
              <Box>{isNdaSigned ? <CheckIcon /> : <CloseIcon />}&nbsp;Commercial Questionnaire</Box>
              <Box>{isNdaSigned ? <CheckIcon /> : <CloseIcon />}&nbsp;PCI Attestation of Compliance</Box>
              <Box>
                {isNdaSigned ? <CheckIcon /> : <CloseIcon />}&nbsp;Data Protection Agreement Expires at 24/02/2022
              </Box>
              <Box>{isNdaSigned ? <CheckIcon /> : <CloseIcon />}&nbsp;XML Agreement Click to review</Box>
            </Flex>
          </FormCard>
          {!!partner?.contacts?.length && (
            <PartnerContacts
              contacts={partner.contacts}
              goToContactsTab={goToContacts}
              headerMessage={t('page.partner.dashboard.header.contacts')}
            />
          )}
        </Flex>

        <Box borderColor="gray.200" boxShadow="md" w="100%">
          <Tabs index={index} onChange={handleTabsChange} variant="enclosed">
            <TabList>
              <Tab>{t('page.partner.dashboard.tab.name.phase')}</Tab>
              <Tooltip placement="top-end" label={t('page.partner.dashboard.tab.disabled.notification')}>
                <div>
                  <Tab isDisabled>{t('page.partner.dashboard.tab.name.properties')}</Tab>
                </div>
              </Tooltip>
              <Tooltip placement="top-end" label={t('page.partner.dashboard.tab.disabled.notification')}>
                <div>
                  <Tab>{t('page.partner.dashboard.tab.name.contacts')}</Tab>
                </div>
              </Tooltip>
              <Tooltip placement="top-end" label={t('page.partner.dashboard.tab.disabled.notification')}>
                <div>
                  <Tab isDisabled>{t('page.partner.dashboard.tab.name.market')}</Tab>
                </div>
              </Tooltip>
              <Tab>{t('page.partner.dashboard.tab.name.api')}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CurrentPhasePanel />
              </TabPanel>
              <TabPanel>
                <PropertiesPanel />
              </TabPanel>
              <TabPanel>
                <ContactsPanel />
              </TabPanel>
              <TabPanel>
                <MarketplacePanel />
              </TabPanel>
              <TabPanel>
                <ApiKeysPanel partnerId={partnerId} apiKeys={apiKeys} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
};
