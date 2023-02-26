import { FC, memo } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { BsArrowClockwise } from 'react-icons/bs';

export const SyncIcon: FC<IconProps> = memo((props) => <Icon as={BsArrowClockwise} {...props} />);
