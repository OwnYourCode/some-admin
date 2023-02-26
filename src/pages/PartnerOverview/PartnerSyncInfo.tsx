import i18next from 'i18next';
import { SyncInfo } from './partnerOverviewSlice';
import { Text } from '@chakra-ui/react';

export const partnerSyncInfo = (info: SyncInfo) => {
  const { partnersRemoved = 0, partnersCreated = 0, partnersUpdated = 0 } = info;

  return (
    <>
      <Text>{i18next.t('success.sync.partners.end.description')}</Text>
      <Text>
        {i18next.t('success.sync.partners.created')}&nbsp;{partnersCreated}
      </Text>
      <Text>
        {i18next.t('success.sync.partners.updated')}&nbsp;{partnersUpdated}
      </Text>
      <Text>
        {i18next.t('success.sync.partners.removed')}&nbsp;{partnersRemoved}
      </Text>
    </>
  );
};
