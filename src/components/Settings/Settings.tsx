import { useCallback, useState } from 'react';
import { ArrowDownIcon, SettingsIcon } from '../Icons';
import { Text } from '@chakra-ui/react';
import { Menu } from '../Menu/Menu';

export interface MenuItem {
  id: string;
  value: string;
  link?: string;
}

const menuItems: Array<MenuItem> = [
  {
    id: 'NDA',
    value: 'NDA',
    link: '/nda',
  },
  {
    id: 'DPA',
    value: 'Data Protection Agreement',
    link: '/dpa',
  },
  {
    id: 'XMLA',
    value: 'XML Agreement',
    link: '/xmla',
  },
  {
    id: 'UM',
    value: 'User Management',
    link: '/userInfo-management',
  },
];

export const Settings = () => {
  const [hover, setHover] = useState(false);

  const onToggle = useCallback(() => {
    setHover((hover) => !hover);
  }, []);

  return (
    <Menu
      onMouseOver={onToggle}
      onMouseOut={onToggle}
      items={menuItems}
      menuButtonContent={
        <>
          <SettingsIcon w="0.85rem" mr="2" />
          <Text as="span">Settings</Text>
          {hover && <ArrowDownIcon ml="1" />}
        </>
      }
    />
  );
};
