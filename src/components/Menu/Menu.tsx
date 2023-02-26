import { FC, memo, ReactNode } from 'react';
import {
  MenuItem as ChakraMenuItem,
  MenuList as ChakraMenuList,
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuProps as ChakraMenuProps,
  MenuButtonProps,
} from '@chakra-ui/react';
import { MenuItem } from '../Settings/Settings';
import { RouteLink } from '../RouteLink/RouteLink';

interface MenuProps extends Omit<ChakraMenuProps, 'children'>, Omit<MenuButtonProps, 'children'> {
  items: MenuItem[];
  menuButtonContent: ReactNode;
  children?: ReactNode;
}

export const Menu: FC<MenuProps> = memo(({ items, menuButtonContent, onMouseOver, onMouseOut }) => {
  return (
    <ChakraMenu isLazy>
      <ChakraMenuButton onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        {menuButtonContent}
      </ChakraMenuButton>
      <ChakraMenuList>
        {items.map(({ id, value, link }) =>
          link ? (
            <RouteLink key={id} to={link}>
              <ChakraMenuItem>{value}</ChakraMenuItem>
            </RouteLink>
          ) : (
            <ChakraMenuItem key={id}>{value}</ChakraMenuItem>
          ),
        )}
      </ChakraMenuList>
    </ChakraMenu>
  );
});
