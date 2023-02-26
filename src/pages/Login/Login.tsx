import { FC } from 'react';
import { SinginIcon } from '../../icons';
import { Flex, Button, Heading, Text, HStack, Link } from '@chakra-ui/react';
import { signIn } from './userSlice';
import { useAppDispatch } from '../../app/store';
import { useTranslation } from 'react-i18next';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    dispatch(signIn());
  };

  return (
    <Flex align="center" justify="center" minH="100vh" maxW="48rem" m="auto">
      <HStack justify="space-around" p="20px" border="1px solid" borderColor="gray.300" borderRadius="lg">
        <Flex basis="40%">
          <img src={SinginIcon} alt={t('page.signin.img.alt')} />
        </Flex>
        <Flex basis="50%" direction="column">
          <Heading as="h1" color="gray.700" fontSize="3xl">
            {t('page.signin.text.1')}&nbsp;
            <Link color="blue.400" href="https://www.example.com/" isExternal>
              {t('page.signin.text.2')}
            </Link>{' '}
            {t('page.signin.text.3')}
          </Heading>
          <Text bg="blue.50" borderRadius="lg" p={3} mt={3} mb={3}>
            {t('page.signin.text.4')}{' '}
            <Link color="blue.400" href="mailto:partnerships@example.com">
              {t('page.signin.text.5')}
            </Link>{' '}
            {t('page.signin.text.6')}
          </Text>
          <Button alignSelf="flex-start" colorScheme="blue" type="button" onClick={handleClick}>
            {t('button.signin')}
          </Button>
        </Flex>
      </HStack>
    </Flex>
  );
};
