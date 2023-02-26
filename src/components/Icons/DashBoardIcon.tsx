import { Icon, IconProps } from '@chakra-ui/react';
import { IoBarChart } from 'react-icons/all';
import { FC, memo } from 'react';

export const DashBoardIcon: FC<IconProps> = memo((props) => <Icon as={IoBarChart} {...props} />);
