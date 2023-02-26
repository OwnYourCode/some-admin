import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { RiArrowDownSFill } from 'react-icons/ri';

export const ArrowDownIcon: FC<IconProps> = (props) => <Icon as={RiArrowDownSFill} {...props} />;
