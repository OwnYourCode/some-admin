import { Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { ROUTE } from '../shared/route';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const isAuthenticated = useAuthenticated();
  const { t } = useTranslation();

  return (
    <VStack minH="100vh" justify="center">
      <Heading as="h1" size="4xl" mb={2}>
        {t('page.notfound.header')}
      </Heading>
      <Text fontSize="2xl" mb={2}>
        {t('page.notfound.text')}
      </Text>

      <Text fontSize="xl" color="blue.400" fontWeight="600">
        <Link to={isAuthenticated ? ROUTE.OVERVIEW : ROUTE.SIGN_IN}>{t('page.notfound.button')}</Link>
      </Text>
    </VStack>
  );
};
