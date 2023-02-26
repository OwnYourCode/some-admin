import { Avatar, Center, Flex, Text, Link, Image } from '@chakra-ui/react';
import { DashBoardIcon } from '../Icons';
import { Settings } from '../Settings/Settings';
import { RouteLink } from '../RouteLink/RouteLink';
import { ROUTE } from '../../shared/route';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../pages/Login/userSlice';
import { useAppDispatch } from '../../app/store';
import { useUserInfo } from '../../hooks/useUserInfo';
import { useTranslation } from 'react-i18next';
import logo from '../../icons/logo.svg';

export const Header = () => {
  const userInfo = useUserInfo();
  const { push } = useHistory();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // TODO: just to test that language is working
  // const { i18n } = useTranslation();
  // const changeLg = (e: any) => {
  //   console.log(e);
  //   console.log(e.target.value);
  //   i18n.changeLanguage(e.target.value);
  // };

  const handleSignOut = () => {
    dispatch(signOut());
    push(ROUTE.SIGN_IN);
  };

  return (
    <>
      <Flex justifyContent="space-between" boxShadow="lg" px="4rem">
        <Flex>
          <Center mr="10">
            <Image src={logo} alt="logo" h="4rem" w="8rem" objectFit="cover" />
          </Center>
          <Center mx="3">
            <RouteLink to={ROUTE.OVERVIEW}>
              <DashBoardIcon w="0.85rem" mr="2" />
              <Text as="span">{t('header.link.name.partner.overview')}</Text>
            </RouteLink>
          </Center>
          <Center mx="3">
            <Settings />
          </Center>
        </Flex>
        {/*TODO: just to test that language is working*/}
        {/*<Center>*/}
        {/*  <Select ml="4rem" variant="unstyled" onClick={changeLg} placeholder="Switch language" size="sm">*/}
        {/*    <option value="en">EN</option>*/}
        {/*    <option value="nl">NL</option>*/}
        {/*  </Select>*/}
        {/*</Center>*/}
        <Center m="3">
          <Avatar size="sm" mr="3" />
          <Flex flexDirection="column" alignItems="center">
            {userInfo?.name && (
              <Text as="span" fontSize="sm">
                {userInfo.name}
              </Text>
            )}
            <Link onClick={handleSignOut} fontSize="sm">
              {t('button.signout')}
            </Link>
          </Flex>
        </Center>
      </Flex>
    </>
  );
};
